<?php

include 'jdf.php';

date_default_timezone_set("Asia/Tehran");

function localConnection()
{
    $serverName = 'localhost';
    $username = 'root';
    $password = 'Crmmammut!@#123';
    $dbname = 'crmMammut';
    return mysqli_connect($serverName,$username,$password,$dbname);
}

function runQuery($query,$connection=null){
    if($connection===null)
        $connection=localConnection();
    $res=mysqli_query($connection, $query);
    mysqli_close($connection);
    return $res;
}


echo "start cron job  \r\n";
while (true){
    $pTime=intval(jdate('i','','','','en'));
    $sleepForce=true;
    echo $pTime."\r\n";

//    $runin1=35;
//    if($pTime==$runin1){
        $date=jdate('Y/m/d','','','','en');
        $hour=date("H");
        $hour_1=date("H",strtotime('-1 hour'));

        $devices=[1,2,3,4];
        $records=[];
        foreach ($devices as $device) {
            $records[$device]=runQuery("SELECT * FROM IO_RecordsNew_copy WHERE Date='$date' and Time < '$hour:00' and Time >= '$hour_1:00' and Device='$device'");
        }
        print_r($records);
//        while (date('i')==$runin1){
//            sleep(5);
//        }
//        $sleepForce=false;
//    }

    if($sleepForce){
//        echo jdate('i','','','','en')."\r\n";
        sleep(10);
    }
}

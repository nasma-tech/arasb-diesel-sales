$(function () {

    let companyTimeSheet,deviceTimeSheet,userTimeSheet;

    function getDayNumInWeek(date){
        let res=0;
        $.ajax({
            url: '/takingLeave/getDayNum',
            type: 'POST',
            data: {
                'date': date
            },
            success: result => {
                res=result;
            }
        });
        return res;
    }
    function clearForm(){
        $(".dailyForm,.nopayForm,.HourForm,.illnessform,.OvertimeForm,.dailyMission,.correctionForm").remove();
    }
    function showImage(elem){
        Swal.fire({
            imageUrl: $(elem).attr('data-target'),
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        });
    }
    function requestTypeIdToString(req_id){
        switch (req_id){
            case '1':
                return 'مرخصی';
            case '2':
                return 'ماموریت';
            case '3':
                return 'اضافه کار';
            case '4':
                return 'اصلاح تردد';
        }
        return '';
    }
    function leaveSubTypeToStringType(type,subType){
        switch (type){
            case '1':{
                switch (subType) {
                    case '1' : return 'استحقاقی روزانه';
                    case '2' : return 'استحقاقی ساعتی';
                    case '3' : return 'بدون حقوق روزانه';
                    case '4' : return 'بدون حقوق ساعتی';
                    case '5' : return 'استعلاجی روزانه';
                    case '6' : return 'استعلاجی ساعتی';
                }
                break;
            }
            case '2':{
                switch (subType) {
                    case '1' : return 'داخلی';
                    case '2' : return 'خارجی';
                }
                break;
            }
            case '3':{
                switch (subType) {
                    case '1' : return 'درمحل شرکت';
                    case '2' : return 'دورکاری';
                    case '3' : return 'پاداش';
                }
                break;
            }
            case '4':{
                switch (subType) {
                    case '1' : return 'ورود';
                    case '2' : return 'خروج';
                    case '2' : return 'ورودوخروج';
                }
                break;
            }
        }
        return '';
    }
    function formCorrection(elemId){
        let res=true;
        // console.log($("#"+elemId).find(':input'));
        $("#"+elemId).find(':input').each(function () {
            // if($(this).attr('name')!=='csrfToken') {
                if (typeof $(this).attr('required') !== 'undefined') {
                    if ($(this).attr('required', true)) {
                        if ($(this).val() === '') {
                            console.log($(this),$(this).val());
                            $(this).addClass('is-invalid');
                            $(this).parent('div').addClass('has-error');
                            console.log($(this),$(this).val());
                            res = false;
                        } else {
                            $(this).removeClass('is-invalid');
                            $(this).addClass('is-valid');
                            $(this).parent('div').removeClass('has-error');
                        }
                        if ($(this).prop("tagName") === "SELECT") {
                            if ($(this).val() == null) {
                                $(this).parent().removeClass('not-error');
                                $(this).parent().addClass('has-error');
                                res = false;
                            } else {
                                $(this).parent().removeClass('has-error');
                                $(this).parent().addClass('not-error');
                            }
                        }
                    }
                }
            // }
        });
        return res;
    }
    //ماموریت داخلی
    const missionInternal=()=>{
        return `
                <div class="col-md-3 dailyMission">
                    <fieldset class="form-group">
                    <label>از تاریخ</label>
                    <input required class="form-control" type="text" id="from_date" name="from_date" readonly>
                    </fieldset>
                </div>
                <div class="col-md-3 dailyMission">
                    <fieldset class="form-group">
                    <label>تا تاریخ</label>
                    <input required class="form-control" type="text" id="to_date" name="to_date" readonly>
                    </fieldset>
                </div>
                <div class="col-md-3 dailyMission">
                    <fieldset class="form-group">
                    <label>مدت ماموریت</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="mission_period" name="mission_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">روز</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 dailyMission">
                    <fieldset class="form-group">
                    <label>علت ماموریت</label>
                    <input required class="form-control" type="text" id="mission_description" name="mission_description">
                    </fieldset>
                </div>
            `;
    }
    //مرخصی روزانه
    const leavingDaily=()=>{
        return `
                <div class="col-md-3 dailyForm">
                    <fieldset class="form-group">
                    <label>از تاریخ</label>
                    <input class="form-control" type="text" id="from_date" name="from_date" readonly required>
                    </fieldset>
                </div>
                <div class="col-md-3 dailyForm">
                    <fieldset class="form-group">
                    <label>تا تاریخ</label>
                    <input class="form-control" type="text" id="to_date" name="to_date" readonly required>
                    </fieldset>
                </div>
                <div class="col-md-3 dailyForm">
                    <fieldset class="form-group">
                    <label>مدت مرخصی</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_leave_period" name="taking_leave_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">روز</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 dailyForm">
                    <fieldset class="form-group">
                    <label>علت مرخصی</label>
                    <input class="form-control" type="text" id="taking_leave_description" name="taking_leave_description">
                    </fieldset>
                </div>
            `;
    }
    //مرخصی ساعتی
    const leavinghourly=()=>{
        return `
                <div class="col-md-3 HourForm">
                    <fieldset class="form-group">
                    <label>تاریخ مرخصی</label>
                    <input required class="form-control" type="text" id="from_date" name="from_date">
                    </fieldset>
                </div>
                <div class="col-md-3 HourForm">
                    <fieldset class="form-group">
                    <label>از ساعت</label>
                    <input required class="form-control" min="08:30" type="time" id="from_time" name="from_time">
                    </fieldset>
                </div>
                <div class="col-md-3 HourForm">
                    <fieldset class="form-group">
                    <label>تا ساعت</label>
                    <input required class="form-control" min="08:30" max="16:30" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-3 HourForm">
                    <fieldset class="form-group">
                    <label>مدت مرخصی</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_leave_period" name="taking_leave_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">ساعت</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 HourForm">
                    <fieldset class="form-group">
                    <label>علت مرخصی</label>
                    <input class="form-control" type="text" id="taking_leave_description" name="taking_leave_description">
                    </fieldset>
                </div>
            `;
    }
    //مرخصی بدون حقوق
    const leavingNoPayDaily=()=>{
        return `
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>از تاریخ</label>
                    <input class="form-control" type="text" id="from_date" name="from_date" readonly required>
                    </fieldset>
                </div>
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>تا تاریخ</label>
                    <input required class="form-control" type="text" id="to_date" name="to_date" readonly>
                    </fieldset>
                </div>
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>مدت مرخصی</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_leave_period" name="taking_leave_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">روز</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 nopayForm">
                    <fieldset class="form-group">
                    <label>علت مرخصی</label>
                    <input required class="form-control" type="text" id="taking_leave_description" name="taking_leave_description">
                    </fieldset>
                </div>
            `;
    }
    const leavingNoPayHourly=()=>{
        return `
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>تاریخ</label>
                    <input class="form-control" type="text" id="from_date" name="from_date" readonly required>
                    </fieldset>
                </div>
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>از ساعت</label>
                    <input required class="form-control" type="time" id="from_time" name="from_time">
                    </fieldset>
                </div>
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>تا ساعت</label>
                    <input required class="form-control" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-3 nopayForm">
                    <fieldset class="form-group">
                    <label>مدت مرخصی</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_leave_period" name="taking_leave_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">ساعت</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 nopayForm">
                    <fieldset class="form-group">
                    <label>علت مرخصی</label>
                    <input required class="form-control" type="text" id="taking_leave_description" name="taking_leave_description">
                    </fieldset>
                </div>
            `;
    }
    //مرخصی استعلاجی
    const leavingillnessDaily=()=>{
        return `
                <div class="col-md-3 illnessform">
                    <fieldset class="form-group">
                    <label>از تاریخ</label>
                    <input required class="form-control" type="text" id="from_date" name="from_date" readonly>
                    </fieldset>
                </div>
                <div class="col-md-3 illnessform">
                    <fieldset class="form-group">
                    <label>تا تاریخ</label>
                    <input required class="form-control" type="text" id="to_date" name="to_date" readonly>
                    </fieldset>
                </div>
                <div class="col-md-3 illnessform">
                    <fieldset class="form-group">
                    <label>مدت مرخصی</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_leave_period" name="taking_leave_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">روز</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-6 illnessform">
                    <div class="form-group">
                    <label for="taking_leave_attach">تصویر مستندات پزشکی</label>
                    <input required class="form-control form-control-file" style="padding: 0" type="file" accept="image/*" id="taking_leave_attach" name="taking_leave_attach">
                    </div>
                </div>
                <div class="col-md-6 illnessform" style="display: none">
                    <div class="form-group">
                        <label for="leave_attach_view">مشاهده فایل</label>
                        <a class="image-viewer" data-target="" id="leave_attach_view"></a>
                    </div>
                </div>
                <style>.form-control-file::file-selector-button{
                    background-color: #c3c3c3;
                    border: none;
                    padding: 1%;
                    color: black;
                }</style>
            `;
    }
    const leavingillnessHourly=()=>{
        return `
                <div class="col-md-3 illnessform">
                    <fieldset class="form-group">
                    <label>تاریخ</label>
                    <input required class="form-control" type="text" id="from_date" name="from_date" readonly>
                    </fieldset>
                </div>
                <div class="col-md-2 illnessform">
                    <fieldset class="form-group">
                    <label>از ساعت</label>
                    <input class="form-control" type="time" id="from_time" name="from_time" required>
                    </fieldset>
                </div>
                <div class="col-md-2 illnessform">
                    <fieldset class="form-group">
                    <label>تا ساعت</label>
                    <input required class="form-control" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-2 illnessform">
                    <fieldset class="form-group">
                    <label>مدت مرخصی</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_leave_period" name="taking_leave_period" required readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">ساعت</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-6 illnessform">
                    <div class="form-group">
                    <label for="taking_leave_attach">تصویر مستندات پزشکی</label>
                    <input required class="form-control form-control-file" style="padding: 0" type="file" accept="image/*" id="taking_leave_attach" name="taking_leave_attach">
                    </div>
                </div>
                <div class="col-md-6 illnessform" style="display: none">
                    <div class="form-group">
                        <label for="leave_attach_view">مشاهده فایل</label>
                        <a class="image-viewer" data-target="" id="leave_attach_view"></a>
                    </div>
                </div>
                <style>.form-control-file::file-selector-button{
                    background-color: #c3c3c3;
                    border: none;
                    padding: 1%;
                    color: black;
                }</style>
            `;
    }
    //اضافه کاری
    const overTime_T1=()=>{
        return `
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>تاریخ کارکرد</label>
                    <input required class="form-control" type="text" id="taking_overtime_date" name="taking_overtime_date">
                    </fieldset>
                </div>
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>از ساعت</label>
                    <input required class="form-control" type="time" id="from_time" name="from_time">
                    </fieldset>
                </div>
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>تا ساعت</label>
                    <input required class="form-control" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>مدت کارکرد</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_overtime_period" name="taking_overtime_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">ساعت</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 OvertimeForm">
                    <fieldset class="form-group">
                    <label>گزارش کار</label>
                    <input required class="form-control" type="text" id="taking_overtime_description" name="taking_overtime_description">
                    </fieldset>
                </div>
            `;
    }
    //دور کاری
    const overTime_T2=()=>{
        return `
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>تاریخ کارکرد</label>
                    <input required class="form-control" type="text" id="taking_overtime_date" name="taking_overtime_date">
                    </fieldset>
                </div>
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>از ساعت</label>
                    <input required class="form-control" type="time" id="from_time" name="from_time">
                    </fieldset>
                </div>
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>تا ساعت</label>
                    <input required class="form-control" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-3 OvertimeForm">
                    <fieldset class="form-group">
                    <label>مدت کارکرد</label>
                    <div class="input-group">
                      <input class="form-control" type="text" id="taking_overtime_period" name="taking_overtime_period" readonly>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2">ساعت</span>
                      </div>
                    </div>
                    </fieldset>
                </div>
                <div class="col-md-12 OvertimeForm">
                    <fieldset class="form-group">
                    <label>گزارش کار</label>
                    <input required class="form-control" type="text" id="taking_overtime_description" name="taking_overtime_description">
                    </fieldset>
                </div>
            `;

    }
    //پاداش پروژه
    const overTime_T3=()=>{
        return `
                <div class="col-md-4 OvertimeForm">
                    <fieldset class="form-group">
                    <label>مبلغ پاداش</label>
                    <input required class="form-control" maxlength="11" type="text" id="overtime_pricePay" name="overtime_pricePay">
                    </fieldset>
                </div>
                <div class="col-md-12 OvertimeForm">
                    <fieldset class="form-group">
                    <label>توضیحات مقتضی</label>
                    <input required class="form-control" type="text" id="taking_overtime_description" name="taking_overtime_description">
                    </fieldset>
                </div>
            `;

    }
    //اصلاح تردد
    const correctionTime_T1=()=>{
        return `
                <div class="col-md-4 correctionForm">
                    <fieldset class="form-group">
                    <label>تاریخ اصلاحیه</label>
                    <input required class="form-control" type="text" id="taking_correction_date" name="taking_correction_date">
                    </fieldset>
                </div>
                <div class="col-md-4 correctionForm">
                    <fieldset class="form-group">
                    <label>ساعت ورود</label>
                    <input required class="form-control" type="time" id="from_time" name="from_time">
                    </fieldset>
                </div>
                <div class="col-md-11 correctionForm">
                    <fieldset class="form-group">
                    <label>توضیحات</label>
                    <input required class="form-control" type="text" id="taking_correction_description" name="taking_correction_description">
                    </fieldset>
                </div>
            `;
    }
    const correctionTime_T2=()=>{
        return `
                <div class="col-md-4 correctionForm">
                    <fieldset class="form-group">
                    <label>تاریخ اصلاحیه</label>
                    <input required class="form-control" type="text" id="taking_correction_date" name="taking_correction_date">
                    </fieldset>
                </div>
                <div class="col-md-4 correctionForm">
                    <fieldset class="form-group">
                    <label>ساعت خروج</label>
                    <input required class="form-control" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-11 correctionForm">
                    <fieldset class="form-group">
                    <label>توضیحات</label>
                    <input required class="form-control" type="text" id="taking_correction_description" name="taking_correction_description">
                    </fieldset>
                </div>
            `;
    }
    const correctionTime_T3=()=>{
        return `
                <div class="col-md-3 correctionForm">
                    <fieldset class="form-group">
                    <label>تاریخ اصلاحیه</label>
                    <input required class="form-control" type="text" id="taking_correction_date" name="taking_correction_date">
                    </fieldset>
                </div>
                <div class="col-md-3 correctionForm">
                    <fieldset class="form-group">
                    <label>ساعت ورود</label>
                    <input required class="form-control" type="time" id="from_time" name="from_time">
                    </fieldset>
                </div>
                <div class="col-md-3 correctionForm">
                    <fieldset class="form-group">
                    <label>ساعت خروج</label>
                    <input required class="form-control" type="time" id="to_time" name="to_time">
                    </fieldset>
                </div>
                <div class="col-md-12 correctionForm">
                    <fieldset class="form-group">
                    <label>توضیحات</label>
                    <input required class="form-control" type="text" id="taking_correction_description" name="taking_correction_description">
                    </fieldset>
                </div>
            `;
    }


    const diffApi = (startDate, endDate, resShow) => {
        var d1=new Date(startDate);
        var d2=new Date(endDate);
        if(d1>d2) {
            customAlert('warning', 'تاریخ شروع از تاریخ پایان بزرگتر است', 5000);
            return 0;
        }
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(resShow!=undefined)
            $(resShow).val(diffDays+1);
        return diffDays+1;
    };

    const getTableTakingData = () => {
        $.ajax({
            url: '/takingLeave/getTakingViewProfileList',
            type: 'POST',
            success: result => {
                $("#mainTakingTable").html(result);
            }
        });
    };
    // getTableTakingData();

    const getTableMissionData = () => {
        $.ajax({
            url: '/takingLeave/getMissionViewProfileList',
            type: 'POST',
            success: result => {
                $("#mainMissionTable").html(result);
                $('.mis-editItem').click((e)=>{
                    editItem(e.target);
                });
                $('.mis-delItem').click((e)=>{
                    deleteItem(e.target);
                });
            }
        });
    };
    const getTableLeavingData = () => {
        $.ajax({
            url: '/takingLeave/getLeavingViewProfileList',
            type: 'POST',
            success: result => {
                $("#mainTakingTable").html(result);
                $('.lev-editItem').click((e)=>{
                    editItem(e.target);
                });
                $('.lev-delItem').click((e)=>{
                    deleteItem(e.target);
                });
            }
        });
    };
    const getTableOvertimeData = () => {
        $.ajax({
            url: '/takingLeave/getOvertimeViewProfileList',
            type: 'POST',
            success: result => {
                $("#mainOvertimeTable").html(result);
                $('.ovt-editItem').click((e)=>{
                    editItem(e.target);
                });
                $('.ovt-delItem').click((e)=>{
                    deleteItem(e.target);
                });
            }
        });
    };
    const getTableCorrectionData=()=>{
        $.ajax({
            url: '/takingLeave/getCorrectionViewProfileList',
            type: 'POST',
            success: result => {
                $("#mainCorrectionTable").html(result);
                $('.cor-editItem').click((e)=>{
                    editItem(e.target);
                });
                $('.cor-delItem').click((e)=>{
                    deleteItem(e.target);
                });
            }
        });
    }
    const getTableTimeSheetData=()=>{
        let priod=$("#changePriod").val();
        $.ajax({
            url: '/takingLeave/getUserTimeSheet',
            type: 'POST',
            data: {
                'priod': priod
            },
            success: result => {
                let res=JSON.parse(result);
                $("#mainTimeSheetTable").html(res.timeSheet);
            }
        }).done(function (e) {
            let res=JSON.parse(e);
            $("#total-row").find('td').eq(1).text(calcHours(res.duration));
            if(res.delaysStamp>0 && res.delaysStamp<=3600){
                $("#total-row").find('td').eq(2).text('00:00');
                $("#total-row").find('td').eq(2).attr('title',calcHours(res.delays));
                $("#total-row").find('td').eq(6).text(secondsToTime(res.lowTimesStamp-res.delaysStamp));
                $("#total-row").find('td').eq(6).attr('title',calcHours(res.lowTimes));
            }
            else{
                $("#total-row").find('td').eq(2).text(calcHours(res.delays));
                $("#total-row").find('td').eq(6).text(calcHours(res.lowTimes));
            }
            $("#total-row").find('td').eq(3).text(calcHours(res.rushs));
            $("#total-row").find('td').eq(4).text(calcHours(res.overTimes));
            $("#total-row").find('td').eq(5).text(calcHours(res.leavings));
            $('.time-detail').on('click',(e)=>{
                let d=$(e.target).parents('tr').attr('data-list').replaceAll('|',',').split(',');
                let htm='<div style="padding: 5px;border: 1px solid #ccca;border-radius: 5px;">';
                for (let i = 0; i < d.length; i++) {
                    if(d[i].trim()!=='0' && d[i].trim()!=='')
                        htm+='<span class="userrequest-info-header mb-1">ساعت ثبت شده<i style="padding: 0 1px">'+(i+1)+'</i>'+' :</span>'+
                             '<i class="userrequest-info-data mb-1">'+d[i]+'</i>';
                }
                htm+='</div>';
                Swal.fire({
                    title: "<h5>جزئیات تردد روز" +
                                "<u style='color: blue;margin: 0 10px;'> " +
                                    $(e.target).parents('tr').find('td').eq(1).text() +
                                "</u>&nbsp;&nbsp;تاریخ  " +
                                "<u style='color: blue;margin: 0 10px;'>" +
                                    $(e.target).parents('tr').find('td').eq(2).text() +
                                "</u>" +
                            "</h5>",
                    html: htm
                });
            });
            $('a[class^="user-request"]').on('click',(e)=>{
                var dataInfo = $(e.target).attr('data-info');
                var itemArray = JSON.parse(dataInfo);
                let date=new Date(itemArray.from_date * 1000).toLocaleDateString('fa');
                let date2=new Date(itemArray.to_date * 1000).toLocaleDateString('fa');
                Swal.fire({
                    title: "<h5>درخواست شماره<u>"+itemArray.id+"</u>&nbsp;&nbsp;تاریخ <u>"+date+"</u></h5>",
                    html: `<span class="userrequest-info-header mb-1">کد کاربر:</span><i class="userrequest-info-data mb-1">`+itemArray.owner_id+`</i>`+
                        `<span class="userrequest-info-header mb-1">نوع درخواست:</span>`+
                        `<i class="userrequest-info-data mb-1">`+requestTypeIdToString(itemArray.request_type.toString())+' '+leaveSubTypeToStringType(itemArray.request_type.toString(),itemArray.request_subType.toString())+`</i>`+
                        `<span class="userrequest-info-header mb-1">وضعیت تائید:</span>`+
                        `<i class="userrequest-info-data mb-1">`+(itemArray.confirmation=='0'?'در انتظار تائید':(itemArray.confirmation=='1')?'تائید شده':'رد شده')+`</i>`+
                        `<span class="userrequest-info-header mb-1">`+(itemArray.from_date!==''?'ازتاریخ':'تاریخ')+`</span>`+
                        `<i class="userrequest-info-data mb-1">`+date+`</i>`+
                        (itemArray.to_date!=null?`<span class="userrequest-info-header mb-1">تاتاریخ</span><i class="userrequest-info-data mb-1">`+date2+`</i>`:'')+
                        (itemArray.from_time!=null?`<span class="userrequest-info-header mb-1">`+(itemArray.from_time===''?'ساعت':'ازساعت')+`</span><i class="userrequest-info-data mb-1">`+itemArray.from_time+`</i>`:'')+
                        (itemArray.to_time!=null?`<span class="userrequest-info-header mb-1">`+(itemArray.to_time===''?'ساعت':'تاساعت')+`</span><i class="userrequest-info-data mb-1">`+itemArray.to_time+`</i>`:'')+
                        (itemArray.period!=null?`<span class="userrequest-info-header mb-1">مدت</span><i class="userrequest-info-data mb-1">`+itemArray.period+' '+(itemArray.period.includes(':')?'ساعت':'روز')+`</i>`:'')+
                        (itemArray.description!=null?`<span class="userrequest-info-header mb-1" style="width: 100%">توضیحات</span><i style="width: 100%;padding: 2px;font-size: 12px;" class="userrequest-info-data mb-1">`+itemArray.description+`</i>`:'')
                });
            });
            $('.requestInsert').on('click',function (e){
                let tr=$(e.target).closest('tr').find('td').eq(2).text();
                let type=$(e.target).parent().attr('data-id');
                let subtype=$(e.target).parent().attr('data-subid');
                console.log(tr);
                switch (type){
                    case '1':{
                        $("#v-pills-leave-tab").click();
                        setTimeout(()=>{
                            $("#taking_leave_type").val(subtype).trigger('change');
                            setTimeout(()=>{
                                $('#from_date').val(tr);
                                $('#to_date').val(tr);
                            })
                        },100);
                        break;
                    }
                    case '2':{
                        $("#v-pills-mission-tab").click();
                        setTimeout(()=>{
                            $("#mission_type").val(subtype).trigger('change');
                            setTimeout(()=>{
                                $('#from_date').val(tr);
                                $('#to_date').val(tr);
                            })
                        },100);
                        break;
                    }
                    case '3':{
                        $("#v-pills-overTime-tab").click();
                        setTimeout(()=>{
                            $("#overTime_type").val(subtype).trigger('change');
                            setTimeout(()=>{
                                $('#taking_overtime_date').val(tr);
                            })
                        },100);
                        break;
                    }
                    case '4':{
                        $("#v-pills-correction-tab").click();
                        setTimeout(()=>{
                            $("#correction_type").val(subtype).trigger('change');
                            setTimeout(()=>{
                                $('#taking_correction_date').val(tr);
                            })
                        },100);
                        break;
                    }
                }
            });

        });
    }
    getTableLeavingData();
    getTableMissionData();
    getTableOvertimeData();
    getTableCorrectionData();
    getTableTimeSheetData();

    function editItem(elem){
        let row=$(elem).parent().parent();
        let id=$(row).find('td').eq('0').text();
        $('#userRequestId').val(id);
        $('tr').css('background-color','');
        let data=$(row).attr('data-raw');
        console.log(JSON.parse(data));
        return false;

        let subt=$(row).attr('data-subType');
        $(row).css('background-color','#ffff0040');
        switch($(row).attr('data-type')){
            case 'getLeavingViewProfileList':{
                $('#taking_leave_type').val(subt).change();
                let fdate = new Date(data[4] * 1000).toLocaleDateString('fa');
                $('#from_date').val(fdate);
                switch (subt){
                    case '1':
                    case '3':{
                        // console.log(data)
                        let tdate = new Date(data[5] * 1000).toLocaleDateString('fa');
                        $('#to_date').val(tdate);
                        $('#taking_leave_period').val(data);
                        $('#taking_leave_description').val(data[9]);
                        $('#from_date,#to_date,#taking_leave_period,#taking_leave_description,#leave_type_main').addClass('item-in-edit');
                        setTimeout(()=>{
                            $('#from_date,#to_date,#taking_leave_period,#taking_leave_description,#leave_type_main').removeClass('item-in-edit');
                        },3000);
                        break;
                    }
                    case '2':
                    case '4':{
                        $('#from_time').val(data[6]);
                        $('#to_time').val(data[7]);
                        $('#taking_leave_period').val(data[8]);
                        $('#taking_leave_description').val(data[9]);
                        $('#from_date,#from_time,#to_time,#taking_leave_period,#taking_leave_description,#leave_type_main').addClass('item-in-edit');
                        setTimeout(()=>{
                            $('#from_date,#from_time,#to_time,#taking_leave_period,#taking_leave_description,#leave_type_main').removeClass('item-in-edit');
                        },3000);
                        break;
                    }
                    case '5':{
                        let tdate = new Date(data[5] * 1000).toLocaleDateString('fa');
                        $('#to_date').val(tdate);
                        $('#taking_leave_period').val(data[8]);
                        $('#taking_leave_description').val(data[9]);
                        $('#leave_attach_view').html(data[12]).attr('data-target','/Storage/users/'+data[3]+'/'+data[12]);
                        $('#leave_attach_view').parent().parent().css('display','initial');
                        $('#leave_attach_view').on('click',(e)=>{
                            showImage(e.target);
                        });
                        $('#from_date,#to_date,#taking_leave_period,#taking_leave_description,#leave_type_main,#taking_leave_attach').addClass('item-in-edit');
                        setTimeout(()=>{
                            $('#from_date,#to_date,#taking_leave_period,#taking_leave_description,#leave_type_main,#taking_leave_attach').removeClass('item-in-edit');
                        },3000);
                        break;
                    }
                    case '6':{
                        $('#from_time').val(data[6]);
                        $('#to_time').val(data[7]);
                        $('#taking_leave_period').val(data[8]);
                        $('#taking_leave_description').val(data[9]);
                        $('#leave_attach_view').html(data[12]).attr('data-target','/Storage/users/'+data[3]+'/'+data[12]);
                        $('#leave_attach_view').parent().parent().css('display','initial');
                        $('#leave_attach_view').on('click',(e)=>{
                            showImage(e.target);
                        });
                        $('#from_date,#to_date,#taking_leave_period,#taking_leave_description,#leave_type_main,#taking_leave_attach').addClass('item-in-edit');
                        setTimeout(()=>{
                            $('#from_date,#to_date,#taking_leave_period,#taking_leave_description,#leave_type_main,#taking_leave_attach').removeClass('item-in-edit');
                        },3000);
                        break;
                    }
                }
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#v-pills-leave").offset().top
                }, 1000);
                break;
            }
            case 'getOvertimeViewProfileList':{
                console.log(data,id);
                $('#overTime_type').val(subt).change();
                switch (subt){
                    case '1':
                    case '2':{taking_overtime_date
                        let fdate = new Date(data[4] * 1000).toLocaleDateString('fa');
                        $('#taking_overtime_date').val(fdate);
                        $('#from_time').val(data[6]);
                        $('#to_time').val(data[7]);
                        $('#taking_overtime_description').val(data[9]);
                        break;
                    }
                    case '3':{
                        $('#overtime_pricePay').val(data[12]);
                        $('#taking_overtime_description').val(data[9]);
                        break;
                    }
                }
                $('#taking_overtime_date,#from_time,#to_time,#overTime_type,#taking_overtime_description,#overTime_type_main').addClass('item-in-edit');
                setTimeout(()=>{
                    $('#taking_overtime_date,#from_time,#to_time,#overTime_type,#taking_overtime_description,#overTime_type_main').removeClass('item-in-edit');
                },3000);
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#v-pills-overTime").offset().top
                }, 1000);
                break;
            }
            case 'getCorrectionViewProfileList':{
                $('#userRequestId').val(data[0]);
                $('#correction_type').val(subt).change();
                let date = new Date(data[4] * 1000).toLocaleDateString('fa');
                switch (subt) {
                    case '1': {
                        $('#taking_correction_date').val(date);
                        $('#from_time').val(data[6]);
                        break;
                    }
                    case '2': {
                        $('#taking_correction_date').val(date);
                        $('#to_time').val(data[7]);
                        break;
                    }
                    case '3': {
                        $('#taking_correction_date').val(date);
                        $('#from_time').val(data[6]);
                        $('#to_time').val(data[7]);
                        break;
                    }
                }
                $('#taking_correction_date,#from_time,#to_time,#correction_type,#taking_correction_description,#correction_type_main').addClass('item-in-edit');
                setTimeout(()=>{
                    $('#taking_correction_date,#from_time,#to_time,#correction_type,#taking_correction_description,#correction_type_main').removeClass('item-in-edit');
                },3000);
                $('#taking_correction_description').val(data[9]);
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#v-pills-correction").offset().top
                }, 1000);
                break;
            }
            case 'getMissionViewProfileList':{
                break;
            }
        }
    }
    function deleteItem(elem){
        let row=$(elem).parent().parent();
        let id=$(row).find('td').eq('0').text();
        let urlButton='/takingLeave/deleteUserRequest';
        swal.fire({
            icon: 'question',
            title: 'حذف شود؟',
            text: 'آیا از حذف این مورد اطمینان دارید؟',
            confirmButtonText: 'حذف',
            confirmButtonColor: '#FF2829',
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                $.ajax({
                    url: urlButton,
                    type: 'POST',
                    data: {
                        id
                    },
                    success: result => {
                        console.log(result);
                        if (result === "deleteSuccess") {
                            swal.fire({
                                icon: 'success',
                                title: 'با موفقیت حذف شد',
                                timer: 3000,
                                allowOutsideClick: () => {
                                    location.reload();
                                },
                                didClose: () => {
                                    location.reload();
                                },
                                confirmButtonText: 'بستن',
                                preConfirm: () => {
                                    location.reload();
                                }
                            });
                        } else {
                            swal.fire({
                                icon: 'error',
                                title: 'حذف با خطا مواجه شد',
                                text: 'جهت رفع مشکل با پشتیبانی تماس بگیرید',
                                confirmButtonText: 'بستن'
                            });
                        }
                    }
                });
            }
        });

    }

    $("#submitTakingRequest").on('click', function () {
        let form = $("#formTakingLeave");
        let formData = new FormData(form[0]);
        let id=$("#userRequestId").val();
        if(id!==''){
            formData.append('id',id);
            $('#taking_leave_attach').removeAttr('required');
        }
        if(formCorrection('formTakingLeave')) {
            $.ajax({
                url: '/takingLeave/addLeaving',
                type: 'POST',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
                success: result => {
                    if (result === 'addSuccess') {
                        swal.fire({
                            icon: 'success',
                            title: 'با موفقیت ثبت شد',
                            confirmButtonText: 'بستن',
                            timer: 3000
                        });
                        getTableLeavingData();
                        $("#formTakingLeave").find(':input').each(function () {
                            if ($(this).attr('name') !== 'csrfToken'){
                                $(this).removeClass('is-valid');
                                if(! $(this).is('select'))
                                    $(this).val('');
                            }
                        });
                    }
                }
            });
        }
        else{
            customAlert('warning','لطفا مقادیر الزامی را وارد نمائید',5000);
        }
    });
    $("#submitOverTime").on('click', function () {
        let form = $("#form_overTime");
        let formData = new FormData(form[0]);
        if(formCorrection('form_overTime')) {
            $.ajax({
                url: '/takingLeave/addOverTime',
                type: 'POST',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
                success: result => {
                    if (result === 'addSuccess') {
                        swal.fire({
                            icon: 'success',
                            title: 'با موفقیت ثبت شد',
                            confirmButtonText: 'بستن',
                            timer: 3000
                        });
                        getTableOvertimeData();
                        $("#form_overTime").find(':input').each(function () {
                            if ($(this).attr('name') !== 'csrfToken'){
                                $(this).removeClass('is-valid');
                                if(! $(this).is('select'))
                                    $(this).val('');
                            }
                        });
                    }
                }
            });
        }
        else{
            customAlert('warning','لطفا مقادیر الزامی را وارد نمائید',5000);
        }
    });
    $("#submitMission").on('click', function () {
        let form = $("#formMission");
        let formData = new FormData(form[0]);
        if(formCorrection('formMission')){
            $.ajax({
                url: '/takingLeave/addMission',
                type: 'POST',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
                success: result => {
                    if (result === 'addSuccess') {
                        swal.fire({
                            icon: 'success',
                            title: 'با موفقیت ثبت شد',
                            confirmButtonText: 'بستن',
                            timer: 3000
                        });
                        getTableMissionData();
                        $("#formMission").find(':input').each(function () {
                            if ($(this).attr('name') !== 'csrfToken'){
                                $(this).removeClass('is-valid');
                                if(! $(this).is('select'))
                                    $(this).val('');
                            }
                        });
                    }
                }
            });
        }
        else{
            customAlert('warning','لطفا مقادیر الزامی را وارد نمائید',5000);
        }
    });
    $("#submitCorrection").on('click', function () {
        let form = $("#formCorrection");
        let formData = new FormData(form[0]);
        if(formCorrection('formCorrection')){
            let id=$("#userRequestId").val();
            if(id!=='')
                formData.append('id',id);
            $.ajax({
                url: '/takingLeave/addCorrection',
                type: 'POST',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
                success: result => {
                    if (result === 'addSuccess') {
                        swal.fire({
                            icon: 'success',
                            title: 'با موفقیت ثبت شد',
                            confirmButtonText: 'بستن',
                            timer: 3000
                        });
                        getTableCorrectionData();
                        $("#formCorrection").find(':input').each(function () {
                            if ($(this).attr('name') !== 'csrfToken'){
                                $(this).removeClass('is-valid');
                                if(! $(this).is('select'))
                                    $(this).val('');
                            }
                        });
                    }
                }
            });
        }
        else{
            customAlert('warning','لطفا مقادیر الزامی را وارد نمائید',5000);
        }
    });

    $("#taking_leave_type").on('change', function () {
        clearForm();
        switch ($(this).val()){
            case '1':{
                $("#leave_type_main").append(leavingDaily());
                datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#from_date").on('change',function(){
                    if(! $('#to_date').hasClass('hasDatepicker'))
                        filterDate1('to_date', $(this).val());
                    else{
                        let startDate = $(this).val();
                        let endDate = $('#to_date').val();
                        if(startDate!=='' && endDate!==''){
                            $('#taking_leave_period').val(calcDate());
                        }
                            // diffApi(startDate,endDate,'#taking_leave_period');
                    }
                });
                $("#to_date").on('change', function () {
                    let startDate = $("#from_date").val();
                    let endDate = $(this).val();
                    if(startDate!=='' && endDate!==''){
                        $('#taking_leave_period').val(calcDate());
                    }
                });
                break;
            }
            case '2':{
                $("#leave_type_main").append(leavinghourly());
                datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)) );
                $("#from_time").on('change', function () {
                    $("#taking_leave_period").val(calcTime());
                });
                $("#to_time").on('change', function () {
                    $("#taking_leave_period").val(calcTime());
                });
                break;
            }
            case '3':{
                $("#leave_type_main").append(leavingNoPayDaily());
                datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#from_date").on('change',()=>{
                    filterDate1('to_date', $('#from_date').val());
                    if($("#to_date").val()!=='') {
                        $('#taking_leave_period').val(calcDate());
                    }
                });
                $("#to_date").on('change', function () {
                    $('#taking_leave_period').val(calcDate());
                });
                break;
            }
            case '4':{
                $("#leave_type_main").append(leavingNoPayHourly());
                datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#to_time").on('change', function () {
                    $('#taking_leave_period').val(calcTime());
                });
                $("#from_time").on('change', function () {
                    $('#taking_leave_period').val(calcTime());
                });
                break;
            }
            case '5':{
                $("#leave_type_main").append(leavingillnessDaily());
                datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#from_date").on('change',()=>{
                    filterDate1('to_date', $('#from_date').val());
                });
                $("#to_date").on('change', function () {
                    $('#taking_leave_period').val(calcDate());
                });
                break;
            }
            case '6':{
                $("#leave_type_main").append(leavingillnessHourly());
                datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#from_time , #to_time").on('change', function () {
                    $('#taking_leave_period').val(calcTime());
                });
                break;
            }
        }
        let calcTime=()=>{
            let startTime=$('#from_time').val();
            let endTime=$('#to_time').val();
            if(startTime==='' || endTime==='')
                return '';
            let dnum=getDayNumInWeek($('#from_date').val());
            let uts=userTimeSheet[dnum],
                dts=deviceTimeSheet[dnum],
                cts=companyTimeSheet[dnum];

            if(uts!==undefined){

            }
            else {
                if(dts!==undefined){

                }
                else {
                    let def;
                    if(startTime!=='') {
                        def = diffTime(startTime, cts['start_time']);
                        // if (def !== '' && def !== '00:00:00') {
                        //     customAlert('warning', 'امکان ثبت مرخصی قبل از ساعت کاری وجود ندارد')
                        //     $('#from_time').val('');
                        //     return '';
                        // }
                    }
                    if(endTime!=='') {
                        def = diffTime(cts['end_time'],endTime);
                        // console.log(def);
                        if (def !== '' && def !== '00:00:00') {
                            customAlert('warning', 'امکان ثبت مرخصی بعد از ساعت کاری وجود ندارد');
                            $('#to_time').val('');
                            return '';
                        }
                    }
                }
            }

            if(startTime!=='' && endTime!==''){
                let defT=diffTime(startTime,endTime);
                if(defT===''){
                    customAlert('warning', 'ساعت شروع مرخصی باید از ساعت پایان کوچکتر باشد');
                    $('#to_time').val('');
                }
                else{
                    let spl=defT.split(':');
                    if(parseInt(spl[0]) > 4 || (parseInt(spl[0]) > 3 && parseInt(spl[1]) > 0)){
                        customAlert('warning', 'حداکثر میزان مرخصی ساعتی در یک روز چهار ساعت میباشد');
                        $('#to_time').val('');
                    }
                    else{
                        return spl[0]+':'+spl[1];
                    }
                }
            }
            return  '';
        }
        let calcDate=()=>{
            let res='';
            let startDate=$('#from_date').val();
            let endDate=$('#to_date').val();
            if(startDate === endDate){
                res = 1;
            }
            else{
                res= diffApi(startDate, endDate);
            }
            return res;
        }
    });
    $("#mission_type").on('change', function () {
        clearForm();
            $("#mission_type_main").append(missionInternal());
            datePickerSelectByInput1("#from_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
            $("#from_date").on('change',()=>{
                filterDate1('to_date', $('#from_date').val());
            });
            $("#to_date").on('change', function () {
                let startDate = $("#from_date").val();
                let endDate = $(this).val();
                diffApi(startDate, endDate, '#mission_period')
                $("#mission_period").val();
            });
    });
    $("#overTime_type").on('change', function () {
        clearForm();
        switch ($(this).val()){
            case '1':{
                $("#overTime_type_main").append(overTime_T1());
                datePickerSelectByInput1("#taking_overtime_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#from_time").on('change', function () {
                    $("#taking_overtime_period").val('');
                    $("#to_time").val('');
                });
                $("#to_time").on('change', function () {
                    $("#taking_overtime_period").val(diffTime($("#from_time").val(), $(this).val()));
                    let first = $("#from_time").val().split(':');
                    let second = $(this).val().split(':');
                    let firstTime = first[0] + first[1];
                    let secondTime = second[0] + second[1];
                    if (secondTime < firstTime) {
                        customAlert('warning', 'ساعت شروع مرخصی باید از ساعت پایان مرخصی کوچکتر باشد');
                        $(this).val('');
                    }
                });
                $("#submitOverTime").slideDown()
                break;
            }
            case '2':{
                $("#overTime_type_main").append(overTime_T2());
                datePickerSelectByInput1("#taking_overtime_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)) );
                $("#from_time").on('change', function () {
                    $("#taking_overtime_period").val('');
                    $("#to_time").val('');
                });
                $("#to_time").on('change', function () {
                    $("#taking_overtime_period").val(diffTime($("#from_time").val(), $(this).val()));
                    let first = $("#from_time").val().split(':');
                    let second = $(this).val().split(':');
                    let firstTime = first[0] + first[1];
                    let secondTime = second[0] + second[1];
                    if (secondTime < firstTime) {
                        customAlert('warning', 'ساعت شروع مرخصی باید از ساعت پایان مرخصی کوچکتر باشد');
                        $(this).val('');
                    }
                    // let periodTime = $("#taking_overtime_period").val().replaceAll(':','')
                    // if (periodTime > 30000){
                    //     swal.fire({
                    //         icon:'warning',
                    //         title:'توجه',
                    //         text:'مرخصی ساعتی از چهار ساعت بیشتر روزانه حساب خواهد شد',
                    //         confirmButtonText:'متوجه شدم !'
                    //     })
                    //     $("#submitOverTime").slideUp()
                    // }else {
                    //     $("#submitOverTime").slideDown()
                    // }

                });
                $("#submitOverTime").slideDown()
                break;
            }
            case '3':{
                $("#overTime_type_main").append(overTime_T3());
                priceFormatInput("#overtime_pricePay")
                $("#submitOverTime").slideDown()
                break;
            }
        }
    });
    $("#correction_type").on('change', function () {
        clearForm();
        switch ($(this).val()){
            case '1':{
                $("#correction_type_main").append(correctionTime_T1());
                datePickerSelectByInput1("#taking_correction_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)));
                $("#submitCorrection").slideDown()
                break;
            }
            case '2':{
                $("#correction_type_main").append(correctionTime_T2());
                datePickerSelectByInput1("#taking_correction_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)) );
                $("#submitCorrection").slideDown()
                break;
            }
            case '3':
            case '4':{
                $("#correction_type_main").append(correctionTime_T3());
                datePickerSelectByInput1("#taking_correction_date",new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000)) );
                $("#from_time").on('change', function () {
                    $("#taking_correction_period").val('');
                    $("#to_time").val('');
                });
                $("#to_time").on('change', function () {
                    $("#taking_correction_period").val(diffTime($("#from_time").val(), $(this).val()));
                    let first = $("#from_time").val().split(':');
                    let second = $(this).val().split(':');
                    let firstTime = first[0] + first[1];
                    let secondTime = second[0] + second[1];
                    if (secondTime < firstTime) {
                        customAlert('warning', 'ساعت شروع مرخصی باید از ساعت پایان مرخصی کوچکتر باشد');
                        $(this).val('');
                    }
                });
                $("#submitCorrection").slideDown()
                break;
            }
        }
    });

    $("#v-pills-timesheet-tab").on('click', function () {
        getTableTimeSheetData();
    });
    $("#v-pills-leave-tab").on('click', function () {
        clearForm();
        $("#leave_type_main").append(leavingDaily());
        $("#taking_leave_type").trigger('change');
        companyTimeSheet=JSON.parse(atob($('#formTakingLeave').attr('data-company-workTime')));
        deviceTimeSheet=JSON.parse(atob($('#formTakingLeave').attr('data-device-worktime')));
        userTimeSheet=JSON.parse(atob($('#formTakingLeave').attr('data-user-worktime')));
        console.log(companyTimeSheet)
    });
    $("#v-pills-mission-tab").on('click', function () {
        clearForm();
        $("#mission_type_main").append(missionInternal());
        $("#mission_type").trigger('change');
    });
    $("#v-pills-overTime-tab").on('click', function () {
        clearForm();
        $("#overTime_type_main").append(overTime_T1());
        $("#overTime_type").trigger('change');
    });
    $("#v-pills-correction-tab").on('click', function () {
        clearForm();
        $("#correction_type_main").append(overTime_T1());
        $("#correction_type").trigger('change');
    });
    //change and check password
    $("#changePasswordButton").on('click', function () {
        swal.fire({
            icon: 'question',
            title: 'تغییر رمز عبور',
            allowOutsideClick: () => {
                return false;
            },
            confirmButtonText: 'تایید',
            cancelButtonText: 'انصراف',
            showCancelButton: true,
            html: `
<hr>
<fieldset class="fieldMain">
<div class="input-group">
<input type="password" id="lastPasswordInput" class="form-control" placeholder="رمز عبور فعلی" style="height: auto">
<div class="input-group-append">
<button class="btn btn-secondary" id="hideOrShowLastPassword"><i class="bx bx-show"></i></button>
</div>
</div>
</fieldset>

<fieldset class="mt-2 fieldMain">
<div class="input-group">
<input type="password" id="newPasswordInput" class="form-control" placeholder="رمز عبور جدید" style="height: auto">
<div class="input-group-append">
<button class="btn btn-secondary" id="hideOrShowNewPassword"><i class="bx bx-show"></i></button>
</div>
</div>
</fieldset>

<fieldset class="mt-2 fieldMain">
<div class="input-group">
<input type="password" id="newRepeatPasswordInput" class="form-control" placeholder="تکرار رمز عبور" style="height: auto">
<div class="input-group-append">
<button class="btn btn-secondary" id="hideOrShowNewRepeatPassword"><i class="bx bx-show"></i></button>
</div>
</div>
</fieldset>
<hr>
`,
            preConfirm: () => {
                let lastPassword = $("#lastPasswordInput").val();
                let newPassword = $("#newPasswordInput").val();
                let newTryPassword = $("#newRepeatPasswordInput").val();
                if (!lastPassword || !newPassword || !newTryPassword) {
                    $('.fieldMain').find(':input').each(function () {
                        if (!$(this).val()) {
                            $(this).addClass('is-invalid');
                        }
                        $(this).on('input', function () {
                            $(this).removeClass('is-invalid');
                            $(this).addClass('is-valid');
                        });
                    });
                    Swal.showValidationMessage('فیلد ها نمیتوانند خالی باشند');
                } else if (newPassword !== newTryPassword) {
                    $("#newPasswordInput").addClass('is-invalid');
                    $("#newRepeatPasswordInput").addClass('is-invalid');
                    Swal.showValidationMessage('رمز عبور جدید و تکرار رمز عبور یکسان نیستند');
                } else {
                    $.ajax({
                        url: APP_URL() + '/users/checkLastPassword',
                        type: 'POST',
                        data: {
                            lastPassword,
                            newPassword
                        }, success: result => {
                            if (result === 'changeSuccess') {
                                customAlert('success', 'رمز عبور با موفقیت تغییر کرد');
                            } else if (result === 'passwordWrong') {
                                customAlert('error', 'رمز عبور فعلی شما اشتباه است');
                                setTimeout(function () {
                                    $("#changePasswordButton").click();
                                }, 3000);

                            }
                        }
                    });
                }
            }
        });

        //action last password
        $("#hideOrShowLastPassword").on('click', function () {
            if ($(this).children('i').attr('class') === 'bx bx-show') {
                $(this).children('i').removeClass('bx bx-show');
                $(this).children('i').addClass('bx bx-hide');
                $("#lastPasswordInput").attr('type', 'text');
            } else {
                $(this).children('i').removeClass('bx bx-hide');
                $(this).children('i').addClass('bx bx-show');
                $("#lastPasswordInput").attr('type', 'password');
            }
        });

        //action new password
        $("#hideOrShowNewPassword").on('click', function () {
            if ($(this).children('i').attr('class') === 'bx bx-show') {
                $(this).children('i').removeClass('bx bx-show');
                $(this).children('i').addClass('bx bx-hide');
                $("#newPasswordInput").attr('type', 'text');
            } else {
                $(this).children('i').removeClass('bx bx-hide');
                $(this).children('i').addClass('bx bx-show');
                $("#newPasswordInput").attr('type', 'password');
            }
        });

        //action try new password
        $("#hideOrShowNewRepeatPassword").on('click', function () {
            if ($(this).children('i').attr('class') === 'bx bx-show') {
                $(this).children('i').removeClass('bx bx-show');
                $(this).children('i').addClass('bx bx-hide');
                $("#newRepeatPasswordInput").attr('type', 'text');
            } else {
                $(this).children('i').removeClass('bx bx-hide');
                $(this).children('i').addClass('bx bx-show');
                $("#newRepeatPasswordInput").attr('type', 'password');
            }
        });
    });
    $('#onlyGarbage').on('change',function(){
        if($(this).prop('checked')){
            $('#mainTimeSheetTable tr').each(function () {
                if (!$(this).hasClass('Defective-row'))
                    $(this).hide();
            });
        }
        else{
            $('#mainTimeSheetTable tr').show();
        }
        $('.Defective-row').each(function(i,v){
            $(this).removeClass('odd-row').removeClass('even-row')
            if( i % 2 > 0){
                $(this).addClass('even-row');
            }
            else{
                $(this).addClass('odd-row');
            }
        });
    });
    $('.infoShow').click(function(){
        let data=$(this).parent().attr('data-info');
        console.log(JSON.parse(atob(data)));
    });
    $('#changePriod').on('change',function (){
        getTableTimeSheetData();
    });
    $('#select_priod_next').on('click',function (){
       $('#changePriod').val(parseInt($('#changePriod').val())+1).change();
    });
    $('#select_priod_prev').on('click',function (){
       $('#changePriod').val(parseInt($('#changePriod').val())-1).change();
    });

});


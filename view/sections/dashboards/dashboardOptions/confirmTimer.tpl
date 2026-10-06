<div class="col-md-6 mt-1">
    <div class="card shadow">
        <div class="card-header">
            زمان گردش در کارتابل
        </div>
        <div class="card-body">
            <div class="table-responsive tableFixHead">
                <table class="table text-center table-hover table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th style="font-size: 10px !important;" class="border">ردیف</th>
                            <th style="font-size: 10px !important;" class="border" width="100">شماره پیشفاکتور</th>
                            <th style="font-size: 10px !important;" class="border">وضعیت</th>
                            <th style="font-size: 10px !important;" class="border">مشتری</th>
                            <th style="font-size: 10px !important;" class="border">شرکت مشتری</th>
                            <th style="font-size: 10px !important;" class="border">کارشناس</th>
                            <th style="font-size: 10px !important;" class="border">ارسال کننده</th>
                            <th style="font-size: 10px !important;" class="border">دریافت کننده</th>
                            <th style="font-size: 10px !important;" class="border">مدت زمان انتظار در کارتابل</th>
                        </tr>
                    </thead>
                    <tbody>
                    {$count = 1}
                    {foreach $cartableTime as $item}
                        <tr>
                            <td style="font-size: 10px !important;" class="border">{$count++}</td>
                            <td style="font-size: 10px !important;" class="border"><a href="/advanceInvoices/viewIndex/{$item['invoiceId']}" target="_blank">{$item['invoiceNumber']}</a></td>
                            <td style="font-size: 10px !important;" class="border">
                                {if $item['status'] == 'waitConfirm'}
                                    در انتظار تایید
                                    {elseif $item['status'] == 'notConfirm'}
                                    عدم تایید
                                {elseif $item['status'] == 'reviewToConfirm'}
                                    در انتظار بررسی مجدد
                                {/if}
                            </td>
                            <td style="font-size: 10px !important;" class="border">{$item['customer']}</td>
                            <td style="font-size: 10px !important;" class="border">{$item['customerCompany']}</td>
                            <td style="font-size: 10px !important;" class="border">{$item['expert']}</td>
                            <td style="font-size: 10px !important;" class="border">{$item['confirmer']}</td>
                            <td style="font-size: 10px !important;" class="border">{$item['userReceiver']}</td>
                            <td style="font-size: 10px !important;" class="border" dir="ltr">{$item['time']}</td>
                        </tr>
                    {/foreach}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
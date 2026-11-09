{include "sections/header.tpl"}
{include "sections/top-bar.tpl"}
{include "sections/side-menu.tpl"}
<div class="app-content content">
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header">
                        <h4 class="card-title">لیست {$pluralName}</h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshAndAddButton({$singleName})}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <table class="table tableDataShow text-center"
                                   style="background-color: #fff;border-radius: 5px;">
                                <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>نام مشتری</th>
                                    <th>شماره تماس مشتری</th>
                                    <th>محصول مشتری</th>
                                    <th>کاربر ثبت کننده</th>
                                    <th>تاریخ ثبت شکایت</th>
                                    <th>شماره قرارداد</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foreach $customersRequestsData as $key => $customerRequestData}
                                    <tr>
                                        <td class="border shadow">{$key+1}</td>
                                        <td class="border shadow">{$customerRequestData->customer_fullname}</td>
                                        <td class="border shadow">{$customerRequestData->customer_number}</td>
                                        <td class="border shadow">{$customerRequestData->customer_product}</td>
                                        <td class="border shadow">{$helper->getUserFullName($customerRequestData->user_id)}</td>
                                        <td class="border shadow">{jdate('Y/m/d',$customerRequestData->complaint_date)}</td>
                                        <td class="border shadow">{$customerRequestData->contract_number}</td>
                                        <td class="border shadow">
                                            <a href="editIndex/{$customerRequestData->id}"
                                               class="btn btn-sm btn-primary rounded-circle btn-icon d-inline-flex align-customerRequestDatas-center justify-content-center"
                                               style="width: 32px; height: 32px; padding: 0; border-radius: 50% !important;">
                                                <i class="bx bx-show"></i>
                                            </a>
                                            <form action="/HandlingComplaint/addIndexWithId" method="POST" style="display: inline;">
                                                <input type="hidden" name="id" value="{$customerRequestData->id}">

                                                <button type="submit"
                                                        class="btn btn-sm btn-success rounded-circle btn-icon Handling" {(($customerRequestData->status == 1)?'':'disabled')}
                                                        style="width: 32px; height: 32px; padding: 0; border-radius: 50% !important;">
                                                    <i class="bx bx-wrench"></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                {/foreach}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{include "sections/footer.tpl"}

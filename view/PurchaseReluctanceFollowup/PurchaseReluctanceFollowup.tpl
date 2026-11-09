{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">لیست {$pluralName}</h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshBtn()}
                        </div>
                    </div>
                    <div class="card-content shadow">
                        <div class="card-body table-responsive">
                            <table class="table tableDataShow shadow" style="background-color: #fff;border-radius: 5px;">
                                <thead class="thead-dark">
                                <tr>
                                    <th class="border">#</th>
                                    <th class="border">نام مشتری</th>
                                    <th class="border"> مشتری شماره همراه</th>
                                    <th class="border">محصول درخواستی مشتری</th>
                                    <th class="border">کارشناس</th>
                                    <th class="border">تاریخ ثبت عدم تمایل</th>
                                    <th class="border">عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foreach $getData as $key=>$item}
                                    <tr>
                                        <td class="border">
                                            {$key+1}
                                        </td>
                                        <td class="border">
                                            {$item->contactProjectData->contactData->first_name} {$item->contactProjectData->contactData->last_name}
                                        </td>
                                        <td class="border">
                                            {$item->contactProjectData->contactData->first_name}
                                        </td>
                                        <td class="border">
                                            {$item->contactProjectData->contactData->ContactNumbers[0]->phone_number}
                                        </td>
                                        <td class="border">
                                            {$item->userData->full_name}
                                        </td>
                                        <td class="border">
                                            {jdate('Y/m/d', strtotime($item->created_at))}
                                        </td>
                                        <td class="border">
                                            <div class="dropup">
                                                    <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer"
                                                          data-toggle="dropdown" aria-haspopup="true"
                                                          aria-expanded="false" role="menu">
                                                    </span>
                                                <div class="dropdown-menu" x-placement="bottom-start">
                                                    <a class="dropdown-item text-primary"
                                                       href="/application/Controllers/">
                                                        <i class="bx bx-task mr-1 text-primary"></i> پیگیری
                                                    </a>
                                                    <a class="dropdown-item text-danger Referral" data-id="{$item->id}" href="#">
                                                        <i class="bx bx-share text-warning mr-1"></i>
                                                        ارجاع
                                                    </a>
                                                </div>
                                            </div>
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


{include 'sections/footer.tpl'}

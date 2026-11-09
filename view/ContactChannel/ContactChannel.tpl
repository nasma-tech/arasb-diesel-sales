{include "sections/header.tpl"}
{include "sections/top-bar.tpl"}
{include "sections/side-menu.tpl"}
<div class="app-content content">
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}

        <div class="row">
            <div class="col-md-12">
                <div class="card">
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
                                    <th>عنوان راه ارتباطی</th>
                                    <th>عملیات</th>
                                </tr>
                                </thead>
                                <tbody class="shadow">
                                {foreach $contactChannelsData as $key=>$contactChannelData}
                                    <tr>
                                        <td class="border">{$key+1}</td>
                                        <td class="border">{$contactChannelData->contact_channel_title}</td>
                                        <td class="border">
                                            <div class="dropup">
                                                    <span class="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer"
                                                          data-toggle="dropdown" aria-haspopup="true"
                                                          aria-expanded="false" role="menu">
                                                    </span>
                                                <div class="dropdown-menu" x-placement="bottom-start">
                                                    <a class="dropdown-item text-primary"
                                                       href="/ContactChannel/editIndex/{$contactChannelData->id}">
                                                        <i class="bx bxs-wrench mr-1 text-warning"></i>ویرایش
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
{include "sections/footer.tpl"}

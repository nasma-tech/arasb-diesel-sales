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
                            {$buttonHelper->refreshAndAddButton({$singleName})}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <table class="table tableDataShow"
                                   style="background-color: #fff;border-radius: 5px;">
                                <thead class="thead-dark">
                                <tr>
                                    <th class="border">#</th>
                                    <th class="border">نام</th>
                                    <th class="border">کد رال</th>
                                    <th class="border">رنگ</th>
                                    <th class="border">وضعیت</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foreach $colors as $item}
                                    <tr>
                                        <td></td>
                                        <td>
                                            {$item->name}
                                            {$buttonHelper->actionButtons($item->id)}
                                        </td>
                                        <td>
                                            {$item->ral_code}
                                        </td>
                                        <td>
                                            <input type="color" class="form-control" value="{$item->hex}" style="padding: 0;height: 30px !important;" disabled>
                                        </td>
                                        <td class="text-center">
                                            {if $item->color_status == 1}
                                                <button type="button"
                                                        class="btn btn-icon rounded-circle btn-success glow actionButtonStatus"
                                                        data-toggle="tooltip" data-placement="top"
                                                        data-original-title="فعال" data-id="{$item->id}">
                                                    <i class="bx bx-check"></i>
                                                </button>
                                            {else}
                                                <button type="button"
                                                        class="btn btn-icon rounded-circle btn-danger glow actionButtonStatus"
                                                        data-toggle="tooltip" data-placement="top"
                                                        data-original-title="غیرفعال" data-id="{$item->id}">
                                                    <i class="bx bx-block"></i>
                                                </button>
                                            {/if}
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

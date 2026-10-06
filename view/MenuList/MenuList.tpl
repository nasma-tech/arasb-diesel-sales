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
                            <table class="table table-hover table-striped tableDataShow"
                                   style="background-color: #fff;border-radius: 5px;">
                                <thead class="thead-dark">
                                <tr>
                                    <th class="border">#</th>
                                    <th class="border">والد/زیرمجموعه</th>
                                    <th class="border">منو والد</th>
                                    <th class="border">نام فارسی</th>
                                    <th class="border">نام لاتین</th>
                                    <th class="border">عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foreach $menuList as $item}
                                    <tr>
                                        <td class="border">{$item->id}</td>
                                        <td class="border">
                                            {(($item->menu_parent == 0)?'منو اصلی':'زیر مجموعه')}
                                        </td>
                                        <td class="border">
                                            {(($item->menu_parent == 0)?'-':$menuListInstance::query()->find($item->menu_parent)->menu_persian_name)}
                                        </td>
                                        <td class="border">{$item->menu_persian_name}</td>
                                        <td class="border">{$item->menu_english_name}</td>
                                        <td class="border text-center">{$buttonHelper->actionButtons($item->id)}</td>
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

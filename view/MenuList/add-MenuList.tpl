{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}
<div class="app-content content">
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="row">
            <div class="col-md-12 mt-1">
                <div class="card shadow">
                    <div class="card-header">
                        <h4 class="card-title" style="float: right">افزودن {$singleName} جدید</h4>
                        {$buttonHelper->refreshAndBackButton()}
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-1">
                <form action="/MenuList/add" method="post">
                    {$csrf->csrfTokenInput()}
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>انتخاب منو</label>
                                    <select class="form-control select2" id="menu_parent" name="menu_parent">
                                        <option value="0">منو اصلی</option>
                                        {foreach $menuList->all() as $item}
                                            <option value="{$item->id}">{(($item->menu_parent == 0)?'منو اصلی':'زیر منو')}
                                                - {$item->menu_persian_name}</option>
                                        {/foreach}
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>نام فارسی منو</label>
                                    <input class="form-control" id="menu_persian_name" name="menu_persian_name">
                                </div>
                                <div class="col-md-3">
                                    <label>نام لاتین منو</label>
                                    <input class="form-control" list="translateList" autocomplete="off" dir="ltr" id="menu_english_name" name="menu_english_name">
                                    <datalist id="translateList"></datalist>
                                </div>
                                <div class="col-md-3">
                                    <label>آیکون</label>
                                    <input class="form-control" hidden="hidden" readonly="readonly" id="menu_icon" name="menu_icon">
                                    <div class="input-group">
                                        <button class="btn btn-sm btn-secondary" id="menuIconSpan" type="button"></button>
                                        <div class="input-group-append">
                                            <button class="btn btn-sm btn-secondary" id="selectIcon" type="button">انتخاب آیکون</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mt-2">
                                    <button class="btn btn-sm btn-primary float-right">ثبت نهایی</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{include 'sections/footer.tpl'}
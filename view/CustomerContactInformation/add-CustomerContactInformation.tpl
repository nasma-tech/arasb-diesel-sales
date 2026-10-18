{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header">
                        <h4 class="card-title">لیست {$pluralName}</h4>
                        <div class="heading-elements">
                            {$buttonHelper->refreshAndBackButton()}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card shadow" style="margin-top: 2px">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="contact_type">نوع مشتری</label>
                                    <select class="form-control select2" id="contact_type" name="contact_type">
                                        <option value="1">حقیقی</option>
                                        <option value="2">حقوقی</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="first_name">نام</label>
                                    <input class="form-control" id="first_name" name="first_name">
                                </div>
                                <div class="col-md-4">
                                    <label for="last_name">نام خانوادگی</label>
                                    <input class="form-control" id="last_name" name="last_name">
                                </div>
                                <div class="col-md-4 mt-2">
                                    <label for="state_id">استان محل سکونت</label>
                                    <select class="form-control select2" id="state_id" name="state_id">
                                        <option selected disabled>یک استان را انتخاب کنید</option>
                                        {foreach $states as $item}
                                            <option value="{$item->id}">{$item->title}</option>
                                        {/foreach}
                                    </select>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <label for="city_id">شهر محل سکونت</label>
                                    <select class="form-control select2" disabled id="city_id" name="city_id"></select>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <label for="contact_group_id">گروه مشتری</label>
                                    <select class="form-control select2" id="contact_group_id" name="contact_group_id"></select>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <label for="contact_acquisition_sources">نحوه آشنایی</label>
                                    <select class="form-control select2" id="contact_acquisition_sources" name="contact_acquisition_sources"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{include 'sections/footer.tpl'}

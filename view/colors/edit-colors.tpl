{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title" style="float: right"> ویرایش{$singleName}</h4>
                        {$buttonHelper->refreshAndBackButton()}
                    </div>
                    <hr>
                    <div class="card-content">
                        <div class="card-body">
                            <form action="edit/{$getData->id}" method="post" enctype="multipart/form-data">
                                {$csrf->csrfTokenInput()}

                                <div class="row">
                                    <div class="col-md-3">
                                        <label>HEX</label>
                                        <input type="color" name="hex" id="hex" class="form-control" value="{$getData->hex}" placeholder="کد HEX" style="padding: 0;height: 35px !important;">
                                    </div>
                                    <div class="col-md-3">
                                        <label>نام رنگ</label>
                                        <input type="text" name="name" value="{$getData->name}" class="form-control" placeholder="نام رنگ">
                                    </div>
                                    <div class="col-md-3">
                                        <label>کد رال</label>
                                        <input type="text" name="ral_code" value="{$getData->ral_code}" class="form-control" placeholder="کد رال">
                                    </div>
                                    <div class="col-md-3">
                                        <label>کد RGB</label>
                                        <input type="text" name="rgb_color" readonly value="{$getData->rgb_color}" class="form-control" placeholder="کد RGB">
                                    </div>
                                    <div class="col-md-3 mt-2">
                                        <label>نام رنگ فارسی</label>
                                        <input type="text" name="persian_name" class="form-control" value="{$getData->persian_name}" placeholder="نام رنگ">
                                    </div>
                                    <div class="col-md-3 mt-2">
                                        <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                                            <p class="mb-0">وضعیت</p>
                                            <input type="checkbox" class="custom-control-input" name="color_status" value="{$getData->color_status}" id="color_status" {(($getData->color_status == 1)?'checked':'')} >
                                            <label class="custom-control-label" for="color_status"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                    <button type="submit" class="btn btn-sm btn-success glow ">ویرایش اطلاعات</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{include 'sections/footer.tpl'}
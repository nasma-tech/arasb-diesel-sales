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
                        <h4 class="card-title" style="float: right">افزودن {$singleName} جدید</h4>
                        {$buttonHelper->refreshAndBackButton()}
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <form action="/Fishbone/add" method="post" enctype="multipart/form-data">
                                {$csrf->csrfTokenInput()}
                                <div class="row mt-3">
                                    <div class="col-md-3">
                                        <label for="fishbone_name">عنوان علت</label>
                                        <input type="text" class="form-control" name="fishbone_name" id="fishbone_name" required>
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <label for="fishbone_description">توضیحات علت</label>
                                        <textarea type="text" class="form-control" name="fishbone_description" id="fishbone_description" rows="10" style="resize: none"></textarea>
                                    </div>

                                </div>
                                <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                    <button type="submit" class="btn btn-sm btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">ثبت اطلاعات</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{include "sections/footer.tpl"}

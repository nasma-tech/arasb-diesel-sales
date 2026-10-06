{include 'sections/header.tpl'}
{include 'sections/top-bar.tpl'}
{include 'sections/side-menu.tpl'}

<div class="app-content content">
    <div class="content-wrapper">
        <div class="container">
            {$flashMessageHelper->formCallBack()}
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title" style="float: right">افزودن {$singleName} جدید</h4>
                            {$buttonHelper->refreshAndBackBtn()}
                        </div>
                        <hr>
                        <div class="card-content">
                            <div class="card-body">
                                <form action="/CartableDefinition/add" method="post" id="mainForm">
                                    {$csrf->csrfTokenInput()}

                                    <div class="row">
                                        <div class="col-md-12 mt-1">
                                            <div class="card shadow">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <label for="form_persian_title">عنوان کارتابل (فارسی)</label>
                                                            <input class="form-control" id="form_persian_title"
                                                                   required="required" name="form_persian_title">
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label for="form_english_title">عنوان کارتابل (لاتین)</label>
                                                            <input class="form-control" id="form_english_title"
                                                                   required="required" name="form_english_title"
                                                                   dir="ltr">
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label for="cartable_model">مدل</label>
                                                            <select class="form-control select2" name="cartable_model"
                                                                    id="cartable_model" required>
                                                                <option selected disabled>لطفا یک مورد را انتخاب کنید
                                                                </option>
                                                                {foreach $models as $model}
                                                                    <option value="{$model}">{$model}</option>
                                                                {/foreach}
                                                            </select>
                                                        </div>
                                                        <div class="col-md-4 mt-1">
                                                            <label for="view_address">View Address</label>
                                                            <input dir="ltr" class="form-control" type="text"
                                                                   name="view_address" id="view_address">
                                                        </div>
                                                        <div class="col-md-4 mt-1">
                                                            <label for="service_address">service</label>
                                                            <input class="form-control" type="text" name="service_address" id="service_address" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-1">
                                            <div class="card shadow cardMain">
                                                <div class="card-body">
                                                    <h6>چرخه کارتابل</h6>
                                                    <div class="table-responsive">
                                                        <table class="table text-center table-striped table-hover">
                                                            <thead class="thead-dark">
                                                            <tr>
                                                                <th class="border">استپ</th>
                                                                <th class="border" width="400">عنوان</th>
                                                                <th class="border" width="400">نام دسترسی</th>
                                                                <th class="border" width="400">کاربر</th>
                                                                <th class="border">حذف</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody id="mainMakeCartable"></tbody>
                                                            <tfoot>
                                                            <tr>
                                                                <td colspan="5" class="border" id="addCartableBtn">
                                                                    <button type="button" class="btn btn-sm py-0">
                                                                        افزودن ردیف جدید<i class="bx bx-down-arrow"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                        <button type="submit"
                                                class="btn btn-sm btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">ثبت
                                            اطلاعات
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{include 'sections/footer.tpl'}
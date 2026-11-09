{include "sections/header.tpl"}
{include "sections/top-bar.tpl"}
{include "sections/side-menu.tpl"}
<div class="app-content content">
    <div class="content-wrapper">
        {$flashMessageHelper->formCallBack()}
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow">
                        <div class="card-header">
                            <h4 class="card-title" style="float: right">افزودن {$singleName} جدید</h4>
                            {$buttonHelper->refreshAndBackButton()}
                        </div>
                        <div class="card-content">
                            <div class="card-body">
                                <form action="/CustomersRequest/add" method="post" enctype="multipart/form-data">
                                    {$csrf->csrfTokenInput()}
                                    <div class="row mt-3">
                                        <div class="col-md-12 mt-2">
                                            <div class="divider">
                                                <div class="divider-text">اطلاعات درخواست</div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 mt-2">
                                            <label for="request_type">نوع درخواست</label>
                                            <select type="text" class="form-control select2" name="request_type" required
                                                    id="request_type">
                                                <option value="" selected disabled>لطفا یک مورد انتخاب کنید</option>
                                                <option value="1">شکایت</option>
                                                <option value="2">پیشنهادات و انتقادات</option>
                                                <option value="3">تشکر یا تشویق</option>

                                            </select>
                                        </div>
                                        <div class="col-md-3 mt-2">
                                            <label for="customer_number">شماره موبایل درخواست کننده</label>
                                            <input type="text" class="form-control" name="customer_number" required
                                                   id="customer_number">
                                        </div>
                                        <div class="col-md-3 mt-2">
                                            <label for="customer_fullname">نام درخواست کننده</label>
                                            <input type="text" class="form-control" name="customer_fullname" required
                                                   id="customer_fullname">
                                        </div>
                                        <div class="col-md-3 mt-2">
                                            <label for="customer_product">خودرو،مدل و رنگ</label>
                                            <input type="text" class="form-control" name="customer_product" required
                                                   id="customer_product">
                                        </div>
                                        <div class="col-md-4 mt-2">
                                            <label for="chassis_number">شماره شاسی</label>
                                            <input type="text" class="form-control" name="chassis_number" required
                                                   id="chassis_number">
                                        </div>
                                        <div class="col-md-4 mt-2">
                                            <label for="requester">درخواست کننده</label>
                                            <select type="text" class="form-control select2" name="requester" required
                                                    id="requester">
                                                <option value="" disabled selected>لطفا یک مورد انتخاب کنید</option>
                                                <option value="1">مالک</option>
                                                <option value="2">پیگیری</option>
                                                <option value="3">خریدار</option>
                                            </select>
                                        </div>

                                        <div class="col-md-4 mt-2">
                                            <label for="request_basin">حوضه درخواست</label>
                                            <select type="text" class="form-control select2" name="request_basin"
                                                    required
                                                    id="request_basin">
                                                <option selected value="1">فروش</option>
                                                <option value="2">خدمات پس از فروش</option>
                                            </select>
                                        </div>

                                        <div class="col-md-6 mt-2">
                                            <label for="customer_address">آدرس</label>
                                            <textarea class="form-control" rows="6" name="customer_address"
                                                      id="customer_address" style="resize: none"></textarea>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label for="request_description">توضیحات درخواست</label>
                                            <textarea class="form-control" rows="6" name="request_description"
                                                      required
                                                      id="request_description" style="resize: none"></textarea>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <div class="divider">
                                                <div class="divider-text">اسناد درخواست</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-2 DocDiv row">
                                            <div class="col-md-4 mt-2">
                                                <input type="file" class="form-control" name="complaint_document[]"
                                                       required>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex flex-sm-row flex-column justify-content-start mt-1">
                                            <button type="button"
                                                    class="btn btn-sm btn-success glow mb-1 mb-sm-0 mr-0 mr-sm-1 addDocument">
                                                افزودن سند
                                                اطلاعات
                                            </button>
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
{include "sections/footer.tpl"}

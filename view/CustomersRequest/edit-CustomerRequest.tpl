{include "sections/header.tpl"}
{include "sections/top-bar.tpl"}
{include "sections/side-menu.tpl"}
<div class="app-content content">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow">
                    <div class="card-header">
                        <h4 class="card-title" style="float: right">افزودن {$singleName} جدید</h4>
                        {$helper->refreshAndBackBtn()}
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <form id="mainForm" enctype="multipart/form-data">
                                {$helper->csrfTokenInput()}
                                <div class="row mt-3">
                                    <div class="col-md-3 mt-2">
                                        <label for="customer_number">شماره موبایل شکایت کننده</label>
                                        <input type="text" class="form-control" name="customer_number" value="{$getData->customer_number}" readonly="readonly"
                                               id="customer_number">
                                    </div>
                                    <div class="col-md-3 mt-2">
                                        <label for="customer_fullname">نام شکایت کننده</label>
                                        <input type="text" class="form-control" name="customer_fullname" value="{$getData->customer_fullname}" readonly="readonly"
                                               id="customer_fullname">
                                    </div>
                                    <div class="col-md-3 mt-2">
                                        <label for="customer_product">خودرو،مدل و رنگ</label>
                                        <input type="text" class="form-control" name="customer_product" value="{$getData->customer_product}" readonly="readonly"
                                               id="customer_product">
                                    </div>
                                    <div class="col-md-3 mt-2">
                                        <label for="chassis_number">شماره شاسی</label>
                                        <input type="text" class="form-control" name="chassis_number" value="{$getData->chassis_number}" readonly="readonly"
                                               id="chassis_number">
                                    </div>
                                    <div class="col-md-3 mt-2">
                                        <label for="complainer">شکایت کننده</label>
                                        <select type="text" class="form-control select2" name="complainer" disabled
                                                id="complainer">
                                            <option value="" disabled >لطفا یک مورد انتخاب کنید</option>
                                            <option {(($getData->complainer == 1)?'selected':'')} value="1">مالک</option>
                                            <option {(($getData->complainer == 2)?'selected':'')} value="2">پیگیری</option>
                                            <option {(($getData->complainer == 3)?'selected':'')} value="3">خریدار</option>
                                        </select>
                                    </div>

                                    <div class="col-md-3 mt-2">
                                        <label for="complaint_basin">حوضه شکایت</label>
                                        <select type="text" class="form-control select2" name="complaint_basin" value="{$getData->complaint_basin}" disabled
                                                id="complaint_basin">
                                            <option value="" disabled >لطفا یک مورد انتخاب کنید</option>
                                            <option {(($getData->complainer == 1)?'selected':'')} value="1">فروش</option>
                                            <option {(($getData->complainer == 2)?'selected':'')} value="2">خدمات پس از فروش</option>
                                        </select>
                                    </div>
                                    {if $getData->contract_data != null && $getData->contract_number != null}
                                        <div class="col-md-3 mt-2">
                                            <label for="contract_data">تاریخ قرارداد</label>
                                            <input type="text" class="form-control" name="contract_data" value="{jdate('Y/m/d',$getData->contract_data)}" readonly="readonly"
                                                   id="contract_data">
                                        </div>
                                        <div class="col-md-3 mt-2">
                                            <label for="contract_number">شماره قرارداد</label>
                                            <input type="text" class="form-control" name="contract_number" value="{$getData->contract_number}" readonly="readonly"
                                                   id="contract_number">
                                        </div>
                                    {/if}
                                    {if $getData->admission_date != null && $getData->admission_number != null}

                                        <div class="col-md-3 mt-2">
                                            <label for="admission_date">تاریخ پذیرش</label>
                                            <input type="text" class="form-control" name="admission_date" value="{jdate('Y/m/d',$getData->admission_date)}" readonly="readonly"
                                                   id="admission_date">
                                        </div>
                                        <div class="col-md-3 mt-2">
                                            <label for="admission_number">شماره پذیرش</label>
                                            <input type="text" class="form-control" name="admission_number" value="{$getData->admission_number}" readonly="readonly"
                                                   id="admission_number">
                                        </div>
                                    {/if}
                                    <div class="col-md-3 mt-2 d-flex align-items-end">
                                        <button type="button" class="btn btn-primary btn-sm showPicture" data-address="{APP_URL}/Storage/RegisterComplaint/{$getData->id}/{$getData->complaint_document}">نمایش عکس</button>
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <label for="customer_address">آدرس</label>
                                        <input type="text" class="form-control" name="customer_address" value="{$getData->customer_address}" readonly="readonly"
                                               id="customer_address">
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <label for="complaint_description">توضیحات شکایت</label>
                                        <textarea class="form-control" rows="6" name="complaint_description" readonly="readonly"
                                                  id="complaint_description">{$getData->complaint_description}</textarea>
                                    </div>

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

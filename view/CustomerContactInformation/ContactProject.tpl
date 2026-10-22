<div class="col-md-6">
    <div class="card shadow" style="margin-top: 4px;height: 100%">
        <div class="card-content">
            <div class="card-header">
                <div class="divider divider-left">
                    <div class="divider-text" style="font-size: 11px">اطلاعات درخواست</div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <label for="industry_type_id">نوع صنعت</label>
                        <select class="form-control select2" id="industry_type_id" name="industry_type_id">
                            <option selected disabled>یک مورد را انتخاب کنید</option>
                            {foreach $IndustryType as $item}
                                <option value="{$item->id}">{$item->title}</option>
                            {/foreach}
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="payment_type">نوع پرداخت</label>
                        <select class="form-control select2" id="payment_type" name="payment_type">
                            <option selected disabled>یک مورد را انتخاب کنید</option>
                            <option value="1">نقد</option>
                            <option value="2">اقساط</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="purchase_type">نوع خرید</label>
                        <select class="form-control select2" id="purchase_type" name="purchase_type">
                            <option selected disabled>یک مورد را انتخاب کنید</option>
                            <option value="1">نو</option>
                            <option value="2">کارکرده</option>
                        </select>
                    </div>

                    <div class="table-responsive mt-3">
                        <table class="table text-center">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="border">گروه</th>
                                    <th class="border">برند</th>
                                    <th class="border">مدل</th>
                                    <th class="border">تیپ</th>
                                    <th class="border">تعداد</th>
                                    <th class="border">عملیات</th>
                                </tr>
                            </thead>
                            <tbody id="productRequestTableBody"></tbody>
                            <tfoot>
                            <tr>
                                <th class="border" colspan="6">
                                    <button class="btn btn-xs btn-success w-100" id="productAppend" type="button">
                                        <i class="bx bx-plus" style="font-size: 14px"></i>
                                    </button>
                                </th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-6">
    <div class="card shadow" style="margin-top: 2px;height: 100%">
        <div class="card-content">
            <div class="card-header">
                <div class="divider divider-left">
                    <div class="divider-text" style="font-size: 11px">اطلاعات اولیه</div>
                </div>
            </div>
            <div class="card-body">
                <input type="hidden" readonly="readonly" id="contact_type" name="contact_type" value="">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <button class="btn btn-sm btn-light-primary active w-100 selectContactTypeButton" type="button"
                           data-type="real">حقیقی
                        </button>
                    </div>
                    <div class="col-md-6 pl-md-0">
                        <button class="btn btn-sm btn-light-primary w-100 selectContactTypeButton" type="button"
                           data-type="legal">
                            حقوقی
                        </button>
                    </div>
                </div>
                <div class="row" id="mainContactForm"></div>
            </div>
        </div>
    </div>
</div>
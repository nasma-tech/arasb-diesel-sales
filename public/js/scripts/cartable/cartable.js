$(function () {
    const submitForm = () => {
        return `
        <div class="card text-left">
            <div class="card-content">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label for="cartable_description">توضیحات</label>
                            <textarea class="form-control" name="cartable_description" id="cartable_description" rows="4" style="resize: none"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    $(".submitCartable").on('click', function () {
        let definitionId = $(this).data('definition-id')
        let requestId = $(this).data('request-id')
        Swal.fire({
            title: "ارسال کارتابل",
            width: '35vw',
            html: submitForm(),
            showDenyButton: true,
            denyButtonText: 'انصراف',
            confirmButtonText: 'تایید',
            preConfirm: () => {
                let description = $("#cartable_description").val()
                Swal.fire({
                    title: 'تایید نهایی',
                    icon: 'warning',
                    text: 'از ارسال کارتابل اطمینان دارید؟',
                    showDenyButton: true,
                    reverseButtons: true,
                    denyButtonText: 'انصراف',
                    confirmButtonText: 'تایید',
                    preConfirm: () => {
                        $.ajax({
                            url: "/CartableManagement/submitCartableForm",
                            method: 'POST',
                            data: {
                                csrfToken: csrfToken(),
                                definitionId,
                                requestId,
                                description
                            },
                            success: result => {
                                handeOfAjaxJsonResponse(result)
                            }
                        })
                    }
                })
            }
        })
    })

    $(".actionCartable").on('click', function () {
        let definitionId = $(this).data('definition-id')
        let requestId = $(this).data('request-id')
        let action = $(this).data('action')

        const html = (action) => {
            let label = 'نامشخص'

            switch (action) {
                case 'approve':
                    label = '<span class="text-success">تایید</span>';
                    break;
                case 'reject':
                    label = '<span class="text-danger">عدم تایید</span>';
                    break;
            }
            return `
            <div class="card text-left" id="cartableActionModal">
                <div class="card-content">
                    <div class="card-body p-0 m-0">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h6>از ${label} کارتابل اطمینان دارید؟</h6>
                            </div>
                            <div class="col-md-12">
                                <textarea class="form-control" style="resize: none" id="cartable_description" name="cartable_description" rows="5" placeholder="توضیحات" ${((action === 'reject') ? 'required="required"' : '')}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        Swal.fire({
            title: 'بررسی کارتابل',
            icon: 'question',
            html: html(action),
            showDenyButton: true,
            reverseButtons: false,
            denyButtonText: 'انصراف',
            confirmButtonText: 'تایید',
            preConfirm: () => {
                if ($("#cartableActionModal").formValidate(false, 'exception', 4, true)) {
                    let description = $("#cartable_description").val()

                    Swal.fire({
                        title: 'تایید نهایی',
                        icon: 'warning',
                        text: 'از انتخاب خود اطمینان دارید؟',
                        showDenyButton: true,
                        reverseButtons: true,
                        denyButtonText: 'انصراف',
                        confirmButtonText: 'تایید',
                        preConfirm: () => {
                            $.ajax({
                                url: "/CartableManagement/actionCartableForm",
                                method: 'POST',
                                data: {
                                    csrfToken: csrfToken(),
                                    action,
                                    definitionId,
                                    requestId,
                                    description
                                },
                                success: result => {
                                    handeOfAjaxJsonResponse(result)
                                }
                            })
                        }
                    })
                } else {
                    swalValidate('موارد مشخص شده را پر کنید')
                }
            }
        })
    })

})
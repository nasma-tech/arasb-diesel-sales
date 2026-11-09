$(function () {

    function referralForm() {
        return `
            <div>
                <div>
                     <label for="user_id">کارشناس</label>
                     <select class="form-control select2" id="user_id"></select>
                </div>

  
                <div class="mt-1">
                      <label for="referral_description">توضیحات ارجاع</label>
                      <textarea name="referral_description" id="referral_description" class="form-control" rows="5" style="resize: none"></textarea>
                </div>
            </div>
        `;
    }

    $('.Referral').on('click', function () {
        let id = $(this).data('id');
        Swal.fire({
            title: 'ارجاع',
            html: referralForm(),
            showCloseButton: true,
            confirmButtonText : 'ارجاع',
            preConfirm: () => {
                let user_id = $('#user_id').val();
                let referral_description = $('#referral_description').val();

                if (!user_id) {
                    Swal.showValidationMessage('لطفاً کاربر موردنظر را انتخاب کنید');
                    return false;
                }

                if (!referral_description) {
                    Swal.showValidationMessage('لطفاً توضیحات ارجاع را وارد کنید');
                    return false;
                }
                

                $.ajax({
                    url: 'referralFollowUp',
                    type: 'POST',
                    data: {
                        id ,
                        user_id,
                        referral_description
                    },
                    success: result => {
                        if (result === 'referralSuccess') {
                            swal.fire({
                                title: 'ارجاع با موفقیت انجام شد',
                                icon: "success",
                                confirmButtonText : 'تایید',
                                preConfirm: () => {
                                    window.location.reload();
                                }
                            })
                        }else if (result === 'referralFail') {
                            swal.fire({
                                title: 'ارجاع با موفقیت شکست خورد',
                                icon: "error",
                                showCloseButton: true,
                                showConfirmButton: false,
                            })
                        } else {
                            swal.fire({
                                title: 'یک مورد با مشکل مواجه شد',
                                icon: "error",
                                closeButton: true,
                                showConfirmButton: false,
                            })
                        }
                    }
                })
            },
            didOpen: () => {
                $.ajax({
                    url: '/users/getUserOptions',
                    type: 'GET',
                    success: res => {
                        $('#user_id').html(res).select2()
                    }
                })
            }
        });
    });

});
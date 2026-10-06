$(function () {
    $("#submitLogin").on('click', function () {
        let userName = $("#userName").val();
        let userPassword = $("#userPassword").val();
        if (!userName || !userPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'توجه !',
                text: 'نام کاربری یا رمز عبور نمیتواند خالی باشد',
                confirmButtonText: 'فهمیدم!'
            })
        } else {
            let form = $("#mainLogin");
            let formData = new FormData(form[0])
            $.ajax({
                url: '/auth/authentication',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: result => {
                    if (result === 'successLogin') {
                        window.location.href = '/dashboard/main';
                    }
                    if (result === 'userNotFound') {
                        Swal.fire({
                            icon: 'warning',
                            title: 'توجه !',
                            text: 'نام کاربری یا رمز عبور اشتباه است',
                            confirmButtonText: 'فهمیدم!'
                        })
                    }
                }
            })
        }
    })

    $(document).keypress(function (e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            $("#submitLogin").click()
        }
    })
});
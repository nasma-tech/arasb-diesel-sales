$(function () {
    $("#company_id").on('change', function () {
        let companyId = $(this).val()
        $("#representation_id").html('<option value="0">بدون نمایندگی</option>')
        $.ajax({
            url: '/Representations/getFilterRepresentation',
            type: 'POST',
            data: {companyId},
            success: result => {
                if (result) {
                    let data = JSON.parse(result)
                    $.each(data, function (key, item) {
                        $("#representation_id").append(`<option value="${item.id}">${item.title}</option>`)
                    })
                }
            }
        })
    })
    $("#full_name").persianInput()
    $("#national_code").numberInput(10)
    $("#user_mobile").numberInput(11)
    $(".changeAvatar").on("click", function () {
        $("#avatarInput").click();
    });

    $("#avatarInput").on("change", function () {
        readImage(this, "avatarImage");
    });
})
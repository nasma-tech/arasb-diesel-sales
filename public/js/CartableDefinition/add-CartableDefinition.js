$(function () {

    $("#form_persian_title").persianInput()
    $("#form_english_title").englishInput()

    const makeStepCartable = (counter) => {
        $.ajax({
            url: 'getPermissionList',
            type: 'POST',
            success: result => {
                let data = JSON.parse(result)
                $("#permission_id_" + counter).append('<option selected disabled>لطفا یک مورد را انتخاب کنید</option>')
                $.each(data, function (key, item) {
                    $("#permission_id_" + counter).append(`
                        <option value="${item.id}" data-users='${JSON.stringify(item.users)}'>${item.titlePersian}</option>
                    `).select2({
                        width: "100%"
                    })
                })
            }
        }).done(function () {
            unblockCardLoader('.cardMain')
        })
        return `
            <tr>
                <td class="border"></td>
                <td class="border">
                    <input class="form-control" data-counter="${counter}" required="required" id="permission_title_${counter}" name="cartable_schema[${counter}][step_title]">
                </td>
                <td class="border">
                    <select class="form-control" data-counter="${counter}" required="required" id="permission_id_${counter}" name="cartable_schema[${counter}][permission_id]"></select>
                </td>
                <td class="border">
                    <select class="form-control" disabled="disabled" required="required" data-counter="${counter}" id="user_permission_id_${counter}" name="cartable_schema[${counter}][user_permission_id]"></select>
                </td>
                <td class="border">
                    <div class="badge badge-danger" id="removeRow_${counter}" style="cursor: pointer">حذف</div>
                </td>
            </tr>
        `
    }

    let counter = 1;
    const countRowLoop = () => {
        let coutRow = 1;
        $("#mainMakeCartable tr").each(function () {
            $(this).find('td').eq(0).text(coutRow++)
        })
    }

    $("#addCartableBtn").on('click', function () {
        cardLoader('.cardMain')
        $("#mainMakeCartable").append(makeStepCartable(counter))
        $("#permission_id_" + counter).on('change', function () {
            let users = $(this).find(':selected').data('users')
            let counterThis = $(this).data('counter');
            $("#user_permission_id_" + counterThis)
                .html('<option selected disabled>لطفا یک مورد را انتخاب کنید</option><option value="variable">متغیر (تشخیص هنگام تخصیص کارتابل)</option>')
                .attr('disabled', false)
            $.each(users, function (key, item) {
                $("#user_permission_id_" + counterThis).append(`
                    <option value="${item.userId}">${item.userFullName}</option>
                `).select2({
                    width: "100%"
                })
            })
        })
        $("#removeRow_" + counter).on('click', function () {
            $(this).closest('tr').remove()
            countRowLoop()
        })
        counter++;
        countRowLoop()
    })

    $("#cartable_model").on('change' , function () {
        let value = $(this).val()
        let split = value.split('\\').pop().replace(/Model$/, '')
        $("#service_address").val(split + "Service")
    })
})
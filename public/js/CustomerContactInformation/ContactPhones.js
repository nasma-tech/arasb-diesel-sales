$(function () {
    const makePhoneRow = (counter) => {
        $.ajax({
            url: '/ContactPhoneLabel/getContactPhoneLabel',
            type: 'GET',
            dataType: 'json',
            success: result => {
                $.each(result, function (key, item) {
                    $(`#contact_phone_label_id_${counter}`).append(`<option value="${item.id}">${item.title}</option>`)
                })
            }
        })
        return `
            <tr>
                <td class="border">
                    <select id="contact_phone_label_id_${counter}" name="contactPhone[${counter}][contact_phone_label_id]" class="contact_phone_label_id"></select>
                </td>
                <td class="border">
                    <input class="form-control phone_number" type="tel" dir="ltr" id="phone_number_${counter}" name="contactPhone[${counter}][phone_number]">
                </td>
                <td class="border">
                    <div class="dropdown">
                        <button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="bx bx-dots-horizontal-rounded"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                            <a class="dropdown-item removePhoneRow">
                                  <i class="bx bx-trash text-danger"></i>
                                  <span class="ml-1">حذف</span>
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        `
    }
    let phoneTrCounter = 1;
    $("#phoneAppend").on('click', function () {
        $("#phoneTableBody").append(makePhoneRow(phoneTrCounter))
        $(".removePhoneRow").off().on('click', function () {
            $(this).closest('tr').remove()
        })
        $(".phone_number").off().on('input', function () {
            let value = $(this).val();
            if (value.length !== 11) {
                $(this).addClass('is-invalid').removeClass('is-valid')
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid')
            }
        }).numberInput(11)
        $(".contact_phone_label_id").select2({
            width: '100%'
        })
        phoneTrCounter++
    })

})
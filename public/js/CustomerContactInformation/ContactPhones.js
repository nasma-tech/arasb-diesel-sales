$(function () {
    const makePhoneRow = (counter) => {
        $.ajax({
            url: '/ContactPhoneLabel/getContactPhoneLabel',
            type: 'GET',
            dataType: 'json',
            success: result => {
                $(`#contact_phone_label_id_${counter}`).append('<option selected disabled>انتخاب کنید</option>')
                $.each(result, function (key, item) {
                    $(`#contact_phone_label_id_${counter}`).append(`<option data-social="${item.hasSocial}" value="${item.id}">${item.title}</option>`)
                })
            }
        })
        return `
            <tr>
                <td class="border">
                    <select id="contact_phone_label_id_${counter}" data-count="${counter}" name="contactPhone[${counter}][contact_phone_label_id]" class="contact_phone_label_id"></select>
                </td>
                <td class="border">
                    <input class="form-control phone_number" type="tel" dir="ltr" data-count="${counter}" id="phone_number_${counter}" name="contactPhone[${counter}][phone_number]">
                </td>
                <td class="border">
                    <div class="dropdown">
                        <button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="bx bx-dots-horizontal-rounded"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                            <a class="dropdown-item removePhoneRow" data-count="${counter}">
                                  <i class="bx bx-trash text-danger"></i>
                                  <span class="ml-1">حذف</span>
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr id="socialTrRow_${counter}">
                <td class="border" colspan="3">
                    <ul class="list-unstyled" style="margin-top: 5px;margin-bottom: 3px" id="socialRow_${counter}"></ul>
                </td>
            </tr>
        `
    }
    let phoneTrCounter = 1;
    $("#phoneAppend").on('click', function () {
        $("#phoneTableBody").append(makePhoneRow(phoneTrCounter))
        $(".removePhoneRow").off().on('click', function () {
            let count = $(this).data('count');
            $(this).closest('tr').remove()
            $(`#socialTrRow_${count}`).remove()
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
        $(".contact_phone_label_id").on('change', function () {
            let count = $(this).data('count');
            let hasSocial = $(this).find(':selected').data('social');
            if (hasSocial) {
                $.ajax({
                    url: '/SocialNetworksList/getSocialNetworkList',
                    dataType: 'json',
                    success: result => {
                        $.each(result, function (key, item) {
                            let makeId = count+'_'+key;
                            $(`#socialRow_${count}`).append(`
                                <li class="d-inline-block mr-2 mb-1">
                                    <fieldset>
                                        <div class="checkbox checkbox-primary checkbox-glow">
                                            <input type="checkbox" name="social_" id="socialBox_${makeId}">
                                            <label for="socialBox_${makeId}"><img src="${item.icon}" alt="${item.title}" width="20" height="20"></label>
                                        </div>
                                    </fieldset>
                                </li>
                            `)
                        })
                    }
                })
            } else {
                $(`#socialRow_${count}`).empty()
            }
        })
        phoneTrCounter++
    })

})
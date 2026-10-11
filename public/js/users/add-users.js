$(function () {
    // $("#company_id").on('change', function () {
    //     let companyId = $(this).val()
    //     $("#representation_id").html('<option value="0">بدون نمایندگی</option>')
    //     $.ajax({
    //         url: '/Representations/getFilterRepresentation',
    //         type: 'POST',
    //         data: {companyId},
    //         success: result => {
    //             if (result) {
    //                 let data = JSON.parse(result)
    //                 $.each(data, function (key, item) {
    //                     $("#representation_id").append(`<option value="${item.id}">${item.title}</option>`)
    //                 })
    //             }
    //         }
    //     })
    // })
    // $("#full_name").persianInput()
    // $("#national_code").numberInput(10)
    // $("#user_mobile").numberInput(11)

    $("#userIdentify_birth_date").datePicker()

    const numberInputs = {
        userIdentify_national_id: 10,
        userIdentify_passport_number: 10,
    }

    const persianInputs = [
        'userData_first_name',
        'userData_last_name',
        'userIdentify_father_name',
        'userIdentify_birth_place',
    ];

    $.each(numberInputs, function (key, value) {
        $(`#${key}`).numberInput(value)
    })

    $.each(persianInputs, function (index, value) {
        $(`#${value}`).persianInput();
    });

    $(".changeAvatar").on("click", function () {
        $("#avatarInput").click();
    });
    $("#avatarInput").on("change", function () {
        readImage(this, "avatarImage");
    });

    let addressCounter = $("#addressTable tbody tr").length

    const addressRow = (addressCounter, data) => {
        const fullAddress = `شهر ${data.cityTitle}، ${data.main_street}, ${data.side_street}, کوچه ${data.alley_name}, پلاک ${data.plaque}, واحد ${data.unit}`
        return `
        <tr>
            <td class="border">
                <div class="radio">
                    <input class="form-control" type="radio" name="userAddress_is_default" id="userAddress_${addressCounter}_is_default"
                        ${((parseInt($("#addressTable tbody tr").length) === 0) ? 'checked' : '')}
                        value="${addressCounter}"
                     > 
                    <label for="userAddress_${addressCounter}_is_default"></label>
                </div>
            </td>
            <td class="border">
                <input type="hidden" name="userAddress[${addressCounter}][alley_name]" value='${data.alley_name}'>
                <input type="hidden" name="userAddress[${addressCounter}][area_code]" value='${data.area_code}'>
                <input type="hidden" name="userAddress[${addressCounter}][city_id]" value='${data.city_id}'>
                <input type="hidden" name="userAddress[${addressCounter}][landline_number]" value='${data.landline_number}'>
                <input type="hidden" name="userAddress[${addressCounter}][main_street]" value='${data.main_street}'>
                <input type="hidden" name="userAddress[${addressCounter}][side_street]" value='${data.side_street}'>
                <input type="hidden" name="userAddress[${addressCounter}][plaque]" value='${data.plaque}'>
                <input type="hidden" name="userAddress[${addressCounter}][postal_code]" value='${data.postal_code}'>
                <input type="hidden" name="userAddress[${addressCounter}][unit]" value='${data.unit}'>
                <input class="form-control" name="userAddress[${addressCounter}][complete_address]" type="text" value="${fullAddress}">
            </td>
            <td class="border">
                <button type="button" class="btn btn-icon rounded-circle btn-warning">
                    <i class="bx bx-show"></i>
                </button>
            </td>
        </tr>
        `
    }

    const addressForm = async () => {
        let citiesOption = `<option selected disabled>لطفا یک مورد را انتخاب کنید</option>`
        let result = await $.ajax({
            url: "/cities/getFilterCities",
            dataType: 'json',
        })

        $.each(result, async function (key, obj) {
            citiesOption += `<option value="${obj.id}">${obj.title}</option>`
        })

        return `
        <div class="card">
            <div class="card-body">
                <form id="addressForm">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="city_id">شهر</label>
                            <select class="form-control" name="city_id" id="city_id" required>${citiesOption}</select>
                        </div>
                        <div class="col-md-5">
                            <label for="main_street">خیابان اصلی</label>
                            <input class="form-control" type="text" name="main_street" id="main_street" required>
                        </div>
                        <div class="col-md-4">
                            <label for="side_street">خیابان فرعی</label>
                            <input class="form-control" type="text" name="side_street" id="side_street" required>
                        </div>
                        <div class="col-md-2">
                            <label for="alley_name">کوچه</label>
                            <input class="form-control" type="text" name="alley_name" id="alley_name" required>
                        </div>
                        <div class="col-md-2">
                            <label for="plaque">پلاک</label>
                            <input class="form-control" type="text" name="plaque" id="plaque" required>
                        </div>
                        <div class="col-md-2">
                            <label for="unit">واحد</label>
                            <input class="form-control" type="text" name="unit" id="unit" required>
                        </div>
                        <div class="col-md-3">
                            <label for="postal_code">کد پستی</label>
                            <input class="form-control" type="text" name="postal_code" id="postal_code" required>
                        </div>
                        <div class="col-md-3">
                            <label for="landline_number">شماره ثابت</label>
                            <div class="input-group">
                                <input class="form-control" type="text" name="landline_number" id="landline_number" required>
                                <div class="input-group-append">
                                    <input class="form-control" type="text" name="area_code" id="area_code" required placeholder="کد" style="max-width: 50px">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `
    }

    $("#newAddressBtn").on('click', async function () {
        let addressTable = $("#addressTable")

        swal.fire({
            title: "افزودن آدرس",
            width: "55vw",
            html: await addressForm(),
            showDenyButton: true,
            denyButtonText: "انصراف",
            confirmButtonText: "تایید",
            preConfirm: () => {
                if ($("#addressForm").formValidate(false)) {

                    let data = getInputsNested("#addressForm")

                    data.cityTitle = $("#city_id").find("option:selected").text()

                    addressTable.find('tbody').append(addressRow(++addressCounter, data))

                } else {
                    swalValidate('موارد مشخص شده را پر کنید')
                }
            }
        })

        $("#city_id").select2({
            width: "100%",
        })

        const numberInputs = {
            postal_code: 10,
            landline_number: 8,
            area_code: 3,
        }

        $.each(numberInputs, function (key, value) {
            $(`#${key}`).numberInput(value, false)
        })

    })

})
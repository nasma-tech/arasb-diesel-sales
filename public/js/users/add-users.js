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

    const addressRow = (addressCounter) => {
        return `
        <tr>
            <td class="border">
                <div class="radio">
                    <input class="form-control" type="radio" name="userAddress_is_default" id="userAddress_${addressCounter}_is_default" value="${addressCounter}"> 
                    <label for="userAddress_${addressCounter}_is_default"></label>
                </div>
            </td>
            <td class="border"></td>
            <td class="border"></td>
            <td class="border">
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
                <div class="row">
                    <div class="col-md-3">
                        <label for="city_id">شهر</label>
                        <select class="form-control" name="city_id" id="city_id">${citiesOption}</select>
                    </div>
                    <div class="col-md-5">
                        <label for="main_street">خیابان اصلی</label>
                        <input class="form-control" type="text" name="main_street" id="main_street">
                    </div>
                    <div class="col-md-4">
                        <label for="main_street">خیابان فرعی</label>
                        <input class="form-control" type="text" name="main_street" id="main_street">
                    </div>
                    <div class="col-md-2">
                        <label for="alley_name">کوچه</label>
                        <input class="form-control" type="text" name="alley_name" id="alley_name">
                    </div>
                    <div class="col-md-2">
                        <label for="plaque">پلاک</label>
                        <input class="form-control" type="text" name="plaque" id="plaque">
                    </div>
                    <div class="col-md-2">
                        <label for="unit">واحد</label>
                        <input class="form-control" type="text" name="unit" id="unit">
                    </div>
                    <div class="col-md-3">
                        <label for="postal_code">کد پستی</label>
                        <input class="form-control" type="text" name="postal_code" id="postal_code">
                    </div>
                    <div class="col-md-3">
                        <label for="landline_number">شماره ثابت</label>
                        <div class="input-group">
                            <input class="form-control" type="text" name="landline_number" id="landline_number">
                            <div class="input-group-append">
                                <input class="form-control" type="text" name="area_code" id="area_code" placeholder="کد" style="max-width: 50px">
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        `
    }
    // <th className="border">#</th>
    // <th className="border">وضعیت</th>
    // <th className="border">شهر</th>
    // <th className="border"></th>
    // <th className="border"></th>
    // <th className="border"></th>
    // <th className="border"></th>
    // <th className="border"></th>
    // <th className="border">کد پستی</th>
    // <th className="border">شماره ثابت</th>
    // <th className="border">عملیات</th>


    $("#newAddressBtn").on('click', async function () {
        let addressTable = $("#addressTable")

        swal.fire({
            title: "افزودن آدرس",
            width: "55vw",
            html: await addressForm(),
            showDenyButton: true,
            denyButtonText: "انصراف",
            confirmButtonText: "تایید"
        })


        addressTable.find('tbody').append(addressRow(++addressCounter))
    })

})
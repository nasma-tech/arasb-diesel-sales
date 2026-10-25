$(function () {
    const makeProductRow = (counter) => {
        $(`#car_group_id_${counter}`).getOptionsValue({
            urlAddress: '/CarsGroup/getCarGroups', callback: result => {
                $.each(result, function (key, item) {
                    $(`#car_group_id_${counter}`).append(`<option value="${item.id}">${item.title}</option>`)
                })
            }
        })
        $(`#car_brand_id_${counter}`).getOptionsValue({
            urlAddress: '/CarsBrand/getCarBrands', callback: result => {
                $.each(result, function (key, item) {
                    $(`#car_brand_id_${counter}`).append(`<option value="${item.id}">${item.title}</option>`)
                })
            }
        })
        return `
            <tr>
                <td class="border">
                    <select class="form-control carsOptionsSelect carGroupId select2" data-count="${counter}" id="car_group_id_${counter}" name="projectRequest[${counter}][car_group_id]">
                         <option selected disabled>گروه خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <select class="form-control carsOptionsSelect carBrandId select2" data-count="${counter}" id="car_brand_id_${counter}" name="projectRequest[${counter}][car_brand_id]">
                         <option selected disabled>برند خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <select class="form-control carsOptionsSelect carModelId select2" data-count="${counter}" id="car_model_id_${counter}" name="projectRequest[${counter}][car_model_id]">
                       <option selected disabled>مدل خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <select class="form-control carsOptionsSelect carTipId select2" data-count="${counter}" id="car_tip_id_${counter}" name="projectRequest[${counter}][car_tip_id]">
                            <option selected disabled>تیپ خودرو</option>
                    </select>
                </td>
                <td class="border" width="150">
                    <input class="form-control requestAmount" dir="ltr" type="number" id="request_amount" data-count="${counter}" name="projectRequest[${counter}][request_amount]">
                </td>
                <td class="border">
                    <button class="btn btn-xs btn-icon btn-danger removeRequestRow">
                        <i class="bx bx-trash"></i>
                    </button>
                </td>
            </tr>
        `
    }
    let productCounter = 1;
    $("#productAppend").on('click', function () {
        $("#productRequestTableBody").append(makeProductRow(productCounter))
        $(".carsOptionsSelect").select2({
            width: '100%'
        })
        $(".removeRequestRow").on('click', function () {
            $(this).closest('tr').remove()
        })
        $(".carBrandId").on('change',function () {
            let rowCount = $(this).data('count')
            $(`#car_model_id_${rowCount}`).empty().append('<option selected disabled>مدل خودرو</option>')
            $(`#car_tip_id_${rowCount}`).empty().append('<option selected disabled>تیپ خودرو</option>')
            $(this).getOptionsValue({
                urlAddress: '/CarsModel/getCarModel', callback: result => {
                    $.each(result, function (key, item) {
                        $(`#car_model_id_${rowCount}`).append(`<option value="${item.id}">${item.title}</option>`)
                    })
                },requestData:{
                    carBrandId :$(this).val()
                }
            })
        })
        $(".carModelId").on('change',function () {
            let rowCount = $(this).data('count')
            $(`#car_tip_id_${rowCount}`).empty().append('<option selected disabled>تیپ خودرو</option>')
            $(this).getOptionsValue({
                urlAddress: '/CarsTip/getCarTips', callback: result => {
                    $.each(result, function (key, item) {
                        $(`#car_tip_id_${rowCount}`).append(`<option value="${item.id}">${item.title}</option>`)
                    })
                },requestData:{
                    carModelId :$(this).val()
                }
            })
        })
        productCounter++
    })
})
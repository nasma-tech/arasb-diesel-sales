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
                    <select class="form-control carsOptionsSelect select2" id="car_group_id_${counter}" name="projectRequest[${counter}][car_group_id]">
                         <option selected disabled>گروه خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <select class="form-control carsOptionsSelect select2" id="car_brand_id_${counter}" name="projectRequest[${counter}][car_brand_id]">
                         <option selected disabled>برند خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <select class="form-control carsOptionsSelect select2" id="car_model_id_${counter}" name="projectRequest[${counter}][car_model_id]">
                       <option selected disabled>مدل خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <select class="form-control carsOptionsSelect select2" id="car_tip_id_${counter}" name="projectRequest[${counter}][car_tip_id]">
                            <option selected disabled>تیپ خودرو</option>
                    </select>
                </td>
                <td class="border">
                    <input class="form-control" id="request_amount" name="projectRequest[${counter}][request_amount]">
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
        $(".removeRequestRow").off().on('click', function () {
            $(this).closest('tr').remove()
        })
        $(`#car_brand_id_${productCounter}`).getOptions({
            urlAddress: '/CarsBrand/getCarBrands', callback: result => {
                $.each(result, function (key, item) {
                    $(`#car_brand_id_${counter}`).append(`<option value="${item.id}">${item.title}</option>`)
                })
            }
        })
        productCounter++
    })

})
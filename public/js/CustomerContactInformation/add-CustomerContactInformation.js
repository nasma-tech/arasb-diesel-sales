$(function () {
    $("#state_id").getOptions({
        urlAddress: "/cities/getFilterCities", callback: result => {
            $("#city_id").empty();
            $.each(result, function (key, item) {
                $("#city_id").append(`<option value="${item.id}">${item.title}</option>`).attr('disabled', false)
            })
        }
    })
})
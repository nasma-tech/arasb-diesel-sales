$(function () {
    $.ajax({
        url: '/states/getMapInfo',
        data: {
            id: $(".editFormAjax").data('id')
        }, success: result => {
            let data = JSON.parse(result)
            map(data.latitude, data.longitude, 6)
            $("#latInput").val(data.latitude)
            $("#lngInput").val(data.longitude)
        }
    })
})
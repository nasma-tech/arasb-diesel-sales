$(function () {
    activeOrDeactive('.actionButtonStatus', '/users/activeOrDeactive', 'changeSuccess');

    $("#userOnline-tab-fill").on('click', function () {
        $("#userOnlineBodyTable").html('')
        $("#userBodyTable tr").each(function () {
            if ($(this).find('td').eq(2).find('div').hasClass('badge-light-success')) {
                $("#userOnlineBodyTable").append($(this).clone());
            }
        })
    })

});



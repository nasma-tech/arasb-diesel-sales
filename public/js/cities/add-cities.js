$(function () {

    if ($("select[name = 'country_id']").val()) {
        $("select[name = 'state_id']").attr('disabled', false)
    }
    map()

    $("select[name = 'state_id']").attr('disabled', true)
    $("select[name = 'country_id']").on('change', function () {
        $("select[name = 'city_id']").attr('disabled', true)
        $("select[name = 'city_id']").html('')
        let id = $(this).val()
        $.ajax({
            url: 'api/filerStates',
            type: 'POST',
            data: {
                id
            }, success: result => {
                if (result) {
                    $("select[name = 'state_id']").attr('disabled', false)
                    $("select[name = 'state_id']").html(result)
                } else {
                    $("select[name = 'state_id']").attr('disabled', true)
                    $("select[name = 'state_id']").html('')
                }
            }
        })
    })
})
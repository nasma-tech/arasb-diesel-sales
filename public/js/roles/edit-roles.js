$(function () {
    $("#per_short_name").englishInput()
    $('.checkbox').find('input').each(function () {
        $(this).checkBoxEvent()
    })
})
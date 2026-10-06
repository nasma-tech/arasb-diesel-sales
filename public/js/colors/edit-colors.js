$(function () {
    $("#hex").on('input', function () {
        let R = hexToRgb($(this).val()).r
        let G = hexToRgb($(this).val()).g
        let B = hexToRgb($(this).val()).b
        $("input[name='rgb_color']").val(R + '-' + G + '-' + B)
        $("input[name='name']").val(hexToColorName($(this).val()))
    })
    $('#color_status').checkBoxEvent()
})
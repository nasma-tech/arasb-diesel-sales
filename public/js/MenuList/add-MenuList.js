$(function (){
    $("#selectIcon").on('click',function () {
        swal.fire({
            title:'<h5>لطفا یک مورد را انتخاب کنید</h5>',
            html : '<div id="mainIcon" style="height: 500px;overflow-y: auto"></div>',
            width :'60rem',
            confirmButtonText:'بستن'
        })
        $.ajax({
            url:'getIconsList',
            type:'POST',
            success:result=>{
                let data = JSON.parse(result)
                $.each(data,function (key,item) {
                    $("#mainIcon").append(`
                        <button data-icon="${item}" class="btn btn-sm btn-primary selectIconBtn mt-1 bx ${item}"></button>
                    `)
                })
            }
        }).done(function () {
            $(".selectIconBtn").on('click',function () {
                let icon = $(this).data('icon');
                $("#menu_icon").val(icon)
                $("#menuIconSpan").removeClass().addClass(`btn btn-sm btn-secondary bx ${icon}`)
                swal.close()
            })
        })
    })
    $("#menu_english_name").englishInput()
    $("#menu_persian_name").persianInput()

    $("#menu_persian_name").on('change',function () {
        let value = $(this).val()
        $("#translateList").html('')
        $.ajax({
            url:`https://api.mymemory.translated.net/get?q=${value}&langpair=fa|en`,
            success:result=>{
                $.each(result.matches,function (key,item) {
                    $("#translateList").append(`<option value="${item.translation.replaceAll(' ','')}">`)
                })
            }
        })
    })
})
$(function () {
    $(".changeAvatar").on("click", function () {
        $("#avatarInput").click();
    });

    $("#avatarInput").on("change", function () {
        readImage(this, "avatarImage");
    });
})
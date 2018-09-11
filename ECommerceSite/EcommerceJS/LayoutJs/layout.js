$(document).ready(function () {
    
    //if (window.location.href.indexOf("Admin") > -1) {
    //    $("#logout-btn").show();
    //    $("#LoginLink").hide();
    //    $("#AdminLink").show();
    //    $("#CustomerLink").hide();
    //} else if (window.location.href.indexOf("Customer") > -1) {
    //    $("#logout-btn").show();
    //    $("#LoginLink").hide();
    //    $("#AdminLink").hide();
    //    $("#CustomerLink").show();
    //} else {
    //    $("#LoginLink").show();
    //    $("#AdminLink").hide();
    //    $("#CustomerLink").hide();
    //    $("#logout-btn").hide();
    //}
});


//$(".nav li").click(function (e) {
//    $(".nav li").each(function () {
//        $(this).removeClass("active");
//    });
//    $(this).addClass("active");
//});

function LogOut() {
    window.location.href = "../Login/LogOut";
}
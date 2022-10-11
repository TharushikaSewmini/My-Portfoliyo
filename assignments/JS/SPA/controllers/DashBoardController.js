$("#homePage").css("display","block");
$("#customerPage").css("display","none");
$("#itemPage").css("display","none");
$("#orderPage").css("display","none");

$("#linkHome").click(function () {
    $("#homePage").css("display","block");
    $("#customerPage").css("display","none");
    $("#itemPage").css("display","none");
    $("#orderPage").css("display","none");
});

$("#linkCustomer").click(function () {
    $("#homePage").css("display","none");
    $("#customerPage").css("display","block");
    $("#itemPage").css("display","none");
    $("#orderPage").css("display","none");
});

$("#linkItems").click(function () {
    $("#homePage").css("display","none");
    $("#customerPage").css("display","none");
    $("#itemPage").css("display","block");
    $("#orderPage").css("display","none");
});

$("#linkOrders").click(function () {
    $("#homePage").css("display","none");
    $("#customerPage").css("display","none");
    $("#itemPage").css("display","none");
    $("#orderPage").css("display","block");
});
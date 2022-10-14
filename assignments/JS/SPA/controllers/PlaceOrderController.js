var placeOrders = [];

//load all customers to customer ID combo box
function loadAllCustomersForOption() {
    $("#cmbCustomerID").empty();
    for(let customer of customers) {
        $("#cmbCustomerID").append(`<option>${customer.id}</option>`);
    }
}

//load all items to item code combo box
function loadAllItemsForOption() {
    $("#cmbItemCode").empty();
    for(let item of items) {
        $("#cmbItemCode").append(`<option>${item.code}</option>`);
    }
}


function generateOrderID() {
    let lastOrderId = placeOrders[placeOrders.length-1].id;
    $("#txtCustomerID").val('C00' + (parseInt(lastOrderId.split('C')[1]) + 1));
}

function setLocalDate() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#txtOrderDate').val(today);
}

$(window).on('load', function () {
    console.log("Window on load");
    setLocalDate();
});
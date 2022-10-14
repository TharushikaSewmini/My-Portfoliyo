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

//click event for customer ID select option
$("#cmbCustomerID").change(function () {
    let customerID = $("#cmbCustomerID").val();

    // let customerID = $(this).text();`

    let customer = searchCustomer(customerID);
    if(customer != null) {
        $("#txtViewCusID").val(customer.id);
        $("#txtViewCusName").val(customer.name);
        $("#txtViewCusAddress").val(customer.address);
        $("#txtViewCusSalary").val(customer.salary);
    }
});

$("#cmbItemCode").change(function () {
    let itemCode = $("#cmbItemCode").val();
    let item = searchItem(itemCode);
    if(item != null) {
        $("#txtViewItemCode").val(item.code);
        $("#txtViewItemName").val(item.name);
        $("#txtViewItemPrice").val(item.price);
        $("#txtViewItemQtyOnHand").val(item.quantity);
    }
});


//generate new order id
function generateNewOrderID() {
    let lastOrderId = placeOrders[placeOrders.length-1].id;
    $("#txtCustomerID").val('O00' + (parseInt(lastOrderId.split('O')[1]) + 1));
}

//set current date to txtOrderDate
function setCurrentDate() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#txtOrderDate').val(today);
}

$(window).on('load', function () {
    console.log("Window on load");
    setCurrentDate();
});


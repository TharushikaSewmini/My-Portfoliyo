$("#txtOrderID").focus();

const orderIDRegEx = /^(O)[0-9]{1,3}$/;
const orderQtyRegEx = /^[0-9]{1,}$/;
const discountRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const cashRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

placeOrderValidations.push({reg: orderIDRegEx, field: $("#txtOrderID"), error: "Order ID pattern is wrong: O001"});
placeOrderValidations.push({reg: orderQtyRegEx, field: $("#txtOrderQty"), error: "Order Quantity pattern is wrong: 10"});
placeOrderValidations.push({reg: discountRegEx, field: $("#txtDiscount"), error: "Discount pattern is wrong: 100 / 100.00"});
placeOrderValidations.push({reg: cashRegEx, field: $("#txtCash"), error: "Cash pattern is wrong: 100 / 100.00"});

//Tab key disable
$("input").on('keydown',function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtOrderID, #txtOrderQty, #txtDiscount, #txtCash").on('keyup',function (event) {
    checkValidityOrder();
});

$("#txtOrderID, #txtOrderQty, #txtDiscount, #txtCash").on('blur',function (event) {
    checkValidityOrder();
});

//After press Enter key focus to the next textField
$("#txtOrderID").on('keydown',function (event) {
    if(event.key=="Enter" && checkOrderFields(orderIDRegEx, $("#txtOrderID"))) {
        $("#txtOrderDate").focus();
    }else {
        setTextFieldFocusOrder($("#txtOrderID"));
    }
});

// $("#txtOrderDate").on('keydown',function (event) {
//     if(event.key=="Enter" && ($("#txtOrderDate").val() != null)) {
//         setTextFieldFocusOrder($("#cmbCustomerID"));
//     }else {
//         setTextFieldFocusOrder($("#txtOrderDate"));
//     }
// });

// $("#cmbCustomerID").on('keydown',function (event) {
//     if(event.key=="Enter" && ($("#cmbCustomerID").val() != null)) {
//         setTextFieldFocusOrder($("#cmbItemCode"));
//     }else {
//         setTextFieldFocusOrder($("#cmbCustomerID"));
//     }
// });

// $("#cmbItemCode").on('keydown',function (event) {
//     if(event.key=="Enter" && ($("#cmbItemCode").val() != null)) {
//         setTextFieldFocusOrder($("#txtOrderQty"));
//     }else {
//         setTextFieldFocusOrder($("#cmbItemCode"));
//     }
// });

$("#txtOrderQty").on('keydown',function (event) {
    if(event.key=="Enter" && checkOrderFields(orderQtyRegEx, $("#txtOrderQty"))) {
        let response = confirm("Do you want to add this item?");
        if (response) {
            $("#btnAddItem").focus();
            console.log(placeOrderValidations);
            console.log(placeOrders);
        }
    }else {
        setTextFieldFocusOrder($("#txtOrderQty"));
    }
});

$("#txtDiscount").on('keydown',function (event) {
    if(event.key=="Enter" && checkOrderFields(discountRegEx, $("#txtDiscount"))) {
        $("#txtCash").focus();
    }else {
        setTextFieldFocusOrder($("#txtDiscount"));
    }
});

$("#txtCash").on('keydown',function (event) {
    if(event.key=="Enter" && checkO(cashRegEx, $("#txtCash"))) {
        let response = confirm("Do you want to purchase?");
        if (response) {
            $("#btnPurchase").focus();
            console.log(placeOrderValidations);
            console.log(placeOrders);
        }
    }else {
        setTextFieldFocusOrder($("#txtCash"));
    }
});

//after checking, set the colors to the txtField border
function checkValidityOrder() {
    let errorCount = 0;
    for (let validation of placeOrderValidations) {
        if(checkOrderFields(validation.reg, validation.field)) {
            textSuccessOrder(validation.field,"");
        }else {
            errorCount = errorCount+1;
            textErrorOrder(validation.field,validation.error);
        }
    }
    setButtonStateOrder(errorCount);
}

//check the txtField value is equal to regEx
function checkOrderFields(regEx, txtField) {
    let input = txtField.val();
    return regEx.test(input) ? true : false;
}

//set txtField border color green
function textSuccessOrder(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultTextOrder(txtField,"");
    }else {
        txtField.css('border','1px solid green');
        txtField.parent().children('span').text(error);
    }
}

//set txtField border color red
function textErrorOrder(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultTextOrder(txtField,"");
    }else {
        txtField.css('border','1px solid red');
        txtField.parent().children('span').text(error);
    }
}

//set txtFields borders default color
function defaultTextOrder(txtField,error) {
    txtField.css('border','1px solid #CED4DA');
    txtField.parent().children('span').text(error);
}

//set button disable or enable
function setButtonStateOrder(value) {
    if(value>0) {
        $("#btnAddItem").attr('disabled',true);
    }else {
        $("#btnAddItem").attr('disabled',false);
    }
}

//set the txtField focus
function setTextFieldFocusOrder(txtField) {
    txtField.focus();
}

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

    // let customerID = $(this).text();

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


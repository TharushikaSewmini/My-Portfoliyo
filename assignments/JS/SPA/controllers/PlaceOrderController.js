$("#txtOrderID").focus();

const orderIDRegEx = /^(O)[0-9]{1,3}$/;
const orderQtyRegEx = /^[0-9]{1,}$/;
const discountRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const cashRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

placeOrderValidations.push({reg: orderIDRegEx, field: $("#txtOrderID"), error: "Order ID pattern is wrong: O001"});
// placeOrderValidations.push({reg: orderQtyRegEx, field: $("#txtOrderQty"), error: "Order Quantity pattern is wrong: 10"});
// placeOrderValidations.push({reg: discountRegEx, field: $("#txtDiscount"), error: "Discount pattern is wrong: 100 / 100.00"});
// placeOrderValidations.push({reg: cashRegEx, field: $("#txtCash"), error: "Cash pattern is wrong: 100 / 100.00"});

//Tab key disable
$("input").on('keydown',function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtOrderID").on('keyup',function (event) {
    checkValidityOrder();
});

$("#txtOrderID").on('blur',function (event) {
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




//check the order quantity is available or not
function checkOrderQty(orderQty) {
    if (parseInt($("#txtViewItemQtyOnHand").val()) < parseInt(orderQty) ) {
        // textSuccessOrder($("#txtOrderQty"), "");

        let error = "Please enter a amount lower than : " + $("#txtViewItemQtyOnHand").val();
        $("#txtOrderQty").css('border','1px solid red');
        $("#txtOrderQty").parent().children('span').text(error);
        return false;
    } else {
        // textErrorOrder($("#txtOrderQty"), "Please enter a amount lower than : " + $("#txtViewItemQtyOnHand").val());

        $("#txtOrderQty").css('border','1px solid green');
        $("#txtOrderQty").parent().children('span').text("");
        return true;
    }
}

$("#txtOrderQty").on('keydown',function (event) {
    let returnValue = checkOrderQty($("#txtOrderQty").val());
    if(returnValue) {
        // if (event.key == "Enter") {
        //     let response = confirm("Do you want to add this item?");
        //     if (response) {
        //         $("#btnAddItem").focus();
        //     }
        // } else {
        //     setTextFieldFocusOrder($("#txtOrderQty"));
        // }
    }else {
        setTextFieldFocusOrder($("#txtOrderQty"));
    }
    // defaultTextOrder($("#txtOrderQty"),"");
});

$("#txtCash").on('keydown',function (event) {
    if(event.key=="Enter" && checkOrderFields(discountRegEx, $("#txtCash"))) {
        $("#txtDiscount").focus();
    }else {
        setTextFieldFocusOrder($("#txtCash"));
    }
});

$("#txtDiscount").on('keydown',function (event) {
    if(event.key=="Enter" && checkOrderFields(cashRegEx, $("#txtDiscount"))) {
        // let response = confirm("Do you want to purchase?");
        // if (response) {
            // $("#btnPurchase").focus();
            console.log(placeOrderValidations);
            console.log(placeOrders);

        // }
    }else {
        setTextFieldFocusOrder($("#txtDiscount"));
    }
});

//after checking, set the colors to the txtField border
function checkValidityOrder() {
    let errorCount = 0;
    for (let validation of placeOrderValidations) {
        if(checkOrderFields(validation.reg, validation.field) && $("#txtOrderID, #txtViewCusID, #txtViewCusName, #txtViewCusAddress, #txtViewCusSalary, #txtViewItemCode, #txtViewItemName, #txtViewItemPrice, #txtViewItemQtyOnHand, #txtOrderID") != null) {
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

//click event for add item button
$("#btnAddItem").click(function () {
    addItems();
});

//add items to table
function addItems() {
    let itemCode = $("#txtViewItemCode").val();
    let itemName = $("#txtViewItemName").val();
    let itemPrice = parseFloat($("#txtViewItemPrice").val());
    let orderQty = parseFloat($("#txtOrderQty").val());
    let total = (itemPrice)*(orderQty);

    let itemCodeExist = isItemCodeExist(itemCode);

    if(itemCodeExist != null) {
        for (let orderItem of orderItems) {
            if (orderItem.orderedCode === itemCodeExist.orderedCode) {
                orderItem.orderedQuantity += orderQty;
                orderItem.orderTotal += total;
            }
        }
    }else {
        let orderItemObject = {
            orderedCode: itemCode,
            orderedName: itemName,
            orderedPrice: itemPrice,
            orderedQuantity: orderQty,
            orderTotal: total
        }

        orderItems.push(orderItemObject);
    }
    updateItemQtyOnHand(itemCode);
    loadAllItemsToTable();
    calculateTotal();
    $("#txtOrderQty").val("");
    // clearTextFieldsOrder();

}


//Added all order items to the table
function loadAllItemsToTable() {
    $("#tblOrder").empty();

    for(let orderItem of orderItems) {
        var row = "<tr><td>" + orderItem.orderedCode + "</td><td>" + orderItem.orderedName + "</td><td>" + orderItem.orderedPrice + "</td><td>" + orderItem.orderedQuantity + "</td><td>" + orderItem.orderTotal + "</td></tr>";
        $("#tblOrder").append(row);
    }
}

//update item qtyOnHand after adding table
function updateItemQtyOnHand(orderedItemCode) {
    for(let item of items) {
        if(item.code === orderedItemCode) {
            item.quantity = item.quantity - parseFloat($("#txtOrderQty").val());
            $("#txtViewItemQtyOnHand").val(item.quantity);
            // items.push(item);
            // updateItem(item.code);
        }
    }
}

//check duplicate items
function isItemCodeExist(itemCode) {
    for(let orderItem of orderItems) {
        if(orderItem.orderedCode === itemCode) {
            return orderItem;
        }
    }
    return null;
}

//calculate the total cost
function calculateTotal() {
    let totalCost = parseFloat(0.0);
    for(let orderItem of orderItems) {
        totalCost += orderItem.orderTotal;
    }
    $("#txtTotal, #txtSubTotal").text(totalCost);
}

//check the cash
function checkCash(cash) {
    if(cash > 100000) {
        let error = "Insufficient Credit";
        $("#txtCash").css('border','1px solid red');
        $("#txtCash").parent().children('span').text(error);
        return false;
    }else {
        $("#txtCash").css('border','1px solid green');
        $("#txtCash").parent().children('span').text("");
        return true;
    }
}

//calculate Total with Discount
$("#txtDiscount").on('keydown', function (event) {
    var discount = $("#txtDiscount").val();
    if(event.key=="Enter") {
        var total = parseFloat($("#txtSubTotal").text());
        var newTotal = total - discount;
        $("#txtSubTotal").text(newTotal+".00");
        setBalance();
    }
});

//calculate balance
function setBalance() {
    let cash = $("#txtCash").val();
    if (checkCash(cash)) {
        var balance = cash - parseFloat($("#txtSubTotal").text());
        $("#txtBalance").val(balance+".00");
    }
}

//keydown event for Cash button
$("#txtCash").on('keydown', function () {
    setBalance();
});

//click event for Purchase button
$("#btnPurchase").click(function () {
    if(checkCash()) {
        let orderID = $("#txtOrderID").val();
        let orderDate = $("#txtOrderDate").val();
        let customerID = $("#cmbCustomerID").val();
        let discount = $("#txtDiscount").val();
        let total = $("#txtTotal").text();

        var orderObject = {
            oID: orderID,
            date: orderDate,
            cusID: customerID,
            discount: discount,
            total: total
        }

        // for (let orderItem of orderItems) {
        //     var orderDetailObject = {
        //         orderID: orderObject.oID,
        //         itemCode: orderItem.orderedCode,
        //         qty: orderItem.orderedQuantity
        //     }
        // }

        placeOrders.push(orderObject);

        alert("Order saved successfully");
        clearTextFieldsOrder();
        generateNewOrderID();
    }else {
        alert("Failed to Save");
    }
});

// //click event for search button
// $("#txtOrderID").click(function () {
//     let typedOrderID = $("#txtOrderID").val();
//     let order = searchOrder(typedOrderID);
//     if(order != null) {
//         setTextFieldValuesOrder(order.oID, order.date, order.cusID, order.total);
//
//         $("#tblOrder").empty();
//
//         for(let orderItem of orderItems) {
//             if(orderItem.orderID == order.oID)
//             var row = "<tr><td>" + orderItem.orderedCode + "</td><td>" + orderItem.orderedName + "</td><td>" + orderItem.orderedPrice + "</td><td>" + orderItem.orderedQuantity + "</td><td>" + orderItem.orderTotal + "</td></tr>";
//             $("#tblOrder").append(row);
//         }
//
//     }else {
//         alert("There is no order available for that " + typedOrderID);
//         setTextFieldValuesOrder("","","","");
//         $("#txtOrderID").val("");
//     }
// });
//
// //search order
// function searchOrder(orderID) {
//     for(let order of placeOrders) {
//         if(order.oID == orderID) {
//             return order;
//         }
//     }
//     return null;
// }
//
// //set values for textFields
// function setTextFieldValuesOrder(oID, date, cusID, total) {
//     $("#txtOrderID").val(oID);
//     $("#txtOrderDate").val(date);
//     $("#cmbCustomerID").val(cusID);
//     $("#txtTotal, #txtSubTotal").val(total);
// }


//clear all textFields
function clearTextFieldsOrder() {
    $("#txtOrderID").focus();
    $("#cmbCustomerID, #txtOrderID, #txtViewCusID, #txtViewCusName, #txtViewCusAddress, #txtViewCusSalary").val("");
    $("#cmbItemCode, #txtViewItemCode, #txtViewItemName, #txtViewItemPrice, #txtViewItemQtyOnHand, #txtOrderQty").val("");
    $("#txtTotal, #txtSubTotal, #txtDiscount, #txtCash, #txtBalance").val("");
    $("#tblOrder").empty();
    checkValidity();
}

//generate new order id
function generateNewOrderID() {
    let lastOrderId = placeOrders[placeOrders.length-1].oID;
    $("#txtOrderID").val('O00' + (parseInt(lastOrderId.split('O')[1]) + 1));
}



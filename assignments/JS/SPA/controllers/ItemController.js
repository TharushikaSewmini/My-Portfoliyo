$("#txtItemCode").focus();

const itemCodeRegEx = /^(P)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{4,20}$/;
const itemPriceRegEx =  /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQuantityRegEx = /^[0-9]{1,5}$/;

let itemValidations = [];

var items = [];

itemValidations.push({reg: itemCodeRegEx, field: $("#txtItemCode"), error: "Item code pattern is wrong: P001"});
itemValidations.push({reg: itemNameRegEx, field: $("#txtItemName"), error: "Item Name pattern is wrong: A-z min 4 letters"});
itemValidations.push({reg: itemPriceRegEx, field: $("#txtItemPrice"), error: "Item Price pattern is wrong: 100 / 100.00"});
itemValidations.push({reg: itemQuantityRegEx, field: $("#txtItemQuantity"), error: "Item Quantity pattern is wrong: 10"});

// //Tab key disable
$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on('keydown',function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on('keyup',function (event) {
    checkValidity();
});

$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on('blur',function (event) {
    checkValidity();
});

//After press Enter key focus to the next textField
$("#txtItemCode").on('keydown',function (event) {
    if(event.key=="Enter" && check(itemCodeRegEx, $("#txtItemCode"))) {
        $("#txtItemName").focus();
    }else {
        setTextFieldFocus($("#txtItemCode"));
    }
});

$("#txtItemName").on('keydown',function (event) {
    if(event.key=="Enter" && check(itemNameRegEx, $("#txtItemName"))) {
        setTextFieldFocus($("#txtItemPrice"));
    }else {
        setTextFieldFocus($("#txtItemName"));
    }
});

$("#txtItemPrice").on('keydown',function (event) {
    if(event.key=="Enter" && check(itemPriceRegEx, $("#txtItemPrice"))) {
        setTextFieldFocus($("#txtItemQuantity"));
    }else {
        setTextFieldFocus($("#txtItemPrice"));
    }
});

$("#txtItemQuantity").on('keydown',function (event) {
    if(event.key=="Enter" && check(itemQuantityRegEx, $("#txtItemQuantity"))) {
        let response = confirm("Do you want to add this item?");
        if (response) {
            $("#btnSaveItem").focus();
            console.log(itemValidations);
            console.log(items);
        }
    }else {
        setTextFieldFocus($("#txtItemQuantity"));
    }
});
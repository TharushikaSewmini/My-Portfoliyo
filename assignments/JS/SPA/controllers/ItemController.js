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

//after checking, set the colors to the txtField border
function checkValidity() {
    let errorCount = 0;
    for (let validation of itemValidations) {
        if(check(validation.reg, validation.field)) {
            textSuccess(validation.field,"");
        }else {
            errorCount = errorCount+1;
            textError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

//check the txtField value is equal to regEx
function check(regEx, txtField) {
    let input = txtField.val();
    return regEx.test(input) ? true : false;
}

//set txtField border color green
function textSuccess(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultText(txtField,"");
    }else {
        txtField.css('border','1px solid green');
        txtField.parent().children('span').text(error);
    }
}

//set txtField border color red
function textError(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultText(txtField,"");
    }else {
        txtField.css('border','1px solid red');
        txtField.parent().children('span').text(error);
    }
}

//set txtFields borders default color
function defaultText(txtField,error) {
    txtField.css('border','1px solid #CED4DA');
    txtField.parent().children('span').text(error);
}

//set button disable or enable
function setButtonState(value) {
    if(value>0) {
        $("#btnSaveItem").attr('disabled',true);
    }else {
        $("#btnSaveItem").attr('disabled',false);
    }
}

//set the txtField focus
function setTextFieldFocus(txtField) {
    txtField.focus();
}

//click event for save item button
$("#btnSaveItem").click(function () {
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQuantity = $("#txtItemQuantity").val();

    var itemObject = {
        code: itemCode,
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity
    }

    items.push(itemObject);

    viewAllItems();

    bindRowClickEvents();

    clearTextFields();
});

$("#btnViewAllItems").click(function () {
    viewAllItems();
    bindRowClickEvents();
});

//clear the textFields for add new item
$("#btnNewItem").click(function () {
    clearTextFields();
});

//after pressing Enter key in txtSearchItem, focus the Search button
$("#txtSearchItem").on('keydown',function (event) {
    if (event.key == "Enter") {
        setTextFieldFocus($("#btnSearchItem"));
    }
});

//click event for search button
$("#btnSearchItem").click(function () {
    let typedCode = $("#txtSearchItem").val();
    let item = searchItem(typedCode);
    if(item != null) {
        setTextFieldValues(item.code, item.name, item.price, item.quantity);
    }else {
        alert("There is no item available for that " + typedCode);
        setTextFieldValues("","","","");
        $("#txtSearchItem").val("");
    }
});

//click event for Delete button
$("#btnDeleteItem").click(function () {
    let deleteCode = $("#txtItemCode").val();

    let option = confirm("Do you really want to delete item code: " + deleteCode);
    if(option) {
        if(deleteItem(deleteCode)) {
            alert("Item Deleted Successfully");
            setTextFieldValues("","","","");
        }else {
            alert("No such item to delete.Please check the code");
        }
    }
});

//click event for update button
$("#btnUpdateItem").click(function () {
    let updateCode = $("#txtItemCode").val();
    let response = updateItem(updateCode);
    if(response) {
        alert("Item Updated Successfully");
        // setTextFieldValues("","","","");
        clearTextFields();
    }else {
        alert("Update Failed");
    }
});



function viewAllItems() {
    $("#tblItem").empty();

    for(var item of items) {
        var row = "<tr><td>"+item.code+"</td><td>"+item.name+"</td><td>"+item.price+"</td><td>"+item.quantity+"</td></tr>";
        $("#tblItem").append(row);
    }
}

function bindRowClickEvents() {
    $("#tblItem>tr").click(function () {
        // let rowData = $(this).text();
        // console.log(rowData);

        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let quantity = $(this).children(":eq(3)").text();
        console.log(code, name, price, quantity);

        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtItemPrice").val(price);
        $("#txtItemQuantity").val(quantity);
    });
}

//search item
function searchItem(itemCode) {
    for(let item of items) {
        if(item.code == itemCode) {
            return item;
        }
    }
    return null;
}

//set values for textFields
function setTextFieldValues(code, name, price, quantity) {
    $("#txtItemCode").val(code);
    $("#txtItemName").val(name);
    $("#txtItemPrice").val(price);
    $("#txtItemQuantity").val(quantity);
}

//clear all textFields
function clearTextFields() {
    $("#txtItemCode").focus();
    $("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").val("");
    checkValidity();
}

//delete item
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if(item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber,1);
        viewAllItems();
        bindRowClickEvents();
        return true;
    }else {
        return false;
    }
}

//update item
function updateItem(itemCode) {
    let item = searchItem(itemCode);
    if(item != null) {
        item.code = $("#txtItemCode").val();
        item.name = $("#txtItemName").val();
        item.price = $("#txtItemPrice").val();
        item.quantity = $("#txtItemQuantity").val();
        viewAllItems();
        bindRowClickEvents();
        return true;
    }else {
        return false;
    }
}
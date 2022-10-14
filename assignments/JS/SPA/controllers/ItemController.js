$("#txtItemCode").focus();

const itemCodeRegEx = /^(P)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{4,20}$/;
const itemPriceRegEx =  /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQuantityRegEx = /^[0-9]{1,5}$/;

itemValidations.push({reg: itemCodeRegEx, field: $("#txtItemCode"), error: "Item code pattern is wrong: P001"});
itemValidations.push({reg: itemNameRegEx, field: $("#txtItemName"), error: "Item Name pattern is wrong: A-z min 4 letters"});
itemValidations.push({reg: itemPriceRegEx, field: $("#txtItemPrice"), error: "Item Price pattern is wrong: 100 / 100.00"});
itemValidations.push({reg: itemQuantityRegEx, field: $("#txtItemQuantity"), error: "Item Quantity pattern is wrong: 10"});

//Tab key disable
$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on('keydown',function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on('keyup',function (event) {
    checkItemFieldsValidity();
});

$("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").on('blur',function (event) {
    checkItemFieldsValidity();
});

//After press Enter key focus to the next textField
$("#txtItemCode").on('keydown',function (event) {
    if(event.key=="Enter" && checkItems(itemCodeRegEx, $("#txtItemCode"))) {
        $("#txtItemName").focus();
    }else {
        setTextFieldFocusItem($("#txtItemCode"));
    }
});

$("#txtItemName").on('keydown',function (event) {
    if(event.key=="Enter" && checkItems(itemNameRegEx, $("#txtItemName"))) {
        setTextFieldFocusItem($("#txtItemPrice"));
    }else {
        setTextFieldFocusItem($("#txtItemName"));
    }
});

$("#txtItemPrice").on('keydown',function (event) {
    if(event.key=="Enter" && checkItems(itemPriceRegEx, $("#txtItemPrice"))) {
        setTextFieldFocusItem($("#txtItemQuantity"));
    }else {
        setTextFieldFocusItem($("#txtItemPrice"));
    }
});

$("#txtItemQuantity").on('keydown',function (event) {
    if(event.key=="Enter" && checkItems(itemQuantityRegEx, $("#txtItemQuantity"))) {
        // let response = confirm("Do you want to add this item?");
        // if (response) {
            $("#btnSaveItem").focus();
            console.log(itemValidations);
            console.log(items);
        // }
    }else {
        setTextFieldFocusItem($("#txtItemQuantity"));
    }
});

//after checking, set the colors to the txtField border
function checkItemFieldsValidity() {
    let errorCount = 0;
    for (let validation of itemValidations) {
        if(checkItems(validation.reg, validation.field)) {
            textSuccessItem(validation.field,"");
        }else {
            errorCount = errorCount+1;
            textErrorItem(validation.field,validation.error);
        }
    }
    setButtonStateItem(errorCount);
}

//check the txtField value is equal to regEx
function checkItems(regEx, txtField) {
    let input = txtField.val();
    return regEx.test(input) ? true : false;
}

//set txtField border color green
function textSuccessItem(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultTextItem(txtField,"");
    }else {
        txtField.css('border','1px solid green');
        txtField.parent().children('span').text(error);
    }
}

//set txtField border color red
function textErrorItem(txtField,error) {
    if(txtField.val().length <= 0) {
        defaultTextItem(txtField,"");
    }else {
        txtField.css('border','1px solid red');
        txtField.parent().children('span').text(error);
    }
}

//set txtFields borders default color
function defaultTextItem(txtField,error) {
    txtField.css('border','1px solid #CED4DA');
    txtField.parent().children('span').text(error);
}

//set button disable or enable
function setButtonStateItem(value) {
    if(value>0) {
        $("#btnSaveItem").attr('disabled',true);
    }else {
        $("#btnSaveItem").attr('disabled',false);
    }
}

//set the txtField focus
function setTextFieldFocusItem(txtField) {
    txtField.focus();
}

//click event for save item button
$("#btnSaveItem").click(function () {
    let response = confirm("Do you want to add this item?");
    if (response) {
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

        bindRowClickEventsItem();

        loadAllItemsForOption();

        clearTextFieldsItem();
    }
});

$("#btnViewAllItems").click(function () {
    viewAllItems();
    bindRowClickEventsItem();
});

//clear the textFields for add new item
$("#btnNewItem").click(function () {
    clearTextFieldsItem();
});

//after pressing Enter key in txtSearchItem, focus the Search button
$("#txtSearchItem").on('keydown',function (event) {
    if (event.key == "Enter") {
        setTextFieldFocusItem($("#btnSearchItem"));
    }
});

//click event for search button
$("#btnSearchItem").click(function () {
    let typedCode = $("#txtSearchItem").val();
    let item = searchItem(typedCode);
    if(item != null) {
        setTextFieldValuesItem(item.code, item.name, item.price, item.quantity);
    }else {
        alert("There is no item available for that " + typedCode);
        setTextFieldValuesItem("","","","");
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
            setTextFieldValuesItem("","","","");
        }else {
            alert("No such item to delete.Please check the code");
        }
        $("#txtSearchItem").val("");
    }
});

//click event for update button
$("#btnUpdateItem").click(function () {
    let updateCode = $("#txtItemCode").val();
    let response = updateItem(updateCode);
    if(response) {
        alert("Item Updated Successfully");
        // setTextFieldValues("","","","");
        clearTextFieldsItem();
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

function bindRowClickEventsItem() {
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
function setTextFieldValuesItem(code, name, price, quantity) {
    $("#txtItemCode").val(code);
    $("#txtItemName").val(name);
    $("#txtItemPrice").val(price);
    $("#txtItemQuantity").val(quantity);
}

//clear all textFields
function clearTextFieldsItem() {
    $("#txtItemCode").focus();
    $("#txtItemCode, #txtItemName, #txtItemPrice, #txtItemQuantity").val("");
    checkItemFieldsValidity();
}

//delete item
function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if(item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber,1);
        viewAllItems();
        bindRowClickEventsItem();
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
        bindRowClickEventsItem();
        return true;
    }else {
        return false;
    }
}
$("#txtCustomerID").focus();

const cusIDRegEx = /^(C)[0-9]{2,3}$/;
const cusNameRegEx = /^[A-z ]{4,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

customerValidations.push({reg: cusIDRegEx, field: $("#txtCustomerID"), error: "Customer ID pattern is wrong: C001"});
customerValidations.push({reg: cusNameRegEx, field: $("#txtCustomerName"), error: "Customer Name pattern is wrong: A-z min 4 letters"});
customerValidations.push({reg: cusAddressRegEx, field: $("#txtCustomerAddress"), error: "Customer Address pattern is wrong: A-z 0-9/, min 7 characters"});
customerValidations.push({reg: cusSalaryRegEx, field: $("#txtCustomerSalary"), error: "Customer Salary pattern is wrong: 100 / 100.00"});

//Tab key disable
$("#txtCustomerID, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary").on('keydown',function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtCustomerID, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary").on('keyup',function (event) {
    checkValidity();
});

$("#txtCustomerID, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary").on('blur',function (event) {
    checkValidity();
});

//After press Enter key focus to the next textField
$("#txtCustomerID").on('keydown',function (event) {
    if(event.key=="Enter" && check(cusIDRegEx, $("#txtCustomerID"))) {
        $("#txtCustomerName").focus();
    }else {
        setTextFieldFocus($("#txtCustomerID"));
    }
});

$("#txtCustomerName").on('keydown',function (event) {
    if(event.key=="Enter" && check(cusNameRegEx, $("#txtCustomerName"))) {
        setTextFieldFocus($("#txtCustomerAddress"));
    }else {
        setTextFieldFocus($("#txtCustomerName"));
    }
});

$("#txtCustomerAddress").on('keydown',function (event) {
    if(event.key=="Enter" && check(cusAddressRegEx, $("#txtCustomerAddress"))) {
        setTextFieldFocus($("#txtCustomerSalary"));
    }else {
        setTextFieldFocus($("#txtCustomerAddress"));
    }
});

$("#txtCustomerSalary").on('keydown',function (event) {
    if(event.key=="Enter" && check(cusSalaryRegEx, $("#txtCustomerSalary"))) {
        let response = confirm("Do you want to add this customer?");
        if (response) {
            $("#btnSaveCustomer").focus();
            console.log(customerValidations);
            console.log(customers);
        }
    }else {
        setTextFieldFocus($("#txtCustomerSalary"));
    }
});


//after checking, set the colors to the txtField border
function checkValidity() {
    let errorCount = 0;
    for (let validation of customerValidations) {
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
        $("#btnSaveCustomer").attr('disabled',true);
    }else {
        $("#btnSaveCustomer").attr('disabled',false);
    }
}

//set the txtField focus
function setTextFieldFocus(txtField) {
    txtField.focus();
}

//click event for save button
$("#btnSaveCustomer").click(function () {
    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    customers.push(customerObject);

    viewAllCustomers();

    bindRowClickEvents();

    clearTextFields();
});

//click event for view all customer button
$("#btnViewAllCustomers").click(function () {
    viewAllCustomers();
    bindRowClickEvents();
});

//click event for search button
$("#btnSearchCustomer").click(function () {
    let typedID = $("#txtSearchCustomer").val();
    let customer = searchCustomer(typedID);
    if(customer != null) {
        setTextFieldValues(customer.id, customer.name, customer.address, customer.salary);
    }else {
        alert("There is no customer available for that " + typedID);
        setTextFieldValues("","","","");
        $("#txtSearchCustomer").val("");
    }
});

//after pressing Enter key in txtSearchCustomer, focus the Search button
$("#txtSearchCustomer").on('keydown',function (event) {
    if (event.key == "Enter") {
        setTextFieldFocus($("#btnSearchCustomer"));
    }
});

//click event for Delete button
$("#btnDeleteCustomer").click(function () {
    let deleteID = $("#txtCustomerID").val();

    let option = confirm("Do you really want to delete customer id: " + deleteID);
    if(option) {
        if(deleteCustomer(deleteID)) {
            alert("Customer Deleted Successfully");
            setTextFieldValues("","","","");
        }else {
            alert("No such customer to delete.Please check the id");
        }
        $("#txtSearchCustomer").val("");
    }
});

//click event for update button
$("#btnUpdateCustomer").click(function () {
    let updateID = $("#txtCustomerID").val();
    let response = updateCustomer(updateID);
    if(response) {
        alert("Customer Updated Successfully");
        // setTextFieldValues("","","","");
        clearTextFields();
    }else {
        alert("Update Failed");
    }
});

//click event for add new customer
$("#btnNewCustomer").click(function () {
    clearTextFields();
    $("#txtSearchCustomer").val("");
});

//clear all textFields
function clearTextFields() {
    $("#txtCustomerID").focus();
    $("#txtCustomerID, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary, #txtSearchCustomer").val("");
    checkValidity();
}

//Load all customers to the table
function viewAllCustomers() {
    $("#tblCustomer").empty();

    for(var customer of customers) {
        var row = "<tr><td>"+customer.id+"</td><td>"+customer.name+"</td><td>"+customer.address+"</td><td>"+customer.salary+"</td></tr>";
        $("#tblCustomer").append(row);
    }
}

//click event for table row
function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        // let rowData = $(this).text();
        // console.log(rowData);

        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let salary = $(this).children(":eq(3)").text();
        console.log(id, name, address, salary);

        $("#txtCustomerID").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);
    });
}

//search customer
function searchCustomer(customerID) {
    for(let customer of customers) {
        if(customer.id == customerID) {
            return customer;
        }
    }
    return null;
}

//delete customer
function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if(customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber,1);
        viewAllCustomers();
        bindRowClickEvents();
        return true;
    }else {
        return false;
    }
}

//update customer
function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if(customer != null) {
        customer.id = $("#txtCustomerID").val();
        customer.name = $("#txtCustomerName").val();
        customer.address = $("#txtCustomerAddress").val();
        customer.salary = $("#txtCustomerSalary").val();
        viewAllCustomers();
        bindRowClickEvents();
        return true;
    }else {
        return false;
    }
}

//set values for textFields
function setTextFieldValues(id, name, address, salary) {
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}
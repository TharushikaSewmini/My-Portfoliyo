var customers = [];

$("#txtCustomerID").focus();

const cusIDRegEx = /^(C)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{4,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];

customerValidations.push({reg: cusIDRegEx, field: $("#txtCustomerID"), error: "Customer ID pattern is wrong: C001"});
customerValidations.push({reg: cusNameRegEx, field: $("#txtCustomerName"), error: "Customer Name pattern is wrong: A-z min 4 letters"});
customerValidations.push({reg: cusAddressRegEx, field: $("#txtCustomerAddress"), error: "Customer Address pattern is wrong: A-z 0-9/, min 7 characters"});
customerValidations.push({reg: cusSalaryRegEx, field: $("#txtCustomerSalary"), error: "Customer Salary pattern is wrong: 100 / 100.00"});



$("#btnSaveCustomer").click(function () {
    var customerID = $("#txtCustomerID").val();
    var customerName = $("#txtCustomerName").val();
    var customerAddress = $("#txtCustomerAddress").val();
    var customerSalary = $("#txtCustomerSalary").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    customers.push(customerObject);

    viewAllCustomers();

    bindRowClickEvents();
});

$("#btnViewAllCustomer").click(function () {
    viewAllCustomers();
    bindRowClickEvents();
});

function viewAllCustomers() {
    $("#tblCustomer").empty();

    for(var customer of customers) {
        var row = "<tr><td>"+customer.id+"</td><td>"+customer.name+"</td><td>"+customer.address+"</td><td>"+customer.salary+"</td></tr>";
        $("#tblCustomer").append(row);
    }
}

function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
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


//Tab key disable
$("#txtCustomerID, #txtCustomerName, #txtCustomerAddress, #txtCustomerSalary").on('keydown',function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

//After press Enter key focus to the next textField
$("#txtCustomerID").on('keydown',function (event) {
    if(event.key=="Enter") {
        $("#txtCustomerName").focus();
    }
});

$("#txtCustomerName").on('keydown',function (event) {
    if(event.key=="Enter") {
        $("#txtCustomerAddress").focus();
    }
});

$("#txtCustomerAddress").on('keydown',function (event) {
    if(event.key=="Enter") {
        $("#txtCustomerSalary").focus();
    }
});

$("#txtCustomerSalary").on('keydown',function (event) {
    if(event.key=="Enter") {
        alert("Add Customer");
    }
});
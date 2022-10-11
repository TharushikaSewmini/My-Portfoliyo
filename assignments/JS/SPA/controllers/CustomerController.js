var customers = [];

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
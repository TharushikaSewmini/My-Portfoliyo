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
/**
 * This file handles Reception Javascript.
 * @author James Way
 * @version 1.0
 */

$(document).ready(function () {
    getEmployees();
});

function getEmployees() {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeesFromDB"
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {
            displayTable(data);
        }
    });
}

function addToTable(currentNum, data) {
    let firstName = data[0];
    let lastName = data[1];
    let empStatus = data[2];
    let cssClass = "table-danger";

    if(empStatus == 0) {
        empStatus = "Out";
    }
    else
    {
        empStatus = "In";
        cssClass = "table-success";
    }
    let employee = '<tr class="' + cssClass + '" id="">' +
        '<td class=" py-1">' + currentNum + '</td>' +
        '<td class=" py-1">' + firstName + '</td>' +
        '<td class=" py-1">' + lastName + '</td>' +
        '<td class=" py-1">' + empStatus + '</td>' + '</tr>';
    $('#employeeTable').append(employee);
}

function displayTable(data) {
    let table = JSON.parse(data);

    for (let i = 0; i < table.length; i++) {
        let newRow = [table[i].first_name, table[i].last_name, table[i].empStatus];
        addToTable(i + 1, newRow);
    }
}
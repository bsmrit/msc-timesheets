/**
 * JavaScript for admin page.
 * @author Dmitry Yushchev
 * @version 1.0
 */

$(document).ready(function () {
    console.log("JAVASCRIPT WORKING");

    uploadEmployeeNames();
    $("#employee").on("click", showAddEmployeePopup);//add link popup
    $("#add-employee-btn-save").on("click", saveBtnAddEmployeePopup);
});

function showAddEmployeePopup() {
    event.preventDefault();

    //hides other popups
    // removeErrorDiv();
    // hideCreateListPopup();
    // hideHelpPopup();
    // hideEditPopup();

    console.log("add employee");
    $('#add-employee-popup:hidden').show("fast");
}

function closeBtnAddEmployeePopup() {
    event.preventDefault();
    $('#add-employee-popup').hide("fast");
    console.log("add employee closed btm pressed");
}

function saveBtnAddEmployeePopup() {
    console.log("save btm pressed");
    // removeErrorDiv();

    //prevent the form from submitting to result.php
    event.preventDefault();

    //link-text
    let firstName = $("#first-name").val();
    firstName = upperCaseNameNoWhiteSpace(firstName);

    let lastName = $("#last-name").val();
    lastName = upperCaseNameNoWhiteSpace(lastName);

    let newEmployee = [];
    let errors = [];

    //if name is empty
    if (firstName.length === 0 || lastName.length === 0) {
        errors.push("You forgot enter first or last name.");
        reportErrors(errors);
    } else {
        newEmployee = [firstName, lastName];
        postNewEmployee(newEmployee);
        insertNewEmployeeIntoDb(newEmployee);
    }
}

function upperCaseNameNoWhiteSpace(data) {
    let name = data.toLowerCase();
    name = name.replace(/\s/g, '');
    name = name.charAt(0).toUpperCase() + name.substr(1);
    return name;
}

function postNewEmployee(data) {

    let firstName = data[0];
    let lastName = data[1];

    let employee = '<tr id="">' +
        // '<td class=" py-1"></td>' +
        '<td class=" py-1">' + firstName + '</td>' +
        '<td class=" py-1">' + lastName + '</td>' +
        // '<td class=" py-1"></td>' +
        // '<td class=" py-1"></td>' +
        // '<td class=" py-1"></td>' +
        '</tr>';
    $('#time-sheet-table-div').append(employee);
    $('#time-sheet-table-div').prev().show();

    // this is where we create the ajax request and send it to the backend for storing note in DB
    closeBtnAddEmployeePopup();
}

function insertNewEmployeeIntoDb(data) {
    console.log("insertNewEmployeeIntoDb: " + data[0] + ", " + data[1]);
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "insertNewEmployeeToDB",
            firstName: data[0],
            lastName: data[1]
        }
    });
}

function uploadEmployeeNames() {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeeNamesFromDB"
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {
            // console.log(data);
            refreshEmployeeNameTable(data);
        }
    });
}

function refreshEmployeeNameTable(data) {

    let tableName = JSON.parse(data);
    // console.log(tableName);

    for (let i = 0; i < tableName.length; i++) {
        // console.log(tableName[i]);
        let newEmployee = [tableName[i].first_name, tableName[i].last_name];
        postNewEmployee(newEmployee);
    }
}

/**
 * Report the errors if needed
 * @param data array of errors
 */
function reportErrors(data) {
    $('.error-title:hidden').show("fast");
    $('div#error').show("fast");

    data.forEach(function (element) {
        $('.error-message').append("<h5 class=\"report-errors\">" + element + "</h5>");
    });
}


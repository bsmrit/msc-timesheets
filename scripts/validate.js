/**
 * JavaScript for admin page.
 * @author Dmitry Yushchev
 * @version 1.0
 */

$(document).ready(function () {
    console.log("JAVASCRIPT WORKING");

    uploadEmployeeNames();
    //employee
    $("#employee").on("click", showAddEmployeePopup);//new employee popup
    $("#close-employee-popup").on("click", hideAddEmployeePopup);
    $("#add-employee-btn-save").on("click", saveBtnAddEmployeePopup);
    $("#admin").change(adminInput);

    //login
    $("#show-login").on("click", showLoginPopup);
    $("#close-login-popup").on("click", hideLoginPopup);
    // $('#login').on("click", validateLogin);

});

function adminInput() {
    adminInputSection = '<div class="form-group col-md-5 my-2">' +
        '<input id="login-name" class="form-control radius border-dark" name="login-name" ' +
        'type="text" placeholder="Login Name" value="">' +
        '</div>' +
        '<div class="form-group col-md-5 my-2">' +
        '<input id="password" class="form-control radius border-dark" name="password" ' +
        'type="password" placeholder="Password" value="">' +
        '</div>';

    if ($("#admin").is(":checked") && $(this).val() == "on") {
        console.log("+");
        $("#admin-input").append(adminInputSection);
    }
    else {
        console.log("-");
        $("#admin-input").html("");
        // $("#admin-input").attr('style', 'background:red;');
    }
}

/**
 * validates login data
 */
function validateLogin() {
    //remove any old validation messages
    // removeErrorDiv();

    let user = $("#user").val();
    let password = $("#password").val();
    let errors = [];

    //email - must have valid format
    if (user.length < 3 || user.length > 10) {
        errors.push("user must be 3-10 characters");
    }

    //password - must be 8-16 characters
    if (password.length < 8 || password.length > 16) {
        errors.push("password must be 8-16 characters");
    }

    //password - contain lowercase and uppercase letters
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        errors.push("password must contain lowercase and uppercase letters");
    }
    //password - contain lowercase and uppercase letters
    if (!/[0-9]/.test(password)) {
        errors.push("password must contain at list one digit");
    }

    //password - contain special characters
    if (!/(\-)|(\=)|(\[)|(\])|(\;)|(\,)|(\.)|(\/)|(\~)|(\!)|(\@)|(\#)|(\$)|(\%)|(\^)|(\&)|(\*)|(\()|(\))|(\_)|(\+)|(\{)|(\})|(\:)|(\<)|(\>)|(\?)/.test(password)) {// ================space===============
        errors.push("password must contain at list one symbol -=[]\\;,./~!@#$%^&*()_+{}|:<>?'");
    }// /[^a-zA-Z\d]/

    // report errors if there are any
    if (errors.length > 0) {
        reportErrors(errors);
    }

    //submit the form if appropriate
    if (errors.length === 0) {
        console.log("No errors");
        // $('#welcome-form').attr('action', "/IT328/GIT/bookmark/welcome");
        // $('#login-form').attr('action', "/msc-timesheets/welcome");
        // $("#login-form").submit();
    }
    else {
        event.preventDefault();
        console.log("There are errors");
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

function showLoginPopup() {
    event.preventDefault();
    console.log("login btn clicked");
    $('#login-popup:hidden').show("fast");
}

/**
 *
 */
function hideLoginPopup() {
    event.preventDefault();
    $('#login-popup').hide("fast");
    console.log("hide login clicked");
}

/**
 * Displays add employee div
 */
function showAddEmployeePopup() {
    event.preventDefault();
    //hides other popups
    // removeErrorDiv();

    // console.log("add employee");
    $('#add-employee-popup:hidden').show("fast");
    adminInput();
}


/**
 *
 */
function hideAddEmployeePopup() {
    event.preventDefault();
    $('#add-employee-popup').hide("fast");

}

/**
 * Gets first and last names from input window.
 * If no errors pass data to postNewEmployee() and insertNewEmployeeIntoDb() functions;
 */
function saveBtnAddEmployeePopup() {
    console.log("save btm pressed");
    // removeErrorDiv();

    //prevent the form from submitting to result.php
    event.preventDefault();

    let firstName = upperCaseNameNoWhiteSpace($("#first-name").val());
    let lastName = upperCaseNameNoWhiteSpace($("#last-name").val());
    let loginName;
    let password;

    //admin check box
    let admin;
    if ($("#admin").is(":checked")) {
        admin = 1;
        loginName = $("#login-name").val();
        // loginName.replace(/\s/g, '');
        password = $("#password").val();
        // password.replace(/\s/g, '');

    }
    else {
        admin = 0;
        loginName = "";
        password = "";
    }

    let newEmployee = [];
    let errors = [];

    //if name is empty
    if (firstName.length === 0 || lastName.length === 0) {
        errors.push("You forgot enter first or last name.");
        reportErrors(errors);
    } else {
        newEmployee = [firstName, lastName, admin, loginName, password];
        console.log("newEmployee: " + newEmployee);
        postNewEmployee(newEmployee);
        insertNewEmployeeIntoDb(newEmployee);
    }
}

/**
 * Gets a string value and capitalizes the 1st letter, (lower case other letters)
 * @param data string value, first od last names
 * @returns {string} first od last names
 */
function upperCaseNameNoWhiteSpace(data) {
    let name = data.toLowerCase();
    name = name.replace(/\s/g, '');
    name = name.charAt(0).toUpperCase() + name.substr(1);
    return name;
}

/**
 * Posts data in next raw in the table
 * @param data first, last name
 */
function postNewEmployee(data) {

    let firstName = data[0];
    let lastName = data[1];

    //checkmark
    let ckeckmark;
    if (data[2] == 1) {
        ckeckmark = '&#9997';
    } else {
        ckeckmark = '';
    }

    let employee = '<tr id="">' +
        // '<td class=" py-1"></td>' +
        '<td class=" py-1">' + firstName + '</td>' +
        '<td class=" py-1">' + lastName + '</td>' +
        '<td class=" py-0">' + ckeckmark + '</td>' +
        // '<td class=" py-1"></td>' +
        // '<td class=" py-1"></td>' +
        '</tr>';
    $('#time-sheet-table-div').append(employee);
    $('#time-sheet-table-div').prev().show();

    // this is where we create the ajax request and send it to the backend for storing note in DB
    hideAddEmployeePopup();
}

/**
 * Creates ajax request, sends data to ajax.php
 * @param data first, last names
 */
function insertNewEmployeeIntoDb(data) {
    console.log("insertNewEmployeeIntoDb: " + data[0] + ", " + data[1]);
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "insertNewEmployeeToDB",
            firstName: data[0],
            lastName: data[1],
            admin: data[2],
            loginName: data[3],
            password: data[4]
        }
    });
}

/**
 * Creates ajax request, get data from  ajax.php
 * calls refreshEmployeeNameTable()
 */
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

/**
 * Uploads all employee data to each raw in the table
 * @param data first, last names
 */
function refreshEmployeeNameTable(data) {

    let tableName = JSON.parse(data);

    for (let i = 0; i < tableName.length; i++) {
        // console.log(tableName[i]);
        let newEmployee = [tableName[i].first_name, tableName[i].last_name, tableName[i].admin];
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


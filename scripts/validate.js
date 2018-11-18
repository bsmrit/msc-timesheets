/**
 * JavaScript for admin page.
 * @author Dmitry Yushchev
 * @version 1.0
 */

$(document).ready(function () {
    console.log("JAVASCRIPT WORKING");

    uploadEmployeeNames();
    //add employee popup
    $("#employee").on("click", showAddEmployeePopup);
    $("#close-employee-popup").on("click", hideAddEmployeePopup);
    $("#add-employee-btn-save").on("click", saveBtnAddEmployeePopup);
    $("#admin").change(adminInput);
    $("#recep").change(adminInput);
    $("#empl").change(adminInput);
    //edit employee popup
    $("#close-edit-employee-popup").on("click", hideEditEmployeePopup);
    $("#edit-employee-btn-save").on("click", saveBtnEditEmployeePopup);
    $("#edit-employee-btn-delete").on("click", deleteBtnEditEmployeePopup);
    $("#empl-edit").change(adminInputEdit);
    $("#admin-edit").change(adminInputEdit);
    $("#recep-edit").change(adminInputEdit);
    //login popup
    $("#show-login").on("click", showLoginPopup);
    $("#close-login-popup").on("click", hideLoginPopup);
});

//Deletes employee in "Edit Employee" popup
function deleteBtnEditEmployeePopup() {
    console.log("dele" + employeeId);
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "deleteEmployeeInDB",
            employeeId: employee_Id
        }
    });
    let trId = "#" + employee_Id;
    $(trId).remove();
    hideEditEmployeePopup();
}

//Hides "Edit Employee" Popup
function hideEditEmployeePopup() {
    event.preventDefault();
    $('#edit-employee-popup').hide("fast");
}

//Displays "Edit Employee" popup
function showEditEmployeePopup() {
    event.preventDefault();
    hideAddEmployeePopup();
    employeeId = event.target.id;
    employeeId = parseInt(employeeId.replace('employeeId_', ''));

    // console.log("clicked " + employeeId);
    $('#edit-employee-popup:hidden').show("fast");

    //get employee data by id from DB
    getEmployeeDataById(employeeId);
}

//Retrieves employee data from DB by clicking on "edit" in the table
function getEmployeeDataById(data) {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeeDataById",
            employeeId: data
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {
            // console.log("from DB: "+data);
            let employeeData = JSON.parse(data);
            console.log("emp from DB: " + employeeData);

            //fills name and pin inputs of employee
            $('#edit-first-name').val(employeeData[0]);
            $('#edit-last-name').val(employeeData[1]);
            $('#pin-edit').val(employeeData[6]);

            //checks radio button and fills login name, password
            let admin;
            if (employeeData[2] == 1) { //this user is an admin
                //checks radio button
                $('input:radio[name=edit-admin]')[1].checked = true;
                adminInputEdit();
                //fills login name, password
                $('#login-name-edit').val(employeeData[3]);
                $('#password-edit').val(employeeData[4]);
            }
            else if (employeeData[2] == 2) { // this user is a receptionist
                //checks radio button
                $('input:radio[name=edit-admin]')[2].checked = true;
                adminInputEdit();
                //fills login name, password
                $('#login-name-edit').val(employeeData[3]);
                $('#password-edit').val(employeeData[4]);
            }
            else {
                $("#admin-input-edit").html("");
            }
            employee_Id = employeeData[5];
        }
    });
}

//Saves changes in "Edit Employee" popup
function saveBtnEditEmployeePopup() {
    //retrives name from the inputs
    let firstName = upperCaseNameNoWhiteSpace($("#edit-first-name").val());
    let lastName = upperCaseNameNoWhiteSpace($("#edit-last-name").val());
    let pin = $("#pin-edit").val();

    //retrives login name, password  from the inputs
    let admin = $('input[name=edit-admin]:checked').val();
    let loginName;
    let password;
    let employee;


    //if admin or recep password, login name are needed
    if ((admin == 1 || admin == 2) && firstName.length !== 0 &&
        lastName.length !== 0 && pin.length == 4 && !isNaN(pin)) {
        loginName = $("#login-name-edit").val();
        password = $("#password-edit").val();

        if (loginName.length !== 0 && password.length !== 0) {
            console.log(loginName+", " + password);
            console.log("admin or recep: " + employee);
            employee = [firstName, lastName, admin, loginName, password, pin];
            updateEmployeeInDb(employee);
            hideEditEmployeePopup();
        }
    }//if employee password, login name not needed
    else if (admin == 0 && firstName.length !== 0 &&
        lastName.length !== 0 && pin.length == 4 && !isNaN(pin)) {

        loginName = "";
        password = "";
        if (loginName.length == 0 && password.length == 0) {
            employee = [firstName, lastName, admin, loginName, password, pin];
            console.log("employee: " + employee);
            updateEmployeeInDb(employee);
            hideEditEmployeePopup();
        }
    }
    else {
        console.log("Something is missing, emolpyee was not updated.");
    }
}

function updateEmployeeInDb(data) {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "updateEmployeeInDb",
            firstName: data[0],
            lastName: data[1],
            admin: data[2],
            loginName: data[3],
            password: data[4],
            employeeId: employee_Id,
            pin: data[5]
        },
        success: function (data, status, response) {
            let employeeData = JSON.parse(data);
            console.log("=: " + employeeData);
            hideEditEmployeePopup();
            event.preventDefault();

            //replace the raw in the table
            let checkmark;
            if (employeeData[2] == 1) {
                checkmark = '<i class="fas fa-crown"></i>';
            }
            else if (employeeData[2] == 2) {
                checkmark = '<i class="fas fa-phone"></i>';
            } else {
                checkmark = '';
            }

            let employeeId = "employeeId_" + data[4];
            let del = '' +
                '<div style="width: 4em"><i class="fas fa-edit"></i>' +
                '<a id="' + employeeId + '" class="edit-emlolyee-raw mx-2" onclick="showEditEmployeePopup()" href="#">Edit</a></div>';

            let employeeRaw = '<tr id="' + employee_Id + '">' +
                '<td class=" py-1">' + employeeData[0] + '</td>' +
                '<td class=" py-1">' + employeeData[1] + '</td>' +
                '<td class=" py-1">' + employeeData[6] + '</td>' +
                '<td class=" py-1">' + employeeData[3] + '</td>' +
                '<td class=" py-1">' + checkmark + '</td>' +
                '<td class=" py-1">' + del + '</td></tr>';

            let trId = "#" + employee_Id;
            $(trId).replaceWith(employeeRaw);
        }
    });
}

//Creates a div with login name and password
function inputDiv(data1, data2) {
    let inputs = '<div class="form-group col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2">' +
        '<input id="' + data1 + '" class="form-control radius border-dark" name="' + data1 + '" ' +
        'type="text" placeholder="Login Name" value=""></div>' +
        '<div class="form-group col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2">' +
        '<input id="' + data2 + '" class="form-control radius border-dark" name="' + data2 + '" ' +
        'type="password" placeholder="Password" value="">' +
        '</div><div class="form-group col-md-2"></div>';
    return inputs;
}

//Adds inputs for login name and password in "Add Employee" popup
function adminInput() {
    let inputDivSection = inputDiv("login-name", "password");
    radioButtons("#admin-input", "admin", inputDivSection);
}

//Adds inputs for login name and password in "Edit Employee" popup
function adminInputEdit() {
    let inputDivSection = inputDiv("login-name-edit", "password-edit");
    radioButtons("#admin-input-edit", "edit-admin", inputDivSection);
}

//Checks if inputs for login name and password needed
function radioButtons(data1, data2, inputDiv) {

    let tempString = "input[name=" + data2 + "]:checked";

    let admin = $(tempString).val();
    if (admin == 1 || admin == 2) {
        // console.log("+");
        $(data1).html("");
        $(data1).append(inputDiv);
    } else {
        // console.log("-");
        $(data1).html("");
    }
}

//Report the errors if needed
function reportErrors(data) {
    $('.error-title:hidden').show("fast");
    $('div#error').show("fast");

    data.forEach(function (element) {
        $('.error-message').append("<h5 class=\"report-errors\">" + element + "</h5>");
    });
}

//Displays the "Login" popup
function showLoginPopup() {
    event.preventDefault();
    console.log("login btn clicked");
    $('#login-popup:hidden').show("fast");
}

//Hides the "Login" popup
function hideLoginPopup() {
    event.preventDefault();
    $('#login-popup').hide("fast");
    console.log("hide login clicked");
}

//Displays the "Add Employee" popup
function showAddEmployeePopup() {
    event.preventDefault();
    hideEditEmployeePopup();
    //hides other popups
    // removeErrorDiv();

    $('#add-employee-popup:hidden').show("fast");
    // $("#admin").attr('disabled', false);
    // $("#recep").attr('disabled', false);
    // $("#admin").attr('checked', false);
    // $("#recep").attr('checked', false);
    // adminInput();
}

//Hides the "Add Employee" popup
function hideAddEmployeePopup() {
    event.preventDefault();
    $("#admin-input").html("");
    $('#add-employee-popup').hide("fast");
}

/**
 * Gets first and last names from input window.
 * If no errors pass data to postNewEmployee() and insertNewEmployeeIntoDb() functions;
 */
function saveBtnAddEmployeePopup() {
    // console.log("save btm pressed");
    // removeErrorDiv();

    //prevent the form from submitting to result.php
    event.preventDefault();

    let firstName = upperCaseNameNoWhiteSpace($("#first-name").val());
    let lastName = upperCaseNameNoWhiteSpace($("#last-name").val());

    //pin
    let pin = 0;
    let tempPin = $("#pin").val();
    tempPin = tempPin.replace(/\s/g, '');
    if (tempPin.length == 4 && /[0-9]/.test(tempPin)) {
        pin = tempPin;
    }

    let loginName;
    let password;

    //admin check box
    let admin = $('input[name=admin]:checked').val();
    
    if (admin == 1) {
        loginName = $("#login-name").val();
        password = $("#password").val();
    } else if (admin == 2) {
        loginName = $("#login-name").val();
        password = $("#password").val();
    } else {
        admin = 0;
        loginName, password = "";
    }

    let newEmployee = [];
    let errors = [];

    //if name is empty
    if (firstName.length == 0 || lastName.length == 0) {
        errors.push("You forgot enter first or last name.");
        console.log("You forgot enter first or last name.")
        reportErrors(errors);
    }

    if (pin == 0 || !pin.toString().length == 4) {
        errors.push("You forgot enter PIN or it is less that 4 digits.");
        console.log("You forgot enter PIN or it is less that 4 digits.")
        reportErrors(errors);
    }
    else if (admin == 1 && loginName.length == 0 || admin == 1 && password.length == 0 ||
        admin == 2 && loginName.length == 0 || admin == 2 && password.length == 0) {
        errors.push("You forgot enter login or password.");
        console.log("You forgot enter login or password.")
        reportErrors(errors);
    }
    else {
        newEmployee = [firstName, lastName, admin, loginName, password, pin];
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

    // let employeeId = createTableRaw(data[0], data[1], data[2], data[3], data[4])
    let firstName = data[0];
    let lastName = data[1];
    let employeeId = "employeeId_" + data[4];
    let pin = data[5];

    //checkmark
    let checkmark;
    let username;
    if (data[2] == 1) {
        checkmark = '<i class="fas fa-crown"></i>';
        username = data[3];
    }
    else if (data[2] == 2) {
        checkmark = '<i class="fas fa-phone"></i>';
        username = data[3];
    } else {
        checkmark = '';
        username = '';
    }
    // let del = '&#9940; Delete';
    let del = '' +
        '<div style="width: 4em"><i class="fas fa-edit"></i>' +
        '<a id="' + employeeId + '" class="edit-emlolyee-raw mx-2" onclick="showEditEmployeePopup()" href="#">Edit</a></div>';

    let employee = '<tr id="' + data[4] + '">' +
        // '<td class=" py-1"></td>' +
        '<td class=" py-1">' + firstName + '</td>' +
        '<td class=" py-1">' + lastName + '</td>' +
        '<td class=" py-1">' + pin + '</td>' +
        '<td class=" py-1">' + username + '</td>' +
        '<td class=" py-1">' + checkmark + '</td>' +
        '<td class=" py-1">' + del + '</td>' +
        // '<td class=" py-1"></td>' +
        '</tr>';
    $('#time-sheet-table-div').append(employee);
    $('#time-sheet-table-div').prev().show();

    // this is where we create the ajax request and send it to the backend for storing note in DB
    hideAddEmployeePopup();
}

// function createTableRaw(fName, lName, admin, loginName, id) {
//     // console.log("data: " + data);
//     let firstName = fName;
//     let lastName = lName;
//     let employeeId = "employeeId_" + id;
//
//     //checkmark
//     let checkmark;
//     let username;
//     if (admin == 1) {
//         // checkmark = '&#9997;';
//         checkmark = 'Admin';
//         username = loginName;
//     }
//     else if (admin == 2) {
//         // checkmark = '&#128222;';
//         checkmark = 'Receptionist';
//         username = loginName;
//     } else {
//         checkmark = '';
//         username = '';
//     }
//     // let del = '&#9940; Delete';
//     let del = '' +
//         '<i class="far fa-edit"></i>' +
//         '<a id="' + employeeId + '" class="edit-emlolyee-raw mx-2" onclick="showEditEmployeePopup()" href="#">Edit</a>';
//
//     let employee = '<tr id="'+id+'">' +
//         // '<td class=" py-1"></td>' +
//         '<td class=" py-1">' + firstName + '</td>' +
//         '<td class=" py-1">' + lastName + '</td>' +
//         '<td class=" py-1">' + username + '</td>' +
//         '<td class=" py-1">' + checkmark + '</td>' +
//         '<td class=" py-1">' + del + '</td>' +
//         // '<td class=" py-1"></td>' +
//         '</tr>';
//     return employee;
// }

/**
 * Creates ajax request, sends data to ajax.php
 * @param data first, last names
 */
function insertNewEmployeeIntoDb(data) {
    // console.log("insertNewEmployeeIntoDb: " + data[0] + ", " + data[1]+", " + data[5]);
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
            password: data[4],
            pin: data[5]
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
        let newEmployee = [tableName[i].first_name, tableName[i].last_name, tableName[i].admin, tableName[i].username, tableName[i].id, tableName[i].pin];
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


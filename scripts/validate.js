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

    // add listeners to all of the edit buttons
    // 1. get all edit-button elements and put them in allEditButtons
    // 2. loop through all those elements and add a click listener on each
    // THIS ISN'T WORKING
    /*
    let allEditButtons = document.getElementsByClassName("edit-icon");
    console.log(allEditButtons);
    var i;
    for(i = 0; i < allEditButtons.length; i++) {
        allEditButtons[i].addEventListener("click", showAddEmployeePopup);
        console.log(allEditButtons[i]);
    }

    $("#test").on("click", showAddEmployeePopup);
    */

    $("#close-edit-employee-popup").on("click", hideEditEmployeePopup);

    // listener for the delete button on the edit employee popup -- pulls employee id from the popup itself
    // the id is stored on the popup at the time the popup is opened -- it comes from the clicked <tr>
    $("#edit-employee-btn-delete").on("click", deleteEmployee);

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
    $('#edit-employee-popup').hide("fast");

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
 * Displays edit employee div
 */
function showEditEmployeePopup() {
    event.preventDefault();

    // hides other popups
    $('#add-employee-popup').hide("fast");

    // console.log("add employee");
    $('#edit-employee-popup:hidden').show("fast");

    // grab first and last name data from the table and put it into the proper input boxes ('this') is the clicked <tr>
    $("#edit-first-name").val($(this).children(".first-name-data").html());
    $("#edit-last-name").val($(this).children(".last-name-data").html());

    // employee ids on the table rows -- when a row is clicked grab the user-id from the row and store it on the popup
    $("#edit-employee-popup").attr("user-id", $(this).attr("user-id"))

    // FOR NOW NOT GOING TO DEAL WITH ADMIN INFO IN THE EDIT/DELETE POPUP
    // adminInput();


}

function deleteEmployee() {

    let id = $("#edit-employee-popup").attr("user-id");

    console.log("Made it into delete employee js function for ajax and the id is: " + id);

    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "deleteEmployeeInDB",
            id: id
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {

            // remove the table row associated with the employee just deleted
            $("tr[user-id=" + id + "]").remove();

            // hide the edit employee popup
            hideEditEmployeePopup();

        }
    });
}

/**
 *
 */
function hideEditEmployeePopup() {
    event.preventDefault();
    $('#edit-employee-popup').hide("fast");

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
        console.log("You forgot enter first or last name.")
        reportErrors(errors);
    }
    if (admin == 1 && loginName.length === 0 || admin == 1 && password.length === 0) {
        errors.push("You forgot enter login or password.");
        console.log("You forgot enter login or password.")
        reportErrors(errors);
    }
    else {
        newEmployee = [firstName, lastName, admin, loginName, password];
        console.log("newEmployee: " + newEmployee);

        // commented out postNewEmployee here in favor of putting it into the success block of insertNewEmployeeIntoDb
        // this was done so that the id of the newly inserted employee could be retrieved (via mysqli_insert_id)
        // and stored on the new <tr> created -- since the id will be required in case user wants to delete the new
        // employee without refreshing the page
        // postNewEmployee(newEmployee);
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
    let id = data[4]; // this id will be set as an attribute on the table row below

    //checkmark
    let checkmark;
    let username;
    if (data[2] == 1) { // if the user is an admin then data[2] will be 1
        checkmark = '<span class="fas fa-crown"></span>'; // if an admin, set checkmark equal to icon value
        username = data[3]; // if an admin, set username equal to the admins username

    } else { // if the user is not an admin, checkmark and username are set to empty strings
        checkmark = '';
        username = '';
    }


    // REMOVE TR TAG MOMENTARILY
    let employee = //'<tr id="" class="edit-row">' +
        // '<td class=" py-1"></td>' +
        '<td class="first-name-data py-1">' + firstName + '</td>' +
        '<td class="last-name-data py-1">' + lastName + '</td>' +
        '<td class="username-data py-1">' + username + '</td>' +
        '<td class="admin-data align-middle text-center py-0">' + checkmark + '</td>';
        // '<td class="edit-cell align-middle text-center py-0"><span class="fas fa-edit edit-icon" user_id="ABC"></span></td>';
        // '<td class=" py-1"></td>' +
        // '<td class=" py-1"></td>' +
        //'</tr>';

    var employeeElement = document.createElement("tr");
    employeeElement.setAttribute("user-id", id); // the user id is set as an attribute on the table row <tr>
    employeeElement.innerHTML = employee;
    employeeElement.addEventListener("click", showEditEmployeePopup);
    $('#time-sheet-table-div').append(employeeElement);

    //REMOVED MOMENTARILY
    //$('#time-sheet-table-div').append(employee);
    $('#time-sheet-table-div').prev().show();

    // this is where we create the ajax request and send it to the backend for storing note in DB
    hideAddEmployeePopup();
}

/**
 * Creates ajax request, sends data to ajax.php
 * @param data first, last names
 */
function insertNewEmployeeIntoDb(employeeArray) {
    console.log("insertNewEmployeeIntoDb: " + employeeArray[0] + ", " + employeeArray[1]);
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "insertNewEmployeeToDB",
            firstName: employeeArray[0],
            lastName: employeeArray[1],
            admin: employeeArray[2],
            loginName: employeeArray[3],
            password: employeeArray[4]
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {

            // we should get back the ID of the newly inserted employee
            // data is the new id of the newly inserted employee
            console.log(data);

            // postNewEmployee needs array with 1)
            let newEmployee = [];
            newEmployee[0] = employeeArray[0];
            newEmployee[1] = employeeArray[1];
            newEmployee[2] = employeeArray[2];
            newEmployee[3] = employeeArray[3];
            newEmployee[4] = data;

            postNewEmployee(newEmployee);
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
 * @param data takes a JSON string (not object) that includes first and last names, admin flag and username, and
 * employee id
 */
function refreshEmployeeNameTable(data) {
    let tableName = JSON.parse(data);

    for (let i = 0; i < tableName.length; i++) {
        // create an newEmployee array with first and last name, admin flag, admin username, and the employee id
        let newEmployee = [tableName[i].first_name, tableName[i].last_name, tableName[i].admin, tableName[i].username,
            tableName[i].id];
        // use the newEmployee array to post that employee onto the table
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


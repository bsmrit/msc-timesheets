/**
 * JavaScript for admin page.
 * @author Dmitry Yushchev, James Way
 * @version 1.0
 */
$(document).ready(function () {

    uploadEmployeeNames();

    // add employee popup
    $("#employee").on("click", showAddEmployeePopup);
    $("#close-employee-popup").on("click", hideAddEmployeePopup);
    $("#add-employee-btn-save").on("click", saveBtnAddEmployeePopup);
    $("#admin").change(adminInput);
    $("#recep").change(adminInput);
    $("#empl").change(adminInput);

    // edit employee popup
    $("#close-edit-employee-popup").on("click", hideEditEmployeePopup);
    $("#edit-employee-btn-save").on("click", saveBtnEditEmployeePopup);
    $("#edit-employee-btn-delete").on("click", deleteBtnEditEmployeePopup);
    $("#empl-edit").change(adminInputEdit);
    $("#admin-edit").change(adminInputEdit);
    $("#recep-edit").change(adminInputEdit);

    // view history
    $("#close-view-history-popup").on("click", hideViewHistoryPopup);

    // login popup
    $("#show-login").on("click", showLoginPopup);
    $("#close-login-popup").on("click", hideLoginPopup);
});

/**
 * Deletes employee in "Edit Employee" popup
 */
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
    //removes a raw from the table by ID
    let trId = "#" + employee_Id;
    $(trId).remove();
    //hides "Edit Employee" Popup
    hideEditEmployeePopup();
}

/**
 * Hides "Edit Employee" Popup
 */
function hideEditEmployeePopup() {
    //event.preventDefault();
    $('#edit-employee-popup').hide("fast");
}

/**
 * Displays "Edit Employee" popup
 */
function showEditEmployeePopup(event) {
    //event.preventDefault();
    //hides "Add Employee" Popup
    hideAddEmployeePopup();
    hideViewHistoryPopup();
    //gets ID from edit tag by clicking on it
    employeeId = event.target.id;
    employeeId = parseInt(employeeId.replace('employeeId_', ''));
    console.log("clicked " + employeeId);
    $('#edit-employee-popup:hidden').show("fast");
    //get employee data by id from DB
    getEmployeeDataById(employeeId);
}

/**
 * Retrieves employee data from DB by clicking on "edit" in the table
 * @param data is employee ID
 */
function getEmployeeDataById(employeeId) {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeeDataById",
            employeeId: employeeId
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {
            let employeeData = JSON.parse(data);
            console.log("emp from DB: " + employeeData);
            //fills name and pin inputs of employee
            $('#edit-first-name').val(employeeData[0]);
            $('#edit-last-name').val(employeeData[1]);
            $('#pin-edit').val(employeeData[6]);
            //checks radio button and fills login name, password
            let admin;
            if (employeeData[2] == 1 && countChildren == 7) { //this user is an admin
                //checks radio button
                $('input:radio[name=edit-admin]')[1].checked = true;
                adminInputEdit();
                //fills login name, password
                $('#login-name-edit').val(employeeData[3]);
                $('#password-edit').val(employeeData[4]);
            }
            else if (employeeData[2] == 2 && countChildren == 7) { // this user is a receptionist
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

/**
 * Saves changes in "Edit Employee" popup
 */
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
            employee = [firstName, lastName, admin, loginName, password, pin];
            //update emplyee info in DB and hide the popup
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
            //update emplyee info in DB and hide the popup
            updateEmployeeInDb(employee);
            hideEditEmployeePopup();
        }
    }
    else {
        console.log("Something is missing, emolpyee was not updated.");
    }
}

/**
 * updates employee information in the table
 * @param data is an array[firstName, lastName, admin, loginName, password, pin]
 */
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
            //hides "EditEmployee" popup
            hideEditEmployeePopup();
            //event.preventDefault();
            //declare a symbol for admin and receptionist
            let symbol;
            if (employeeData[2] == 1) {
                symbol = '<i class="fas fa-crown"></i>';
            } else if (employeeData[2] == 2) {
                symbol = '<i class="fas fa-phone"></i>';
            } else {
                symbol = '';
            }
            //declare edit button with the employee ID
            console.log("id: " + employee_Id);
            let employeeId = "employeeId_" + employee_Id;
            let action = '<div style="width: 4em"><i class="fas fa-edit"></i>' +
                '<a id="' + employeeId + '" class="edit-emlolyee-raw mx-2" ' +
                'onclick="showEditEmployeePopup(event)" href="#">Edit</a></div>';
            let view = '' +
                '<div style="width: 4em"><i class="fa fa-hourglass-end"></i>' +
                '<a id="' + employeeId + '" class="view-history mx-2" ' +
                'onclick="showViewHistoryPopup(event)" href="#">View</a></div>';

            //creates a raw with employee data
            let employeeRaw = '<tr id="' + employee_Id + '">' +
                '<td class=" py-1">' + employeeData[0] + '</td>' +
                '<td class=" py-1">' + employeeData[1] + '</td>' +
                '<td class=" py-1">' + employeeData[6] + '</td>' +
                '<td class=" py-1">' + employeeData[3] + '</td>' +
                '<td class=" py-1">' + symbol + '</td>' +
                '<td class=" py-1">' + action + '</td>' +
                '<td class=" py-1">' + view + '</td></tr>';
            //replace the raw in the table
            //replace the raw in the table
            let trId = "#" + employee_Id;
            $(trId).replaceWith(employeeRaw);
        }
    });
}

function createTableRaw(employee_Id, firstName, lastName, pin, userName, symbol, action, view) {
    //creates a raw with employee data
    let employeeRaw = '<tr id="' + employee_Id + '">' +
        '<td class=" py-1">' + lastName + '</td>' +
        '<td class=" py-1">' + firstName + '</td>' +
        '<td class=" py-1">' + pin + '</td>' +
        '<td class=" py-1">' + userName + '</td>' +
        '<td class=" py-1">' + symbol + '</td>' +
        '<td class=" py-1">' + action + '</td>' +
        '<td class=" py-1">' + view + '</td></tr>';
    return employeeRaw;
}


/**
 * Creates a div with login name and password
 * @param data1 String, login name
 * @param data2 String, password
 * @returns {string}
 */
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

/**
 * Adds inputs for login name and password in "Add Employee" popup
 */
function adminInput() {
    let inputDivSection = inputDiv("login-name", "password");
    radioButtons("#admin-input", "admin", inputDivSection);
}

/**
 * Adds inputs for login name and password in "Edit Employee" popup
 */
function adminInputEdit() {
    let inputDivSection = inputDiv("login-name-edit", "password-edit");
    radioButtons("#admin-input-edit", "edit-admin", inputDivSection);
}

/**
 * Checks if inputs for login name and password needed
 * @param data1 is ID of div wher to insert
 * @param data2 is name of radio buttuns
 * @param inputDiv is div with login name and password
 */
function radioButtons(data1, data2, inputDiv) {
    //gets the value 0, 1, 2 from radio buttons
    let tempString = "input[name=" + data2 + "]:checked";
    //displays or hides the password and user name
    let admin = $(tempString).val();
    if (admin == 1 || admin == 2) {
        $(data1).html("");
        $(data1).append(inputDiv);
    } else {
        $(data1).html("");
    }
}

//Report the errors if needed <----------- N O T  U S E D
function reportErrors(data) {
    $('.error-title:hidden').show("fast");
    $('div#error').show("fast");

    data.forEach(function (element) {
        $('.error-message').append("<h5 class=\"report-errors\">" + element + "</h5>");
    });
}

/**
 * Displays the "Login" popup
 */
function showLoginPopup(event) {
    event.preventDefault();
    console.log("login btn clicked");
    $('#login-popup:hidden').show("fast");
}

/**
 * Hides the "Login" popup
 */
function hideLoginPopup() {
    event.preventDefault();
    $('#login-popup').hide("fast");
    console.log("hide login clicked");
}

/**
 * Displays the "Add Employee" popup
 */
function showAddEmployeePopup(event) {
    event.preventDefault();
    //hides other popups
    hideEditEmployeePopup();
    hideViewHistoryPopup();
    // removeErrorDiv();
    $('#add-employee-popup:hidden').show("fast");
}

/**
 * Hides the "Add Employee" popup
 */
function hideAddEmployeePopup() {
    //event.preventDefault(); // REMOVED AS PART OF FIREFOX TROUBLESHOOTING
    //hides pasword and user name by defalt
    $("#admin-input").html("");
    // remove input from all fields
    $('#first-name').val("");
    $('#last-name').val("");
    $('#pin').val("");
    // reset radio button back to the 'employee' setting
    $('#empl').attr('checked', 'checked');
    $('#empl').prop('checked', true);
    $('#admin').removeAttr('checked');
    $('#admin').prop('checked', false);
    $('#recep').removeAttr('checked');
    $('#recep').prop('checked', false);
    //hides "Add employee popup
    $('#add-employee-popup').hide("fast");
}

/**
 * Gets first and last names from input window.
 * If no errors pass data to postNewEmployee() and insertNewEmployeeIntoDb() functions;
 */
function saveBtnAddEmployeePopup(event) {
    // removeErrorDiv();
    event.preventDefault();
    //gets first and last names from "Edit Employee" popup and capitalize the first letter
    let firstName = upperCaseNameNoWhiteSpace($("#first-name").val());
    let lastName = upperCaseNameNoWhiteSpace($("#last-name").val());

    let pin = 0;
    //gets pin from "Edit Employee" popup
    let tempPin = $("#pin").val();
    tempPin = tempPin.replace(/\s/g, '');
    // pin must be a number and 4 digits
    if (tempPin.length == 4 && /[0-9]/.test(tempPin)) {
        pin = tempPin;
    }

    let loginName;
    let password;
    //gets value 0, 1, 2 from radio buttons
    let admin = $('input[name=admin]:checked').val();
    //if value radio button is admin or receptionist
    // get user name and password from "Edit Employee" popup
    if (admin == 1 || admin == 2) {
        loginName = $("#login-name").val();
        password = $("#password").val();
    } else {
        admin = 0;
        loginName, password = "";
    }

    let newEmployee = [];
    let errors = [];

    //name must noy be empty
    if (firstName.length == 0 || lastName.length == 0) {
        errors.push("You forgot enter first or last name.");
        console.log("You forgot enter first or last name.")
        // reportErrors(errors);
    }
    //pin must not be emtry
    if (pin == 0 || !pin.toString().length == 4) {
        errors.push("You forgot enter PIN or it is less that 4 digits.");
        console.log("You forgot enter PIN or it is less that 4 digits.")
        // reportErrors(errors);
    }
    else if (admin == 1 && loginName.length == 0 || admin == 1 && password.length == 0 ||
        admin == 2 && loginName.length == 0 || admin == 2 && password.length == 0) {
        errors.push("You forgot enter login or password.");
        console.log("You forgot enter login or password.")
        // reportErrors(errors);
    }
    else {
        newEmployee = [firstName, lastName, admin, loginName, password, pin];
        console.log("newEmployee: " + newEmployee);
        insertNewEmployeeIntoDb(newEmployee); // insertNewEmployee will update DB and UI (as part of success block)
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

    //declare a symbol for admin and receptionist
    let symbol;
    let username;
    if (data[2] == 1) {
        symbol = '<i class="fas fa-crown"></i>';
        username = data[3];
    }
    else if (data[2] == 2) {
        symbol = '<i class="fas fa-phone"></i>';
        username = data[3];
    } else {
        symbol = '';
        username = '';
    }
    let employee;
    let edit;
    //creates a div with view button and a symbol
    let view = '' +
        '<div style="width: 4em"><i class="fa fa-hourglass-end"></i>' +
        '<a id="' + employeeId + '" class="view-history mx-2" ' +
        'onclick="showViewHistoryPopup(event)" href="#">View</a></div>';

    //check how many children in table head, if 7 = loged in as admin, less = receptionist
    countChildren = $("#time-sheet-table-head > *").length;
    if (countChildren == 7) {
        //creates a div with edit button and a symbol
        edit = '<div style="width: 4em"><i class="fas fa-edit"></i>' +
            '<a id="' + employeeId + '" class="edit-emlolyee-raw mx-2" ' +
            'onclick="showEditEmployeePopup(event)" href="#">Edit</a></div>';

        //creates a raw with employee data
        employee = '<tr id="' + data[4] + '">' +
            '<td class=" py-1">' + lastName + '</td>' +
            '<td class=" py-1">' + firstName + '</td>' +
            '<td class=" py-1">' + pin + '</td>' +
            '<td class=" py-1">' + username + '</td>' +
            '<td class=" py-1">' + symbol + '</td>' +
            '<td class=" py-1">' + edit + '</td>' +
            '<td class=" py-1">' + view + '</td></tr>';
    } else {
        //creates a div with edit button and a symbol
        edit = '<div style="width: 6em"><i class="fas fa-edit"></i>' +
            '<a id="' + employeeId + '" class="edit-emlolyee-raw mx-2" ' +
            'onclick="showEditEmployeePopup(event)" href="#">Delete</a></div>';

        //creates a raw with employee data
        employee = '<tr id="' + data[4] + '">' +
            '<td class=" py-1">' + lastName + '</td>' +
            '<td class=" py-1">' + firstName + '</td>' +
            '<td class=" py-1">' + pin + '</td>' +
            '<td class=" py-1">' + username + '</td>' +
            '<td class=" py-1">' + symbol + '</td>' +
            '<td class=" py-1">' + edit + '</td></tr>';
    }

    //add a new raw with the employee data into a table
    $('#time-sheet-table-div').append(employee);
    $('#time-sheet-table-div').prev().show();

    // this is where we create the ajax request and send it to the backend for storing note in DB
    hideAddEmployeePopup();
}

/**
 * Creates ajax request, sends data to ajax.php
 * @param data first, last names
 */
function insertNewEmployeeIntoDb(newEmployeeArray) {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "insertNewEmployeeToDB",
            firstName: newEmployeeArray[0],
            lastName: newEmployeeArray[1],
            admin: newEmployeeArray[2],
            loginName: newEmployeeArray[3],
            password: newEmployeeArray[4],
            pin: newEmployeeArray[5]
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {
            // create a newEmployee object, notice that 'data' is the employee ID
            // returned by ajax call
            newEmployee = [newEmployeeArray[0], newEmployeeArray[1], newEmployeeArray[2],
                newEmployeeArray[3], data, newEmployeeArray[5]];
            // using the newEmployee array just created, send to postNewEmployee
            // to create new employee row on UI
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
            // console.log("dc: "+getCookie("id"));
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
        let newEmployee = [tableName[i].first_name, tableName[i].last_name,
            tableName[i].admin, tableName[i].username, tableName[i].id, tableName[i].pin];
        postNewEmployee(newEmployee);
    }
}

/**
 * Report the errors if needed  <--------------------- N O T  U S E D
 * @param data array of errors
 */
function reportErrors(data) {
    $('.error-title:hidden').show("fast");
    $('div#error').show("fast");

    data.forEach(function (element) {
        $('.error-message').append("<h5 class=\"report-errors\">" + element + "</h5>");
    });
}

//EMPLOYEE HISTORY POPUP SECTION

/**
 * Hides "View History" Popup
 */
function hideViewHistoryPopup() {
    //event.preventDefault();
    $('#view-history-popup').hide("fast");
}

/**
 * Displays "View History" popup
 */
function showViewHistoryPopup(event) {
    event.preventDefault();
    hideAddEmployeePopup();
    hideEditEmployeePopup();
    employeeId = event.target.id;
    employeeId = parseInt(employeeId.replace('employeeId_', ''));
    $('#view-history-popup:hidden').show("fast");

    //get employee data by id from DB
    getHistoryById(employeeId);
}

/**
 * Pulls the employee names and their status via ajax request
 */
function getHistoryById(data) {
    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeeStatusHistory",
            empId: data
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {
            jsonData = JSON.parse(data);
            console.log(jsonData);

            // the JSON'd data object has status_datetime in unix seconds, keep it that way and sort by unix timestamp
            // b - a will sort such that most recent (greatest) unix timestamp appears first in the array
            jsonData.sort(function(a, b) {
                return parseInt(b.status_datetime) - parseInt(a.status_datetime);
            });

            // now convert each unix timestamp to a local, formatted timestamp string
            jsonData.forEach(function(element) {
                var date = new Date(element.status_datetime * 1000);
                element.status_datetime = date.toLocaleString();
            });

            displayHistoryTable(JSON.stringify(jsonData));
        }
    });
}

/**
 * Accepts a date, time and comment then displays them in a row
 */
function addToHistoryTable(data) {
    let dateTime = data[0];
    let status = data[1];
    let comment = data[2];
    let cssClass = "table-success"; // default to IN cell color (green)
    let statusText = "IN"; // default to IN status text

    if (status == 0) { // if the employee is actually OUT, then need to reverse cell color and status text
        cssClass = "table-danger";
        statusText = "OUT"
    }

    let commentRow = '<tr id="">' +
        '<td class=" py-1">' + dateTime + '</td>' +
        '<td class="' + cssClass + '" py-1">' + statusText + '</td>' +
        '<td class=" py-1">' + comment + '</td>' + '</tr>';
    $('#history-table').append(commentRow);
    console.log('Added row to history-table');
}

/**
 * Cycles through each comment in the JSON and sends it to another function to
 * be displayed
 */
function displayHistoryTable(data) {
    let table = JSON.parse(data);

    $("#history-body").remove(); //remove the old data
    $("#history-table").append("<tbody id='" + "history-body'" + "></tbody>");

    console.log('Table length of:' + table.length);
    for (let i = 0; i < table.length; i++) {
        let newRow = [table[i].status_datetime, table[i].status, table[i].comment_text];
        addToHistoryTable(newRow);
    }
}

/**
 * Filters by last name
 */
function filterNamesAdminTable() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("nameFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("time-sheet-table-div");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
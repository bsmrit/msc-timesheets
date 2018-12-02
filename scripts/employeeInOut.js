/**
 * JavaScript for employee check-in page.
 * @author Benjamin Stevens, James Way
 * @version 1.0
 */



var userAction; // will store the action button clicked by the user
// Option 1. Toggle With Comment
// Option 2. Toggle Without Comment
// Option 3. Comment Only

/**
 * On load populate the autofill box by requesting all names from db. Add listeners to employee name submit and status
 * toggle buttons. Also add validation to employee pin field.
 */
$(document).ready(function () {

    populateAutofill(); // go to db, get names, populate autofill
    //document.getElementById("commentCol").style.display = "none"; // hide the comments box on page load

    // listener for employee name submit button -- retrieves employee status from dB
    $("#employeeNameSubmit").on("click", function() {
        //event.preventDefault();

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");

        // get the employee PIN out of text input
        var employeePin = $("#employeePin").val();

        submitEmployee(splitName[0], splitName[1], employeePin);
    });

    // listener for toggling employee status in the database -- works only when button is not disabled
    $(".toggleButton").on("click", function(event) {

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");

        // determine what the comment will be
        let comment;
        if(event.target.id == "toggleWithoutCommentButton") {
            userAction = "Toggle Without Comment";
            comment = ""; // if toggle without comment button was clicked, set comment to empty string
        } else {
            userAction = "Toggle With Comment";
            comment = $("#comment").val(); // else set comment to the input from comment text area
        }

        toggleEmployeeStatus(splitName[0], splitName[1], comment);
    });

    // listener for the comment only button
    $("#commentOnlyButton").on("click", function(event) {

        // set global variable to indicate user elected to enter comment only
        userAction = "Comment Only";

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");

        // get the comment
        let comment = $("#comment").val();

        // call function to write the comment into DB
        writeComment(splitName[0], splitName[1], comment);
    });

    // listener for removing success message if user changes the name in the input box recall that 'input' event fires
    // on ALL character entry, whereas 'change' only fires when you lose focus on the input
    $("#myInput").on("input", function() {
        $("#successText").html("");
        $("#comment").val('');
    });

    // this listener prevents entry into the PIN field that is not the digit 0-9
    // credit: https://stackoverflow.com/questions/18156824/restricting-an-input-box-to-only-numbers-0-9
    document.getElementById('employeePin').addEventListener('keydown', function(e) {
        var key   = e.keyCode ? e.keyCode : e.which;

        if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
                (key >= 96 && key <= 105)
            )) e.preventDefault();
    });

});

/**
 * Executes ajax to toggle employee status in db, and then calls resetPage to toggle page back to original appearance.
 * @param firstName Employee first name.
 * @param lastName Employee last name.
 * @param comment The comment to be entered along with the status update.
 */
function toggleEmployeeStatus(firstName, lastName, comment) {

    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "toggleEmployeeStatusInDB",
            firstName: firstName,
            lastName: lastName,
            comment: comment
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {

            // we will now reset the page to appear as it did on first load -- data returned from ajax indicates
            // whether the employee is now in (1) or out (0) for use by resetPage
            resetPage(data);

        }
    });
}

/**
 * Write comment into DB via ajax without modifying the employee's in/out status.
 * @param firstName Employee first name.
 * @param lastName Employee last name.
 * @param comment Employee comment.
 */
function writeComment(firstName, lastName, comment) {

    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "writeCommentIntoDB",
            firstName: firstName,
            lastName: lastName,
            comment: comment
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {

            // having recorded the commend, reset the page (hide check in/out container, show name submit container)
            resetPage();
        }
    });
}

/**
 * Used after employee status status and/or comment is entered. Posts success message, hides the check in/out
 * container and shows the name submit container.
 */
function resetPage(employeeStatus) {

    // post the success message -- unless user chose to post comment only, use employeeStatus to determine formatting
    // of the success message
    if(userAction == "Toggle With Comment") {
        if(employeeStatus == 0) {
            $("#successText").html("Thank you! You've been checked <i style='color: red'>OUT</i> " +
                "and your comment has been recorded.")
        }
        else {
            $("#successText").html("Thank you! You've been checked <i style='color: limegreen'>IN</i> " +
                "and your comment has been recorded.")
        }

    }
    else if(userAction == "Toggle Without Comment") {
        if(employeeStatus == 0) {
            $("#successText").html("Thank you! You have been checked <i style='color: red'>IN</i>.")
        }
        else {
            $("#successText").html("Thank you! You have been checked <i style='color: limegreen'>OUT</i>.")
        }
    }
    else if(userAction == "Comment Only") {
        $("#successText").html("Thank you! Your comment has been recorded.")
    }

    $("#myInput").val(""); // clear the name input
    $("#employeePin").val(""); // clear employee pin input

    $('#checkInOutContainer').hide(); // switch the container being displayed
    $('#nameSubmitContainer').show();

}

/**
 * Retrieves all employee names from the db and stores in a "combinedNames" array, which is used to populate
 * the name autofill input box.
 */
function populateAutofill() {

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
            var json = JSON.parse(data);

            // create array to store the combined first and last name strings
            var combinedNames = new Array();

            // for each element in the array of json objects, create a combined name in the combinedNames array
            for(var i = 0; i < json.length; i++) {
                combinedNames.push(json[i].first_name + " " + json[i].last_name);
            }

            //this autocomplete function (from W3 Schools -- see below) will implement the autocomplete functionality
            autocomplete(document.getElementById("myInput"), combinedNames);
        }
    });
}

/**
 * Utility function for setting alert and button to show that employee is OUT. This function edits elements in the
 * "check in/out" container (as opposed to the employee name submit container).
 */
function setVisualsEmployeeOut() {

    // set up the header indicating that the employee is OUT
    $("#statusText").attr('style', 'color:red;');
    $("#statusText").html("You are currently OUT");

    // set up the toggle WITHOUT comment button
    $("#toggleWithoutCommentButton").removeClass().addClass("btn radius white");
    $("#toggleWithoutCommentButton").html("Check in");
    $("#toggleWithoutCommentButton").removeAttr("disabled");

    // set up the toggle WITH comment button
    $("#toggleWithCommentButton").removeClass().addClass("btn radius blue white");
    $("#toggleWithCommentButton").html("Check in and submit comment");
    $("#toggleWithCommentButton").removeAttr("disabled");

    // set up the comment only button
    $("#commentOnlyButton").removeClass().addClass("btn radius green-fond white");
    $("#commentOnlyButton").html("Submit comment only");
    $("#commentOnlyButton").removeAttr("disabled");

}

/**
 * Utility function for setting alert and button to show that employee is IN. This function edits elements in the
 * "check in/out" container (as opposed to the employee name submit container).
 */
function setVisualsEmployeeIn() {

    // set up the header indicating that the employee is IN
    $("#statusText").attr('style', 'color:limegreen;');
    $("#statusText").html("You are currently IN");

    // set up the toggle (without comment) button
    $("#toggleWithoutCommentButton").removeClass().addClass("btn radius blue white");
    $("#toggleWithoutCommentButton").html("Check out");
    $("#toggleWithoutCommentButton").removeAttr("disabled");

    // set up the toggle WITH comment button
    $("#toggleWithCommentButton").removeClass().addClass("btn radius blue white");
    $("#toggleWithCommentButton").html("Check out and submit comment");
    $("#toggleWithCommentButton").removeAttr("disabled");

    // set up the comment only button
    $("#commentOnlyButton").removeClass().addClass("btn radius green-fond white");
    $("#commentOnlyButton").html("Submit comment only");
    $("#commentOnlyButton").removeAttr("disabled");

}

/**
 * Utility function for displaying alert to show employee name was invalid. This function edits elements in the
 * "employee name submit" container (as opposed to the check in/out container).
 */
function setVisualsInvalid() {

    var noticeDiv = document.createElement("div");

    noticeDiv.setAttribute('id', 'statusAlert');
    noticeDiv.setAttribute('class', 'alert alert-danger text-center radius');
    noticeDiv.setAttribute('role', 'alert');
    noticeDiv.setAttribute('style', 'width:100%;');
    noticeDiv.innerHTML = "Invalid employee name or PIN";
    $("#alertCol").append(noticeDiv);

}

/**
 * Gets employee status from the database via ajax and if name and pin match records in the DB, changes the name submit
 * container out for the check in/out container.
 * @param firstName Employee first name.
 * @param lastName Employee last name.
 * @param employeePin Employee pin.
 */
function submitEmployee(firstName, lastName, employeePin) {

    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeeStatusFromDB",
            firstName: firstName,
            lastName: lastName,
            employeePin: employeePin
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function(data, status, response) {

            // remove any existing alert, in case a new one is to be added
            $("#statusAlert").remove();

            if (data !== "null") { // if query returned valid status info (name and pin matched record in DB)
                var statusCode = JSON.parse(data).status;

                $('#nameSubmitContainer').hide(); // hide the container that contains the name, pin, and submit button
                $('#checkInOutContainer').show(); // show the check in/out container
                document.getElementById("commentCol").style.display = "block"; // show the comment box

                // set the text and button appearance depending on the current employee status (in or out)
                if(statusCode == 0) { setVisualsEmployeeOut(); }
                else if(statusCode == 1) { setVisualsEmployeeIn(); }
            }
            else { // else query returned null string so show error message
                setVisualsInvalid();
            }
        }
    });
}



// -------------------- START autocomplete from W3 schools --------------------
/**
 * Autocomplete function from W3 Schools.
 * @param inp The text field element to become an autofill.
 * @param arr The array of possible values to be used in the autofill.
 */
function autocomplete(inp, arr) {
    var currentFocus;

    // execute a function when someone writes in the text field:
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    // execute a function when someone presses a key on the keyboard
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    // execute a function when someone clicks in the document
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
// -------------------- END autocomplete from W3 schools --------------------
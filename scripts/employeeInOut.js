/**
 * JavaScript for employee check-in page.
 * @author Benjamin Stevens, James Way
 * @version 1.0
 */

/**
 * On load populate the autofill box by requesting all names from db. Add listeners to employee name submit and status
 * toggle buttons.
 */
$(document).ready(function () {

    populateAutofill(); // go to db, get names, populate autofill
    clock();
    document.getElementById("commentCol").style.display = "none";//Hide the comments box on page load

    // listener for employee name submit button -- will trigger getting employee status from db
    $("#employeeNameSubmit").on("click", function() {
        event.preventDefault();

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");

        getEmployeeStatus(splitName[0], splitName[1]);
    });

    // listener that does exact same thing as when the submit button is clicked, but does it whenever the input box
    // loses focus -- makes the page more responsive
    /* Current not used -- for some reason it interferes with the autofill
    $("#myInput").on("change", function() {
        event.preventDefault();

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");

        getEmployeeStatus(splitName[0], splitName[1]);
    });
    */

    // listener for toggling employee status in the database -- works only when button is not disabled
    $("#toggleButton").on("click", function() {

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");
        var comment = $("#comment").val();
        
        toggleEmployeeStatus(splitName[0], splitName[1], comment);
    });

    // listener for removing alert and disabling check in/out button if user change the name in the input box
    // eliminates the possibility of putting in correct name, hitting submit, changing the name to an incorrect
    // name, and then hitting check in/out button
    // also recall that 'input' event fires on ALL character entry, whereas 'change' only fires when you lose focus
    // on the input
    $("#myInput").on("input", function() {
        $("#statusAlert").remove();
        $("#toggleButton").removeClass().addClass("btn btn-outline-secondary");
        $("#toggleButton").html("Enter name above");
        $("#toggleButton").attr("disabled", "disabled");
        document.getElementById("commentCol").style.display = "none";//Hide the comments box
        $("#comment").val('');
    })

});

/**
 * Executes ajax to toggle employee status in db, and then calls getEmployeeStatus function in order to check
 * the new status and set alert and toggle button appearance to the correct new appearance.
 * @param firstName Employee first name.
 * @param lastName Employee last name.
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

            // now that we've toggled, retrieve the new status and update the page based on new status
            // recall that this function not only gets the status, it changes the alert and button to appropriate
            // in, out, or invalid status
            getEmployeeStatus(firstName, lastName);

        }
    });
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
 * Utility function for setting alert and button to show that employee is OUT.
 */
function setVisualsEmployeeOut() {

    var noticeDiv = document.createElement("div");

    noticeDiv.setAttribute('id', 'statusAlert');
    noticeDiv.setAttribute('class', 'alert alert-info text-center');
    noticeDiv.setAttribute('role', 'alert');
    noticeDiv.setAttribute('style', 'width:100%;');
    noticeDiv.innerHTML = "You are currently OUT";
    $("#alertCol").append(noticeDiv);

    $("#toggleButton").removeClass().addClass("btn btn-success");
    $("#toggleButton").html("Check in");
    $("#toggleButton").removeAttr("disabled");
}

/**
 * Utility function for setting alert and button to show that employee is IN.
 */
function setVisualsEmployeeIn() {

    var noticeDiv = document.createElement("div");

    noticeDiv.setAttribute('id', 'statusAlert');
    noticeDiv.setAttribute('class', 'alert alert-success text-center');
    noticeDiv.setAttribute('role', 'alert');
    noticeDiv.setAttribute('style', 'width:100%;');
    noticeDiv.innerHTML = "You are currently IN";
    $("#alertCol").append(noticeDiv);

    $("#toggleButton").removeClass().addClass("btn btn-info");
    $("#toggleButton").html("Check out");
    $("#toggleButton").removeAttr("disabled");
}

/**
 * Utility function for setting alert and button to show employee name was invalid.
 */
function setVisualsInvalid() {

    var noticeDiv = document.createElement("div");

    noticeDiv.setAttribute('id', 'statusAlert');
    noticeDiv.setAttribute('class', 'alert alert-danger text-center');
    noticeDiv.setAttribute('role', 'alert');
    noticeDiv.setAttribute('style', 'width:100%;');
    noticeDiv.innerHTML = "Invalid employee name";
    $("#alertCol").append(noticeDiv);

    $("#toggleButton").removeClass().addClass("btn btn-outline-secondary");
    $("#toggleButton").html("Enter name above");
    $("#toggleButton").attr("disabled", "disabled");
}

/**
 * Gets employee status from the database via ajax and modifies alert and button to display employee status.
 * @param firstName Employee first name.
 * @param lastName Employee last name.
 */
function getEmployeeStatus(firstName, lastName) {

    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "getEmployeeStatusFromDB",
            firstName: firstName,
            lastName: lastName
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function(data, status, response) {

            // remove any existing alert, since next we'll either be posting a new status alert or error in its place
            $("#statusAlert").remove();

            // QUESTION: Why does ajax return null as string here?
            // If query returned valid status information show employee status
            if (data !== "null") {
                var statusCode = JSON.parse(data).status;
                
                document.getElementById("commentCol").style.display = "block";//Found valid employee show the comments box
                // set the correct alert and button type depending on employee status returned by ajax
                if(statusCode == 0) { setVisualsEmployeeOut(); }
                else if(statusCode == 1) { setVisualsEmployeeIn(); }
            }
            // If query returned null string show error message and deactivate toggle button
            else {
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

function clock() {
    var currentTime = new Date();

    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    console.log(currentHours+":"+currentMinutes);
    $(".clock").html(currentHours+":"+currentMinutes);
    display_c();
}

function display_c() {
    var refresh = 30000; // Refresh rate in milli seconds
    var time= setTimeout('clock()', refresh);
}
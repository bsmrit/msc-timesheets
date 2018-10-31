/**
 * JavaScript for employee check-in page.
 * @author Benjamin Stevens
 * @version 1.0
 */

/**
 * On load populate the autofill box by requesting all names from db. Add listeners to employee name submit and status
 * toggle buttons.
 */
var counter;
$(document).ready(function () {

    populateAutofill(); // go to db, get names, populate autofill
    clock();

    // var input = document.getElementById('myInput');
    // input.addEventListener("input", function (e) {
    //     event.preventDefault();
    //     val = this.value;
    //     counter = val.length;
    //     console.log('counter.length: ' + counter);//-------------------------------
    //
    //     // get name out of text input and split into firstName and lastName variables
    //     var oneCombinedName1 = $("#myInput").val();
    //     console.log("drop down: " + oneCombinedName1);//---------------------------
    //
    //     var splitName = oneCombinedName1.split(" ");
    //     getEmployeeStatus(splitName[0], splitName[1]);
    //
    //     // return counter.length;
    // });

    $(".autocomplete").on("click", function () {
        event.preventDefault();
        getAndCombineNames();
    });

    // listener for employee name submit button -- will trigger getting employee status from db
    // $("#employeeNameSubmit").on("click", function () {
    //     event.preventDefault();
    //
    //     // get name out of text input and split into firstName and lastName variables
    //     var oneCombinedName = $("#myInput").val();
    //     var splitName = oneCombinedName.split(" ");
    //
    //     getEmployeeStatus(splitName[0], splitName[1]);
    // });

    // listener for toggling employee status in the database -- works only when button is not disabled
    $("#toggleButton").on("click", function () {

        // get name out of text input and split into firstName and lastName variables
        var oneCombinedName = $("#myInput").val();
        var splitName = oneCombinedName.split(" ");

        toggleEmployeeStatus(splitName[0], splitName[1]);
    });
});

function getAndCombineNames() {
    var oneCombinedName1 = $("#myInput").val();
    if (oneCombinedName1.length != 0) {
        var splitName = oneCombinedName1.split(" ");
        getEmployeeStatus(splitName[0], splitName[1]);
    }
}

/**
 * Executes ajax to toggle employee status in db, and toggles alert and toggle button appearance.
 * @param firstName Employee first name.
 * @param lastName Employee last name.
 */
function toggleEmployeeStatus(firstName, lastName) {

    $.ajax({
        type: "GET",
        url: "controllers/ajax.php",
        cache: false,
        data: {
            command: "toggleEmployeeStatusInDB",
            firstName: firstName,
            lastName: lastName
        },
        error: function (response, status, error) {
            alert("error: " + error);
        },
        success: function (data, status, response) {

            // remove any alerts that exist
            $("#statusAlert").remove();

            // toggle the visuals on the page to reflect the toggled class
            if ($("#toggleButton").html() == "Check in") {
                setVisualsEmployeeIn();
            }
            else {
                setVisualsEmployeeOut();
            }
        }
    });
}

/**
 * Retrieves all employee names from the db and stores in a "combinedNames" array,
 * which is used to populate the name autofill input box.
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
            for (var i = 0; i < json.length; i++) {
                combinedNames.push(json[i].first_name + " " + json[i].last_name);
            }

            //If there is input call autocomplete and checkName functions
            var inp = document.getElementById("myInput");
            if (inp != null) {
                autocomplete(inp, combinedNames);
                checkNames(inp);
            }

            arrayOfArrays.push("empty");
            arrayOfArrays.push(combinedNames);
        }
    });
}

/**
 * Utility function for setting alert and button to show that employee is OUT.
 */
function setVisualsEmployeeOut() {

    var noticeDiv = document.createElement("div");

    noticeDiv.setAttribute('id', 'statusAlert');
    noticeDiv.setAttribute('class', 'text-center my-3 radius');
    // noticeDiv.setAttribute('role', 'alert');
    noticeDiv.setAttribute('style', 'width:100%;');
    noticeDiv.innerHTML = "You are currently OUT";
    $("#alertCol").append(noticeDiv);

    $("#toggleButton").removeClass().addClass("btn btn-success radius");
    $("#toggleButton").html("Check in");
    // $("#toggleButton").removeAttr("disabled");
    $('#toggleButton:hidden').show("fast");
}

/**
 * Utility function for setting alert and button to show that employee is IN.
 */function setVisualsEmployeeIn() {

    var noticeDiv = document.createElement("div");

    noticeDiv.setAttribute('id', 'statusAlert');
    noticeDiv.setAttribute('class', 'text-center my-3 radius');
    // noticeDiv.setAttribute('role', 'alert');
    noticeDiv.setAttribute('style', 'width:100%;');
    noticeDiv.innerHTML = "You are currently IN";
    $("#alertCol").append(noticeDiv);

    $("#toggleButton").removeClass().addClass("btn btn-info radius");
    $("#toggleButton").html("Check out");
    // $("#toggleButton").removeAttr("disabled");
    $('#toggleButton:hidden').show("fast");
}


/**
 * Utility function for setting alert and button to show employee name was invalid.
 */
function setVisualsInvalid() {
    // var noticeDiv = document.createElement("div");
    // noticeDiv.setAttribute('id', 'statusAlert');
    // noticeDiv.setAttribute('class', 'statusAlert text-center radius');
    // noticeDiv.setAttribute('style', 'width:100%;');
    // noticeDiv.setAttribute('style', 'color:red;');
    // noticeDiv.innerHTML = "Invalid employee name";
    $("#statusAlert").show('fast');
    // $("#alertCol").append(noticeDiv);
    $("#myInput").attr('style', 'border-color:red;');
    // $("#toggleButton").removeClass().addClass("btn btn-outline-secondary radius");
    // $("#toggleButton").html("Enter name above");
    // $("#toggleButton").attr("disabled", "disabled");
    // $('#toggleButton:hidden').show("fast");
}

/**
 * Gets employee status from the database via ajax and modifies alert and
 * button to display employee status.
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
        success: function (data, status, response) {

            // remove any existing alert, since next we'll either be posting a new status alert or error in its place
            $("#statusAlert").remove();

            // QUESTION: Why does ajax return null as string here?
            // If query returned valid status information show employee status
            if (data !== "null") {
                var statusCode = JSON.parse(data).status;

                // set the correct alert and button type depending on employee status returned by ajax
                if (statusCode == 0) {
                    setVisualsEmployeeOut();
                }
                else if (statusCode == 1) {
                    setVisualsEmployeeIn();
                }
            }
            // If query returned null string show error message and deactivate toggle button
            // else {
            //     setVisualsInvalid();
            // }
        }
    });
}


var arrayWithMatch = [];
var arrayOfArrays = [];//arrayOfArrays[0]

// let letterMatcher = true;

// let intialArray = [];

/**
 * Defines where must be displayed alert - Invalid employee name ".
 * @param inp The text field element to become an autofill.
 */
function checkNames(inp) {
    // execute a function when someone writes in the text field:
    inp.addEventListener("input", function (e) {
        var val = this.value;
        console.log("--------------------------");
        for (i = 0; i < arrayOfArrays[val.length].length; i++) {

            if (val.length == 0) {
                console.log("ZERO");
                // console.log("current array: " + arrayWithMatch);
                // arrayWithMatch = arrayOfArrays[1];
                return;
            }
            // else if (arrayWithMatch.length == 0) {
            //     // console.log("equal");
            //     getAndCombineNames();
            //     $(".autocomplete-items").remove();
            //     return;
            // }
            else if (val.toUpperCase().charAt(val.length - 1) == arrayOfArrays[val.length][i].toUpperCase().charAt(val.length - 1)) {
                // console.log("val: " + val.toUpperCase().charAt(val.length-1));
                // console.log("arr[i]: " + intialArray[i].toUpperCase().charAt(val.length-1));
                arrayWithMatch.push(arrayOfArrays[val.length][i]);
                // console.log(arrayWithMatch);
                // letterMatcher = false;
            }
            // if (intialArray[i].toUpperCase().includes(val.toUpperCase())) {
            //     // console.log("contains");
            //
            // }
            // if (!intialArray[i].toUpperCase().includes(val.toUpperCase())) {
            //     // console.log("does not contain");
            //
            // }
        }
        console.log("arrayWithMatch: " + arrayWithMatch);
        console.log("arrayWithMatch length: " + arrayWithMatch.length);
        console.log("arrayOfArrays BEFORE: " + arrayOfArrays);

        if (arrayWithMatch.length == 0) {
            return;
            console.log('added aeny away');
            arrayOfArrays[val.length + 1] = arrayWithMatch;
        }

        console.log("current array: " + arrayOfArrays[val.length]);
        console.log("arrayOfArrays AFTER: " + arrayOfArrays);
        arrayWithMatch = [];
        console.log("num of names in array: " + arrayOfArrays[val.length].length);
        console.log("num of letters: " + val.length);

        if (arrayOfArrays[val.length].length == 0 && val.length > 0) {
            console.log("opps");
            setVisualsInvalid();
        }

        /*close any already open lists of autocompleted values*/
        if (!val) {
            removeVisualsEmployeeOut();
            return false;
        }
    })
}

function autocomplete(inp, arr) {
    var currentFocus;

    // execute a function when someone writes in the text field:
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            removeVisualsEmployeeOut();
            return false;
        }
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
                b.addEventListener("click", function (e) {
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
    inp.addEventListener("keydown", function (e) {
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
    var refresh = 1000; // Refresh rate in milli seconds
    var time= setTimeout('clock()', refresh);
}


/**
 * Utility function for remove alert and button to show that employee is OUT.
 */
function removeVisualsEmployeeOut() {
    // console.log("removed");
    $("#statusAlert").remove();

    $("#toggleButton").html("");
    $('#toggleButton').hide("fast");
    $(".statusAlert").hide('fast');
    $("#myInput").attr('style', 'border-color:none;');
}



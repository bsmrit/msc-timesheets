/**
 * This file handles Reception Javascript.
 * @author James Way
 * @version 1.0
 */

$(document).ready(function () {
    getEmployees();
    setInterval(function () {
        $('#tableData').html(getEmployees());
    }, 10000)
});

/**
 * Pulls the employee names and their status via ajax request
 */
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

/**
 * Accepts an employee and the current number they will appear on the list as
 * then displays them to the dom either green if they're in, or red if out
 */
function addToTable(data) {
    let firstName = data[0];
    let lastName = data[1];
    let empStatus = data[2];
    let dateTime = data[3];
    let comments = data[4];
    let cssClass = "table-danger";

    if (empStatus == 0) {
        empStatus = "Out";
    }
    else {
        empStatus = "In";
        cssClass = "table-success";
    }

    // reformat time from unix time to a datetime string
    let options = {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'};
    let formattedDate = new Date(dateTime * 1000).toLocaleString([], options);
    
    let employee = '<tr class="" id="">' +
        '<td class=" py-1">' + lastName + '</td>' +
        '<td class=" py-1">' + firstName + '</td>' +
        '<td class=" py-1 ' + cssClass + '">' + empStatus + '</td>' +
        '<td class=" py-1">' + formattedDate + '</td>' +
        '<td class=" py-1">' + comments + '</td>' + '</tr>';
    $('#employeeTable').append(employee);
}

/**
 * Cycles through each employee in the JSON and sends it to another function to
 * be displayed
 */
function displayTable(data) {
    let table = JSON.parse(data);
    console.log(table);
    $("#tableData").remove(); //remove the old data
    $("#employeeTable").append("<tbody id='" + "tableData'" + "></tbody>");

    // Add a new table row
    for (let i = 0; i < table.length; i++) {
        let newRow = [table[i].first_name, table[i].last_name, table[i].empStatus, table[i].status_datetime, table[i].comments];
        addToTable(newRow);
    }
    if (document.getElementById("nameFilter") !== '') {
        filterNames();
    }
    sortTable(0);
}


/**
 * Filters by first & last name
 */
function filterNames() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("nameFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        tdLastName = tr[i].getElementsByTagName("td")[0];
        tdFirstName = tr[i].getElementsByTagName("td")[1];
        if (tdLastName || tdFirstName) {
            if ((tdLastName.innerHTML.toUpperCase().indexOf(filter) > -1) || (tdFirstName.innerHTML.toUpperCase().indexOf(filter) > -1)){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/**
 * Sorts the table by clicking a column
 * Code from w3schools
 */
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("employeeTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
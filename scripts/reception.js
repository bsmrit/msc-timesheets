/**
 * This file handles Reception Javascript.
 * @author James Way
 * @version 1.0
 */

$(document).ready(function () {
    getEmployees();
    setInterval(function(){
       $('#tableData').html(getEmployees());
    }, 10000)
});

/**
 * Pulls the emmployee names and their status via ajax request
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
function addToTable(currentNum, data) {
    let firstName = data[0];
    let lastName = data[1];
    let empStatus = data[2];
    let comments = data[3];
    let cssClass = "table-danger";
    
    if(empStatus == 0) {;
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
        '<td class=" py-1">' + empStatus + '</td>' +
        '<td class=" py-1">' + comments + '</td>' + '</tr>';
    $('#employeeTable').append(employee);
}

/**
 * Cycles through each employee in the JSON and sends it to another function to 
 * be displayed
 */
function displayTable(data) {
    let table = JSON.parse(data);
    $("#tableData").remove(); //remove the old data
    $("#employeeTable").append("<tbody id='" + "tableData'" + "></tbody>");
    
    for (let i = 0; i < table.length; i++) {
        let newRow = [table[i].first_name, table[i].last_name, table[i].empStatus, table[i].comments];
        addToTable(i + 1, newRow);
    }
    if(document.getElementById("nameFilter") !== '') {
        filterNames();
    }
}

function filterNames() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("nameFilter");
  filter = input.value.toUpperCase();
  table = document.getElementById("employeeTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
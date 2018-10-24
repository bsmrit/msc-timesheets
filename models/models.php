<?php
/**
 * Provides model functions for MSC Timesheets web app.
 *
 * @author Benjamin Stevens, James Way, Dmitry Yushchev
 * @version 1.0
 */


/**
 * Get connection details for db connection.
 * @return mysqli connection object
 */
function getConnection() {
    $user = 'drunkin1_user';
    $pass = ';q)([Ict**Qb';
    $host = 'localhost';
    $database = 'drunkin1_timesheets';
    $connection = mysqli_connect($host, $user, $pass, $database);
    //if we get a false value, something went wrong
    if(!$connection) {
        echo 'Error connection to DB: ' . mysqli_connect_error();
        exit;
    }
    return $connection;
}

/**
 * Adds a new employee to db.
 * @param $fName employee's first name.
 * @param $lName employee's last name.
 */
function setNewEmployee($fName, $lName) {
    $connection = getConnection();
    $id = $_SESSION['id'];

    //query to insert data to db
    // BEN: does this work even though you're not setting status and admin??
    $query = "INSERT INTO time_sheets (first_name, last_name) VALUES('$fName', '$lName')";
    $results = mysqli_query($connection, $query);

    //check result
    if(!$results) {
        echo 'List not inserted.';
        exit;
    }
}

/**
 * General function to pull all employees and their status from the DB.
 * @return array Employee first and last names and statuses.
 */
function getEmployees() {
    $connection = getConnection();
    $id = $_SESSION['id'];
    
    //query to get data from db
    $query = "SELECT first_name, last_name, status AS 'empStatus' FROM time_sheets";
    $results = mysqli_query($connection, $query);
    
    $arrayOfEmployees = array();
    while($row = mysqli_fetch_assoc($results)) {
        $arrayOfEmployees[] = $row;
    }
    //free up server resources
    mysqli_free_result($results);
    return $arrayOfEmployees;
}

/**
 * Returns all employee first and last names.
 * @return array Employee first and last names.
 */
function getEmployeeNames() {
    $connection = getConnection();
    $id = $_SESSION['id'];

    //query to insert data to db
    $query = "SELECT first_name, last_name FROM time_sheets";
    $results = mysqli_query($connection, $query);

    $arrayOfEmployees = array();
    while($row = mysqli_fetch_assoc($results)) {
        $arrayOfEmployees[] = $row;
    }
    //free up server resources
    mysqli_free_result($results);
    return $arrayOfEmployees;
}

/**
 * Returns status for a single given employee (or all employees with given first and last names).
 * @param $fName Employee's first name.
 * @param $lName Employee's last name.
 * @return array|null Single status in single entry array.
 */
function getEmployeeStatus($fName, $lName) {
    $connection = getConnection();
    $id = $_SESSION['id'];

    //query to insert data to db
    $query = "SELECT status FROM time_sheets WHERE first_name = '$fName' AND last_name = '$lName'";
    $results = mysqli_query($connection, $query);

    $status = mysqli_fetch_assoc($results);
    return $status;
}

/**
 * Toggles the status of the given employee (if IN toggles to OUT and vice versa).
 * @param $fName Employee's first name.
 * @param $lName Employee's last name.
 * @return array|null Execution result as single entry in array.
 */
function toggleEmployeeStatus($fName, $lName) {
    $connection = getConnection();

    //query to toggle employee status
    $query = "UPDATE time_sheets SET status = !status WHERE first_name = '$fName' AND last_name = '$lName'";
    $results = mysqli_query($connection, $query);

    $result = mysqli_fetch_assoc($results);
    return $result;
}

?>
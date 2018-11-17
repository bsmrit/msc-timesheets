<?php
/**
 * Ajax controller for MSC Timesheets web app.
 *
 * @author Benjamin Stevens, James Way, Dmitry Yushchev
 * @version 1.0
 */

require '../models/models.php';


    // Ajax command switch to direct to the correct function below
    switch($_GET['command']) {
        case 'insertNewEmployeeToDB':
            ajaxInsertNewEmployeeToDB();
            break;
        case 'getEmployeeNamesFromDB':
            ajaxGetEmployeeNamesFromDB();
            break;
        case 'getEmployeeStatusFromDB':
            ajaxGetEmployeeStatusFromDB();
            break;
        case 'getEmployeesFromDB':
            ajaxGetEmployeesFromDB();
            break;
        case 'toggleEmployeeStatusInDB':
            ajaxToggleEmployeeStatusInDB();
            break;
        case 'getEmployeeDataById':
            ajaxGetEmployeeDataById();
            break;
        case 'updateEmployeeInDb':
            ajaxUpdateEmployeeInDb();
            break;
        case 'deleteEmployeeInDB':
            ajaxDeleteEmployeeInDB();
            break;
    }

    // BEGIN FUNCTIONS

    /**
     * Get all employee names from the db and echo as json encoded array.
     */
    function ajaxGetEmployeeNamesFromDB() {
        $employeeArray = getEmployeeNames();
        echo json_encode($employeeArray);
    }

    /**
     * Insert a new employee into db.
     */
    function ajaxInsertNewEmployeeToDB() {
        $firstName = $_GET['firstName'];
        $lastName = $_GET['lastName'];
        $admin=$_GET['admin'];
        $loginName=$_GET['loginName'];
        $password=$_GET['password'];
        $pin=$_GET['pin'];

        $lastId = setNewEmployee($firstName, $lastName, $admin, $loginName, $password, $pin);

        echo $lastId;
    }

    /**
     * Get status of a single employee and echo as json encoded array.
     */
    function ajaxGetEmployeeStatusFromDB() {
        $firstName = $_GET['firstName'];
        $lastName = $_GET['lastName'];

        $employeeStatus = getEmployeeStatus($firstName, $lastName);

        echo json_encode($employeeStatus);
    }

    /**
     * Toggle status of a single employee and echo execution result.
     */
    function ajaxToggleEmployeeStatusInDB() {
        $firstName = $_GET['firstName'];
        $lastName = $_GET['lastName'];
        $comment = $_GET['comment'];

        $result = toggleEmployeeStatus($firstName, $lastName, $comment);

        echo json_encode($result);
    }

    /**
     * Get all employee names and status and echo as json encoded array.
     */
    function ajaxGetEmployeesFromDB() {
        $employeeArray = getEmployees();
        echo json_encode($employeeArray);
    }

    function ajaxDeleteEmployeeInDB() {
        $employeeId = $_GET['employeeId'];
        $result = deleteEmployee($employeeId);
        echo json_encode($result);
    }

    function ajaxGetEmployeeDataById(){
        $employeeId = $_GET['employeeId'];
        $result = getEmployeeDataById($employeeId);
        echo json_encode($result);
    }

    function ajaxUpdateEmployeeInDb(){
        $firstName = $_GET['firstName'];
        $lastName = $_GET['lastName'];
        $admin=$_GET['admin'];
        $loginName=$_GET['loginName'];
        $password=$_GET['password'];
        $employeeId=$_GET['employeeId'];
        $pin=$_GET['pin'];
        $result = updateEmployeeInDb($firstName, $lastName, $admin, $loginName, $password, $employeeId, $pin);
        echo json_encode($result);

    }

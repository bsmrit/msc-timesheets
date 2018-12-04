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

        // if we get a false value, something went wrong
        if(!$connection) {
            echo 'Error connection to DB: ' . mysqli_connect_error();
            exit;
        }
        return $connection;
    }

    /**
     * Adds a new employee to db.
     * @param $fName Employee's first name.
     * @param $lName Employee's last name.
     * @param $admin Integer code (0, 1, 2) indicating the user type.
     * @param $loginName Employee's username provide if admin or receptionist.
     * @param $password Employee's password provided if admin or receptionist.
     * @param $pin Employee's pin.
     * @return int $lastId The id of the new employee just inserted.
     */
    function setNewEmployee($fName, $lName, $admin, $loginName, $password, $pin) {
        $connection = getConnection();

        // query to insert data to db
        $query = "INSERT INTO time_sheets (first_name, last_name, admin, username, password, pin) 
                      VALUES('$fName', '$lName', '$admin', '$loginName', '$password', '$pin')";
        $results = mysqli_query($connection, $query);

        // check result
        if(!$results) {
            echo 'List not inserted.';
            exit;
        }

        // get the id of the employee just inserted and return it
        $lastId = mysqli_insert_id($connection);
        return $lastId;
    }

    /**
     * Pulls all employee names, statuses, latest comment, ids, and pins from the DB.
     * @return array Employee first and last names and statuses.
     */
    function getEmployees() {
        $connection = getConnection();

        //query to get data from db
        $query = "SELECT first_name, last_name, status AS 'empStatus', comments, id, pin, status_datetime
                  FROM time_sheets";
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

        //query to insert data to db
        $query = "SELECT first_name, last_name, admin, username, id , pin FROM time_sheets";
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
     * Returns status for a single given employee, given their first and last names and pin.
     * @param $fName Employee's first name.
     * @param $lName Employee's last name.
     * @param $pin Employee's pin.
     * @return array|null Single status in single entry array.
     */
    function getEmployeeStatus($fName, $lName, $pin) {
        $connection = getConnection();

        //query to insert data to db
        $query = "SELECT status FROM time_sheets WHERE first_name = '$fName' AND last_name = '$lName' AND pin = $pin";
        $results = mysqli_query($connection, $query);

        $status = mysqli_fetch_assoc($results);
        return $status;
    }

    /**
     * Toggles the status of the given employee (if IN toggles to OUT and vice versa).
     * @param $fName Employee's first name.
     * @param $lName Employee's last name.
     * @param $comment Employee's comment.
     * @return int $newStatus Employee's new status after having been toggled.
     */
    function toggleEmployeeStatus($fName, $lName, $comment) {
        $connection = getConnection();

        // determine the employee's current status
        $query = "SELECT id, status FROM time_sheets WHERE first_name = '$fName' AND last_name = '$lName'";
        $result = mysqli_query($connection, $query);
        $resultArray = mysqli_fetch_assoc($result);
        $employeeId = $resultArray['id'];
        $employeeStatus = $resultArray['status'];

        // determine what new status should be based on current status
        if($employeeStatus == 0) {
            $newStatus = 1;
        } else {
            $newStatus = 0;
        }

        // save the current unix timestamp for use in both queries below (so it matches exactly)
        $unix_timestamp = time();

        // update the history table with new record
        $query = "INSERT INTO employee_status (status_datetime, comment_text, status, employee_id)
                            VALUES ($unix_timestamp, '$comment', $newStatus, $employeeId)";
        @mysqli_query($connection, $query);

        // update the most current info table
        $query = "UPDATE time_sheets SET status = $newStatus, comments = '$comment', status_datetime = $unix_timestamp
                                WHERE id = $employeeId";
        @mysqli_query($connection, $query);

        return $newStatus;
    }

    /**
     * Retrieves employee information given an employee id.
     * @param $employeeId Employee's id.
     * @return array|null An array containing employee information.
     */
    function getEmployeeDataById($employeeId) {
        $connection = getConnection();

        //query to insert data to db
        $query = "SELECT first_name, last_name, admin, username, password, id, pin FROM time_sheets 
                              WHERE id = '$employeeId'";
        $result = @mysqli_query($connection, $query);
        $data = @mysqli_fetch_row($result);

        return $data;
    }

    /**
     * Retrieves the comment history of a single employee.
     * @param $empId Employee's id.
     * @return array $arrayOfComments Lists all comments for a single employee
     */
    function getEmployeeStatusHistory($empId) {
        $connection = getConnection();

        //query to get data from db
        $query = "SELECT status_datetime, status, comment_text FROM employee_status  WHERE employee_id = '$empId'";
        $results = mysqli_query($connection, $query);

        $arrayOfComments = array();
        while($row = mysqli_fetch_assoc($results)) {
            $arrayOfComments[] = $row;
        }

        //free up server resources
        mysqli_free_result($results);

        return $arrayOfComments;
    }

    /**
     * Updates employee information for a given employee id.
     * @param $firstName Employee's first name.
     * @param $lastName Employee's last name.
     * @param $admin Employee's user type.
     * @param $loginName Employee's username.
     * @param $password Employee's password.
     * @param $employeeId Employee's id (used to determine the record to be updated).
     * @param $pin Employee's pin.
     * @return array|bool|null Employee data for employee just updated.
     */
    function updateEmployeeInDb($firstName, $lastName, $admin, $loginName, $password, $employeeId, $pin) {
        $connection = getConnection();

        //query to insert data to db
        $query = "UPDATE time_sheets SET first_name='$firstName', last_name='$lastName', 
                  admin = $admin, username='$loginName', password='$password', pin='$pin' WHERE id='$employeeId'";
        $result = @mysqli_query($connection, $query);
        if($result) {
            return getEmployeeDataById($employeeId);
        } else {
            return false;
        }
    }

    /**
     * Writes a comment into DB for given employee.
     * @param $fName Employee's first name.
     * @param $lName Employee's last name.
     * @param $comment Employee's comment.
     * @return bool|mysqli_result
     */
    function writeComment($fName, $lName, $comment) {
        $connection = getConnection();

        // find the employeeId
        $query = "SELECT id FROM time_sheets WHERE first_name = '$fName' AND last_name = '$lName'";
        $result = @mysqli_query($connection, $query);
        $resultArray = @mysqli_fetch_assoc($result);
        $employeeId = $resultArray['id'];

        // get the employee status using the employee id
        $query = "SELECT status FROM time_sheets WHERE id = $employeeId";
        $result = @mysqli_query($connection, $query);
        $resultArray = @mysqli_fetch_assoc($result);
        $employeeStatus = $resultArray['status'];

        // save the current unix timestamp for use in both queries below (so it matches exactly)
        $unix_timestamp = time();

        // query to insert new comment into the DB
        // first update the time_sheets table to reflect the latest comment
        $query = "UPDATE time_sheets SET comments = '$comment', status_datetime = $unix_timestamp 
                                WHERE id = $employeeId";
        @mysqli_query($connection, $query);

        // next update the employee_status table to store comment as part of employee history
        $query = "INSERT INTO employee_status (status_datetime, status, comment_text, employee_id) 
                    VALUES ($unix_timestamp, $employeeStatus, '$comment', $employeeId)";
        $result = @mysqli_query($connection, $query);
        return $result;

    }

    /**
     * Deletes an employee.
     * @param $employeeId ID of employee to be deleted.
     * @return bool
     */
    function deleteEmployee($employeeId) {
        $connection = getConnection();

        //query to delete the employee
        $query = "DELETE FROM time_sheets WHERE id = '$employeeId'";
        $result = mysqli_query($connection, $query);

        if($result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Validates the user input data and displays errors if it is needed.
     * @return array of errors or null of no errors
     */
    $errors = array();
    function loginData() {
        global $errors;
        $_SESSION['id'] = false;

        $user = $_POST['user'];
        $password = $_POST['password'];

        if($_POST['login'] == 'login') {

            checkName($user); // validate email
            checkPassword($password); // validate password

            if(empty($errors)) { // in no errors

                //get hashed password from db
                $query = "SELECT id, username, password, admin FROM time_sheets WHERE username='$user'";
                $result = @mysqli_query(getConnection(), $query);
                $data = @mysqli_fetch_row($result);


                if($result) { // Query ran OK
                    $_SESSION['id'] = $data[0]; // $data[0] is the id retrieved from DB

                    // check if provided password matches DB password AND if the user is an admin
                    if($password == $data[2] && $data[3] == 1) { // ADMIN

                        $_SESSION['id'] = $data[0]; // assign a session variable for the user id
                        $_SESSION['usertype'] = "admin";
                        return 1; // return 1 means successfully logged an admin in

                    } elseif($password == $data[2] && $data[3] == 2) { // RECEPTIONIST

                        $_SESSION['id'] = $data[0]; // assign a session variable for the user id
                        $_SESSION['usertype'] = "receptionist";
                        return 2; // return 2 means successfully logged a receptionist in

                    } else { // password did not match OR the user is not an admin

                        return 0;
                    }
                } else { // this else is for if the query was not successful
                    return 0;
                }
            } else { // this else is for if the basic validation (not password verification) did not pass
                return 0;
            }
        }
        return 0;
    }

    /**
     * Validate the user name
     * @param $data string that represents user email
     */
    function checkName($data) {
        global $errors;
        if(empty($data)) {
            $errors[] = 'You forgot to enter user name';
        } else {
            if(strlen($data) < 3 || strlen($data) > 10) {
                $errors[] = 'password must be 3-10 characters';
            } else {
                $data = mysqli_real_escape_string(getConnection(), trim($data));
            }
        }
    }

    /**
     * Validate the password
     * @param $data string that represents user password
     */
    function checkPassword($data) {
        global $errors;

        if(empty($data)) {
            $errors[] = 'You forgot to enter password';
        } else {
            if(strlen($data) < 3 || strlen($data) > 10) {
                $errors[] = 'password must be 3-10 characters';
            }
            //            if(preg_match('/[A-Z]/', $data) == 0 && preg_match('/[a-z]/', $data) == 0) {
            //                $errors[] = 'password must contain lowercase and uppercase letters';
            //            }
            //            if(preg_match('/[0-9]/', $data) == 0) {
            //                $errors[] = 'password must contain numbers';
            //            }
            //            if(preg_match('/[^a-zA-Z\d]/', $data) == 0) {
            //                $errors[] = 'password must contain -=[]\;,./~!@#$%^&*()_+{}|:<>?';
            //        }
            else {
                $data = mysqli_real_escape_string(getConnection(), trim($data));
            }
        }
    }

?>
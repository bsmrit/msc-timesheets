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
     * @return $lastId the id of the new employee just inserted
     */
    function setNewEmployee($fName, $lName, $admin, $loginName, $password, $pin) {
        $connection = getConnection();
        $id = $_SESSION['id'];

        //query to insert data to db
        // BEN: does this work even though you're not setting status and admin??
        $query = "INSERT INTO time_sheets (first_name, last_name, admin, username, password, pin) VALUES('$fName', '$lName', '$admin', '$loginName', '$password', '$pin')";
        $results = mysqli_query($connection, $query);

        //check result
        if(!$results) {
            echo 'List not inserted.';
            exit;
        }

        // get the id of the employee just inserted and return it
        $lastId = mysqli_insert_id($connection);
        return $lastId;
    }

    /**
     * General function to pull all employees and their status from the DB.
     * @return array Employee first and last names and statuses.
     */
    function getEmployees() {
        $connection = getConnection();
        $id = $_SESSION['id'];

        //query to get data from db
        $query = "SELECT first_name, last_name, status AS 'empStatus', comments, id, pin FROM time_sheets";
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
//        $id = $_SESSION['id'];

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
    function toggleEmployeeStatus($fName, $lName, $comment) {
        $connection = getConnection();

        //query to toggle employee status
        $query = "UPDATE time_sheets SET status = !status, comments = '$comment' WHERE first_name = '$fName' AND last_name = '$lName'";
        $results = mysqli_query($connection, $query);

        $result = mysqli_fetch_assoc($results);
        return $result;
    }

    function getEmployeeDataById($employeeId) {
        $connection = getConnection();

        //query to insert data to db
        $query = "SELECT first_name, last_name, admin, username, password, id, pin FROM time_sheets WHERE id = '$employeeId'";
        $result = @mysqli_query($connection, $query);
        $data = @mysqli_fetch_row($result);

        return $data;
    }

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
     * Validates the user input data and displays errors if it is needed
     * @return array of errors or null of no errors
     */
    $errors = array();
    function loginData() {
        global $errors;
        $_SESSION['id'] = false;

        $user = $_POST['user'];
        $password = $_POST['password'];
        //        echo "user+pass: " . $user . " "; // TEST CODE
        //        echo $password; // TEST CODE

        if($_POST['login'] == 'login') {

            checkName($user); // validate email
            checkPassword($password); // validate password

            if(empty($errors)) { // in no errors
                //                echo " passed validation ";

                //get hashed password from db
                $query = "SELECT id, username, password, admin FROM time_sheets WHERE username='$user'";
                $result = @mysqli_query(getConnection(), $query);
                $data = @mysqli_fetch_row($result);

                if($result) { // Query ran OK
                    $_SESSION['id'] = $data[0]; // $data[0] is the id retrieved from DB

                    //                    echo "password provided: ".$password."; "; // TEST CODE
                    //                    echo "data[0] (which is true password from DB): ".$data[2]; // TEST CODE

                    // check if provided password matches DB password AND if the user is an admin
                    // if so, assign session variables
                    if($password == $data[2] && $data[3] == 1) {
                        //                        echo " password matched and user is an admin!!! ";
                        $_SESSION['id'] = $data[0]; // assign a session variable for the user id
                        $_SESSION['usertype'] = "admin";
                        //echo "The session 'id' is: " . $_SESSION['id']; // TEST CODE
                        //echo "The usertype is: " . $_SESSION['usertype']; // TEST CODE
                        return 1; // return 1 means successfully logged an admin in
                    } elseif($password == $data[2] && $data[3] == 2) {
                        //echo " password matched and user is an receptionist!!! ";
                        $_SESSION['id'] = $data[0]; // assign a session variable for the user id
                        $_SESSION['usertype'] = "receptionist";
                        //echo "The session 'id' is: " . $_SESSION['id']; // TEST CODE
                        //echo "The usertype is: " . $_SESSION['usertype']; // TEST CODE
                        return 2; // return 1 means successfully logged an admin in
                    } else { // password did not match OR the user is not an admin
                        //                        echo " password DID NOT match OR user is NOT an admin ";
                        // lines below commented out for now -- later will be used to return specific error info
                        // $errors[] = 'Please check your email and password or try to register.';
                        // return reportErrors($errors);
                        return 0;
                    }
                } else { // this else is for if the query was not successful
                    return 0;
                }
            } else { // this else is for if the basic validation (not password verification) did not pass
                echo " NOT passed validation ";
                return 0;
            }
        }
        return 0;
    }

    //                else {
    //                    // If it did not run OK a Public message displayed
    ////                    require '../views/publicErrorMessage.php';
    //
    //                    // Debugging message:
    //                    echo '<p class="">' . mysqli_error(getConnection()) . '<br><br>Query: ' . $query . '</p>';
    //                }
    //                mysqli_close(getConnection()); // Close the database connection.
    //                exit();
    //            }
    //            else {
    //                // Report the errors.
    //                // return reportErrors($errors);
    //
    ////                return false;

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
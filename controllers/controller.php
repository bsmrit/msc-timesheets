<?php
    /**
     * Main controller for MSC Timesheets web app.
     *
     * @author Benjamin Stevens, James Way, Dmitry Yushchev
     * @version 1.0
     */

    function getWelcomePage() {

        // show the view
        echo Template::instance()->render('views/welcome.php');
    }

    function displayEmployeeInOut($fatFree) {

        // set variable for view to know whether user is admin
        $fatFree->set('usertype', $_SESSION['usertype']);

        // show the view
        echo Template::instance()->render('views/employeeInOut.php');
    }

    function getReceptionPage() {

        // show the view
        echo Template::instance()->render('views/reception.php');
    }

    function displaySignOut() {

        // show the view
        echo Template::instance()->render('views/signOut.php');
    }

    /**
     * Gathers data needed and shows the error on the welcome view using the Template class
     * or redirect to personal view
     * @param object $fatFree Fat-Free framework
     */
    function getLoginData($fatFree) {
        
        //gather up the data needed
        $result = loginData();
        if($result == 0) { //display errors
            //set variables for displaying errors
            //            $fatFree->set('block', $result[0]);
            //            $fatFree->set('reportErrors', $result[1]);

            //show the view
            echo Template::instance()->render('views/employeeInOut.php');
        } else { //no errors redirect to personal personal route

            //set pageTitle
            //            $fatFree->set('pageTitle', 'Personal');

            //show the view
            echo Template::instance()->render('views/welcome.php');
            //header('location: welcome.php');
        }
    }

?>
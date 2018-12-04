<?php
    /**
     * Main controller for MSC Timesheets web app.
     *
     * @author Benjamin Stevens, James Way, Dmitry Yushchev
     * @version 1.0
     */

    function getWelcomePage($fatFree) {

        // set variable for view to know whether user is admin
        $fatFree->set('usertype', $_SESSION['usertype']);
        // show the view
        echo Template::instance()->render('views/welcome.php');
    }

    function displayEmployeeInOut($fatFree) {

        // set variable for view to know whether user is admin
        $fatFree->set('usertype', $_SESSION['usertype']);

        // show the view
        echo Template::instance()->render('views/employeeInOut.php');
    }

    function getReceptionPage($fatFree) {

        // set variable for view to know whether user is admin
        $fatFree->set('usertype', $_SESSION['usertype']);

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

        // set variable for view to know whether user is admin
        $fatFree->set('usertype', $_SESSION['usertype']);

        if($result == 0) { //display errors
            $fatFree->set('login_failed', true);
            echo Template::instance()->render('views/employeeInOut.php');
        } elseif($result == 1) { //route to admin page, logged in as admin
            echo Template::instance()->render('views/welcome.php');
        } elseif($result == 2) { //route to reception page, logged in as receptionist
            echo Template::instance()->render('views/reception.php');
        }
    }

?>
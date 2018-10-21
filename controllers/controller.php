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

    function displayEmployeeInOut() {

        // show the view
        echo Template::instance()->render('views/employeeInOut.php');
    }
    
    function getReceptionPage() {

        // show the view
        echo Template::instance()->render('views/reception.php');
    }

?>
<?php
/**
 * index.php for MSC Timesheets web app. All requests will reach this file first and be directed by fatFree routes.
 *
 * @author Benjamin Stevens, James Way, Dmitry Yushchev
 * @version 1.0
 */

    // turn on global settings
    session_start();

    // global includes
    require 'controllers/controller.php';
    require 'models/models.php';


    // load the fatFree framework
    $fatFree = require 'vendor/bcosca/fatfree-core/base.php';

    // set fatFree to display errors
    $fatFree->set('ONERROR', function($fatFree) {
        echo $fatFree->get('ERROR.text');
    });

    // *** ROUTES ***
    // --- route main page directs to employeeInOut
    $fatFree->route('GET /', function($fatFree) {
        displayEmployeeInOut($fatFree);
    });

    // --- route for main employee check in/out page
    $fatFree->route('GET /employeeInOut', function($fatFree) {
        displayEmployeeInOut($fatFree);
    });

    // --- admin only route for the admin (add/remove employees) page
    $fatFree->route('GET /welcome', function() {
        // check if user is admin
        if($_SESSION['usertype'] == "admin") {
            getWelcomePage();
        }
        else {
            echo "You do not have permissions necessary to view this page."; // replace with more elegant page later
        }
    });

    // --- admin only route for the receptionist page
    $fatFree->route('GET /reception', function() {
        // check if user is admin
        if($_SESSION['usertype'] == "admin") {
            getReceptionPage();
        }
        else {
            echo "You do not have permissions necessary to view this page."; // replace with more elegant page later
        }
    });

    // --- route for showing sign out
    $fatFree->route('GET /signOut', function($fatFree) {
        session_destroy(); // destroy the session
        $_SESSION = [];
        displaySignOut($fatFree);
    });

//    $fatFree->route('POST /reception', function($fatFree) {
//        getLoginData($fatFree);
//    });
    
    $fatFree->route('POST /', function($fatFree) {
        getLoginData($fatFree);
    });

    $fatFree->route('POST /employeeInOut', function($fatFree) {
        getLoginData($fatFree);
    });

    $fatFree->run();
?>
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

    // define some routes
    $fatFree->route('GET /employeeInOut', function() {
        displayEmployeeInOut();
    });

    $fatFree->route('GET /welcome', function() {
        getWelcomePage();
    });

    $fatFree->route('GET /reception', function() {
        getReceptionPage();
    });

    $fatFree->run();
?>
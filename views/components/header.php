<?php
/**
 * General header that includes scripts, stylesheets, jquery, and font and icons. Used on check-in and reception page.
 *
 * @author Dmitry Yushchev
 * @version 1.0
 */
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        <title>MSC Timesheets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- [if lt IE 9] -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
        <!-- [endif] -->

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css">

        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                crossorigin="anonymous"></script>

        <!-- custom js -->
        <script src="{{ @BASE }}/scripts/validate.js?v={{ rand()}}"></script>
        <script src="{{ @BASE }}/scripts/employeeInOut.js?v={{ rand()}}"></script>

        <!-- bootstrap -->
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js"></script>

        <!-- custom css -->
        <link rel="stylesheet" href="{{ @BASE }}/styles/styles.css?v={{ rand()}}">
        <link rel="stylesheet" href="{{ @BASE }}/styles/employeeInOut.css">

        <!-- fonts and icons -->
        <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js"
                integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+"
                crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Crete+Round:600" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:600" rel="stylesheet">
    </head>
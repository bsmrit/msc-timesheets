<?php
/**
 * Navbar for employee check-in page. This simple nav lacks search bar and other buttons found on other pages navbars.
 *
 * @author Benjamin Stevens
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
    <!--        <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js"-->
    <!--                integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+"-->
    <!--                crossorigin="anonymous"></script>-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Crete+Round" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
</head>

<body>
<nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light py-0 ">
    <div class="px-0 container col-lg-9 col-md-10 col-sm-12">
        <div class="py-1">
            <div class="container p-0">
                <img src="{{@BASE}}/includes/msc-logo.png" alt="" style="height:60px">
            </div>
        </div>
        <h3 class="font-logo pt-1">TIMESHEETS</h3>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse text-right" id="navbarColor01">
            <ul class="navbar-nav ml-4">

                <!-- if you are logged in as admin, show additional links -->
                <check if="{{ @usertype=='admin' || @usertype=='receptionist' }}">
                    <li class="nav-item active">
                        <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}">CHECK-IN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}/reception">STATUS BOARD</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}/welcome">ADMIN</a>
                    </li>
                </check>
            </ul>
            <!-- if you are logged in as an admin, show sign-out, if not show login -->
            <check if="{{ @usertype=='admin' || @usertype=='receptionist'}}">
                <true>
                    <ul class="navbar-nav ml-auto ml-4">
                        <li class="nav-item">
                            <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}/signOut">SIGN OUT</a>
                        </li>
                    </ul>
                </true>
                <false>
                    <ul class="navbar-nav ml-auto ml-4">
                        <li class="nav-item">
                            <a id="show-login" class="nav-link font-logo1" style="font-size: 1em;" href="">ADMIN & RECEPTION LOGIN</a>
                        </li>
                    </ul>
                </false>
            </check>
        </div>
    </div>
</nav>

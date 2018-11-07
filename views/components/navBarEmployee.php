<?php
/**
 * Navbar for employee check-in page. This simple nav lacks search bar and other buttons found on other pages navbars.
 *
 * @author Benjamin Stevens
 * @version 1.0
 */
?>

<body>
<nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light py-0 ">
    <div class="px-0 container col-sm-11 ">
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
                <li class="nav-item active">
                    <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}/employeeInOut">CHECK-IN</a>
                </li>
                <!-- if you are logged in as admin, show additional links -->
                <check if="{{ @usertype=='admin' }}">
                    <li class="nav-item">
                        <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}/reception">STATUS BOARD</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-logo1" style="font-size: 1em;" href="{{@BASE}}/welcome">ADMIN</a>
                    </li>
                </check>
            </ul>
            <!-- if you are logged in as an admin, show sign-out, if not show login -->
            <check if="{{ @usertype=='admin' }}">
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
                            <a id="show-login" class="nav-link font-logo1" style="font-size: 1em;" href="">ADMIN LOGIN</a>
                        </li>
                    </ul>
                </false>
            </check>
        </div>
    </div>
</nav>

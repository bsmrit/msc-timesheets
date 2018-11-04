<?php
    /**
     * View for the admin page.
     *
     * @author Dmitry Yushchev
     * @version 1.0
     */
?>

<include href="views/components/header.php"></include>
<include href="views/components/navBarWelcome.php"></include>

<div class="container d-flex justify-content-center col-sm-7 mt-4 gray">
    <div id="add-employee-popup" class="col-sm-12 px-0 mt-5 py-3 bg-light" style="display:none;">

        <h5 id="close-employee-popup" class="a btn float-right px-3 py-0 text-secondary radius">&#x2715</h5>
        <h4 class="green text-center montserrat pl-5">Add Employee</h4>

        <form id="create-list-form" method="post" class="">
            <div class="d-flex justify-content-center form-row pt-2 pb-0">
                <!--  F I R S T  N A M E  -->
                <div class="form-group col-md-5 my-2">
                    <input id="first-name" class="cap form-control radius border-dark"
                           name="first-name" type="text" placeholder="First Name" value="">
                </div>
                <!--  L A S T  N A M E  -->
                <div class="form-group col-md-5 my-2">
                    <input id="last-name" class="cap form-control radius border-dark"
                           name="last-name" type="text" placeholder="Last Name" value="">
                </div>
            </div>

            <div id="admin-input" class="d-flex justify-content-center form-row">
                <!--  L O G I N  N A M E  -->
                <!--                <div class="form-group col-md-5 my-2">-->
                <!--                    <input id="login-name" class="form-control radius border-dark"-->
                <!--                           name="login-name" type="text" placeholder="Login Name" value="">-->
                <!--                </div>-->
                <!--  P A S S W O R D  -->
                <!--                <div class="form-group col-md-5 my-2">-->
                <!--                    <input id="password" class="form-control radius border-dark"-->
                <!--                           name="password" type="password" placeholder="Password" value="">-->
                <!--                </div>-->
            </div>
            <div class="d-flex justify-content-center form-row pt-2">
                <div class="d-flex justify-content-between col-md-10 pl-0">
                    <!-- A D M I N  C H E C K  B O X -->
                    <div class="form-check col-md-5 ml-1">
                        <input id="admin" class="form-check-input mt-2 mb-0" type="checkbox">
                        <label class="form-check-label mb-0" for="admin">
                            Add Administrative Permission
                        </label>
                    </div>
                    <!--  B U T T O N  -->
                    <button id="add-employee-btn-save" name="save" type="submit" value="login"
                            class="btn col-md-3 btn-secondary mx-0 mb-3 radius blue">Save
                    </button>
                </div>
            </div>

            <!-- C H E C K  E R R O R -->
            <!--            <div id="error" class="a">-->
            <!--                <strong class="error-title mt-1 py-3">Error JS</strong>-->
            <!--                <div class="error-message py-3"></div>-->
            <!--            </div>-->
        </form>
    </div>
</div>

<!--  T A B L E  -->
<div class="container d-flex justify-content-left col-sm-7 mt-0 rounded gray">

    <form class="form-inline my-2 mt-3 my-lg-0">
        <!--  S E A R C H  B O X  -->
        <!--            <input class="font1 form-control mr-sm-0 bor" placeholder="Search..." type="text">-->
        <!--            <button class="blue font1 btn btn-secondary my-0 radius bor" type="submit"><i class="fas fa-search"></i>-->
        <!--            </button>-->

        <!--  A D D   N E W   E M P L O Y E E   B T N  -->
        <a id="employee" class="blue bor font1 btn btn-secondary mr-2 my-sm-0 radius" href="{{ @BASE.'/addEmployee' }}">Add Employee</a>
    </form>

</div>
<div class="container d-flex justify-content-center col-sm-7 mt-2 rounded gray">
    <table id="time-sheet-table-div" class="table table-responsive-sm table-hover table-bordered">
        <thead>
        <tr class="green-fond white">
            <!--            <th scope="col">ID</th>-->
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Username</th>
            <th scope="col" width="40px">Admin</th>
            <!--            <th scope="col"></th>-->
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
</body>
</html>
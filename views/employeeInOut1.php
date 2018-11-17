<?php
    /**
     * View for the employee check-in page.
     *
     * @author Benjamin Stevens
     * @version 1.0
     */
?>

<include href="views/components/header.php"></include>
<include href="views/components/navBarEmployee.php"></include>
<include href="views/components/login.php"></include>

<br>
<br>
<!-- name input, submit, and alert section -->
<div class="container">
    <div class="row justify-content-md-center">
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-4 p-1">
            <h4 class="clock text-center"></h4>
            <!--            <h4>Employee Check In/Out</h4>-->

            <form id="nameForm" autocomplete="off">
                <!-- name -->
                <div class="autocomplete container-fluid px-0">
                    <input id="myInput" type="text" name="myName"
                           style="width:100%;" placeholder="Enter you name here">
                </div>

                <!-- comment -->
                <div id="alertRow" class="container-fluid px-0">
                    <div id="alertCol" class="py-1 px-1" style="width:100%;">
                        <div id='statusAlert' class="text-center radius"
                             style="color:red; display:none;">Invalid employee name</div>
                    </div>
                </div>

                <!-- toggle button section -->
                <div class="container-fluid px-0">
                    <button id="toggleButton" class="px-3 btn btn-outline-secondary radius"
                            style="width:100%; display:none"></button>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>
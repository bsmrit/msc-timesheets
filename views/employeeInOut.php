<?php
    /**
     * View for the employee check-in page.
     *
     * @author Benjamin Stevens, James Way
     * @version 1.0
     */
?>

<include href="views/components/header.php"></include>
<include href="views/components/navBarEmployee.php"></include>
<include href="views/login.php"></include>

<br>
<br>

<!-- name input, submit, and alert section -->
<div class="container" style="height:160px; width:300px;">
    <div class="row justify-content-md-center">
        <h4>Employee Check In/Out</h4>
    </div>
<!--    <h4 class="clock text-center"></h4>-->

    <div class="row justify-content-md-center">
        <div class="col-8 p-1">
            <form id="nameForm" autocomplete="off">
                <div class="autocomplete" style="width:100%;">
                    <input id="myInput" type="text" name="myName" placeholder="Name">
                </div>
            </form>
        </div>
        <div class="col-4 p-1">
            <input id="employeeNameSubmit" type="submit" style="width:100%;" value="Submit">
        </div>
    </div>
    <div id="alertRow" class="row justify-content-md-center">
        <div id="alertCol" class="col-12 py-1 px-1" style="width:100%;"></div>
    </div>
</div>

<!-- toggle button section -->
<div class="container" style="width:300px">
    <div class="row justify-content-md-content">
        <div class="col-12 px-1">
            <button id="toggleButton" class="btn btn-outline-secondary" style="width:100%" disabled>Enter name above</button>
        </div>
    </div>
    <br>
    <div id="commentRow" class="row justify-content-md-center">
        <div id="commentCol" class="col-12 py-1 px-1" style="width:100%;">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="5" id="comment"></textarea>
        </div>
    </div>
</div>



</body>
</html>
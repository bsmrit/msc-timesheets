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
<include href="views/components/login.php"></include>

<br>
<br>

<!-- title container -->
<div class="container" style="height:30px; width:300px;">
    <div class="row justify-content-center">
        <h4 class="my-0 green montserrat">Employee Check In/Out</h4>
    </div>
    <hr>
</div>

<br>
<br>
<!-- name input, submit, and alert container -->
<div class="container" id="nameSubmitContainer" style="height:160px; width:300px;">

    <!-- full name and pin entry row -->
    <div class="row justify-content-center">
        <div class="col-8 p-1">
            <form id="nameForm" autocomplete="off">
                <div class="autocomplete" style="width:100%;">
                    <input id="myInput" type="text" name="myName" placeholder="Enter Full Name">
                </div>
            </form>
        </div>
        <div class="col-4 p-1">
            <input id="employeePin" type="password" name="employeePin" maxlength="4" placeholder="Enter PIN">
        </div>
    </div>

    <!-- new submit button on a second row -->
    <div class="row justify-content-md-center">
        <div class="col-12 p-1">
            <input id="employeeNameSubmit" type="submit" class="radius" style="width:100%; background-color: #004B87;" value="Submit">
        </div>
    </div>

    <div id="alertRow" class="row justify-content-md-center">
        <div id="alertCol" class="col-12 my-2 py-1 px-1" style="width:100%;"></div>
    </div>

    <br>
    <br>
    <br>

    <div id="successNoticeRow" class="row justify-content-md-center">
        <div id="successNoticeCol" class="col-12 mb-2 py-1 px-1 justify-content-md-center" style="width:100%;">
            <h5 id="successText" class="successText" align="center"></h5>
        </div>
    </div>
</div>

<!-- toggle button container -->
<div class="container" id="checkInOutContainer" style="width:300px; display:none">

    <div id="inOutTextRow" class="row justify-content-md-center">
        <div id="inOutTextCol" class="col-12 mb-2 py-1 px-1 justify-content-md-center" style="width:100%;">
            <h4 id="statusText" class="statusText" align="center">You are currently ?</h4>
        </div>
    </div>

    <!-- Commented to remove check-in/out button without comment, since user can use check-in/out button with comment.
    <div class="row justify-content-md-content">
        <div class="col-12 px-1">
            <button id="toggleWithoutCommentButton" class="toggleButton btn btn-outline-secondary" style="width:100%" disabled>Enter name above</button>
        </div>
    </div>

    <br>

    <div class="row">
        <div class="col"><hr></div>
        <div class="col-auto"><h2>OR</h2></div>
        <div class="col"><hr></div>
    </div>
    -->

    <div id="commentRow" class="row justify-content-md-center">
        <div id="commentCol" class="col-12 py-1 px-1" style="width:100%;">
            <textarea class="form-control" rows="5" style="border-radius: 0;" id="comment" placeholder="Optional: Enter your status comment here..."></textarea>
        </div>
    </div>

    <div class="row mt-2 justify-content-md-content">
        <div class="col-12 px-1">
            <button id="toggleWithCommentButton" class="toggleButton btn btn-outline-secondary radius" style="width:100%" disabled></button>
        </div>
    </div>

    <div class="row mt-2 justify-content-md-content">
        <div class="col-12 px-1">
            <button id="commentOnlyButton" class="btn btn-outline-secondary radius" style="width:100%" disabled></button>
        </div>
    </div>
</div>

</body>
</html>
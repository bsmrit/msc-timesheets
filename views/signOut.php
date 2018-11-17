<?php
/**
 * View for the employee check-in page.
 *
 * @author Benjamin Stevens
 * @version 1.0
 */
?>

<meta http-equiv="refresh" content="2;{{@BASE}}">

<include href="views/components/header.php"></include>
<include href="views/components/navBarBlank.php"></include>

    <br>
    <br>

    <div class="container m-auto">
        <div class="col-md-12 m-auto">
            <div class="jumbotron w-75 text-center m-auto">
                <h2 class="display-12">You've been signed out. Redirecting to check-in...</h2>
                <hr class="my-4">
                <a class="lead" href="{{@BASE}}/">If you are not automatically redirected, please click here.</a>
            </div>
        </div>
    </div>


</body>
</html>




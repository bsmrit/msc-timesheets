<?php
    /**
     * View for the admin page.
     *
     * @author Dmitry Yushchev
     * @version 1.0
     */
?>

<include href="views/components/navBarWelcome.php"></include>

<!-- A D D  E M P L O Y E E  &  H I S T O R Y  P O P U P -->
<check if="{{@usertype=='admin'}}">
    <include href="views/components/addEmployeePopupForAdmin.php"></include>
    <include href="views/components/viewHistory.php"></include>
</check>
<check if="{{@usertype=='receptionist'}}">
    <include href="views/components/addEmployeePopupForReceptionist.php"></include>
</check>

<!-- E D I T  E M P L O Y E E  P O P U P -->
<check if="{{@usertype=='admin'}}">
    <include href="views/components/editEmployeePopupForAdmin.php"></include>
</check>
<check if="{{@usertype=='receptionist'}}">
    <include href="views/components/editEmployeePopupForReceptionist.php"></include>
</check>


<!--  A D D  E M P L O Y E E  B U T T O N   &   S E A R C H  -->
<div class="container d-flex justify-content-left col-lg-9 col-md-10 col-sm-12 mt-0 rounded gray">
    <div class="container d-flex justify-content-left col-12 px-0">
        <a id="employee" class="blue bor font1 btn btn-secondary mr-2 my-sm-0 radius" href="{{ @BASE.'/addEmployee' }}">Add Employee</a>
        <input id="nameFilter" class="form-control bor" type="text" onkeyup="filterNamesAdminTable()" placeholder="Search by name...">
    </div>
</div>

<!-- T A B L E -->
<check if="{{@usertype=='admin'}}">
    <include href="views/components/tableForAdmin.php"></include>
</check>
<check if="{{@usertype=='receptionist'}}">
    <include href="views/components/tableForReceptionist.php"></include>
</check>

</body>
</html>
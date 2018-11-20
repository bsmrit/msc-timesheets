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


<!--  T A B L E  -->
<div class="container d-flex justify-content-left col-lg-7 col-md-9 col-sm-12 mt-0 rounded gray">
        <div class="container col-sm-3 px-0">
            <form class="form-inline my-2 mt-2 my-lg-0">
                <!--  Add new employee btn  -->
                <a id="employee" class="blue bor font1 btn btn-secondary mr-2 my-sm-0 radius" href="{{ @BASE.'/addEmployee' }}">Add Employee</a>
            </form>
        </div>
        <div class="container col-sm-9 px-0"></div>
</div>

<div class="container d-flex justify-content-center col-lg-7 col-md-9 col-sm-12 mt-2 rounded">
    <table id="time-sheet-table-div" class="table table-responsive-sm table-hover table-bordered">
        <thead>
        <tr class="green-fond white">
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">PIN</th>
            <th scope="col">User Name</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
            <th scope="col">History</th>
        </tr>
        </thead>
        <tbody id="time-sheet-body-div">
        </tbody>
    </table>
</div>

</body>
</html>
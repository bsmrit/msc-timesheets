<?php
    /**
     * View for the reception page.
     *
     * @author James Way
     * @version 1.0
     */
?>

<include href="views/components/header.php"></include>
<include href="views/components/navBarReception.php"></include>
<script src="{{ @BASE }}/scripts/reception.js?v={{ rand()}}"></script>

<div class="container col-lg-9 col-md-10 col-sm-12 mt-3">
    <input class="mb-2 bor white-fond form-control" type="text" id="nameFilter" onkeyup="filterNames()" placeholder="Search by last name...">
    <table class="table table-responsive-sm table-hover table-bordered white-fond" id="employeeTable">
        <thead class="green-fond white">
        <tr>
            <th scope="col" style="width: 1.5em">#</th>
            <th scope="col">Last Name</th>
            <th scope="col">First Name</th>
            <th scope="col" style="width: 1.5em">Status</th>
            <th scope="col">Comments</th>
        </tr>
        </thead>
        <tbody id="tableData"></tbody>
    </table>
</div>

<!--<div class="container col-lg-9 col-md-10 col-sm-12 mt-2">-->
<!--    <input type="text" id="nameFilter" onkeyup="filterNames()" placeholder="Search by last name...">-->
<!--    <table class="table table-bordered" id="employeeTable">-->
<!--        <thead>-->
<!--        <tr>-->
<!--            <th scope="col">#</th>-->
<!--            <th scope="col">Last</th>-->
<!--            <th scope="col">First</th>-->
<!--            <th scope="col">Status</th>-->
<!--            <th scope="col">Comments</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody id="tableData">-->
<!--        </tbody>-->
<!--    </table>-->
<!--</div>-->

</body>
</html>
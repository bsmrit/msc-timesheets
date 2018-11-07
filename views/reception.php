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
<include href="views/login.php"></include>
<script src="{{ @BASE }}/scripts/reception.js?v={{ rand()}}"></script>

<div class="container mt-3">
    <input type="text" id="nameFilter" onkeyup="filterNames()" placeholder="Search by last name...">
    <table class="table table-bordered" id="employeeTable">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Last</th>
            <th scope="col">First</th>
            <th scope="col">Status</th>
            <th scope="col">Comments</th>
        </tr>
        </thead>
        <tbody id="tableData">
        </tbody>
    </table>
</div>

</body>
</html>
<?php
    /**
     * View for the reception page.
     *
     * @author James Way
     * @version 1.0
     */
?>

<include href="views/components/navBarReception.php"></include>
<script src="{{ @BASE }}/scripts/reception.js?v={{ rand()}}"></script>

<div class="container col-lg-9 col-md-10 col-sm-12 mt-3">
    <input class="mb-2 bor white-fond form-control" type="text" id="nameFilter" onkeyup="filterNames()" placeholder="Search by name...">
    <table class="table table-responsive-sm table-hover table-bordered white-fond" id="employeeTable">
        <thead class="green-fond white">
        <tr>
            <th onclick="sortTable(0)" scope="col">Last Name</th>
            <th onclick="sortTable(1)" scope="col">First Name</th>
            <th onclick="sortTable(2)" scope="col" style="width: 1.5em">Status</th>
            <th onclick="sortTable(3)" scope="col" style="width: 12em">Last Update</th>
            <th scope="col">Comments</th>
        </tr>
        </thead>
        <tbody id="tableData"></tbody>
    </table>
</div>

</body>
</html>
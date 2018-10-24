<?php
/**
 * View for the reception page.
 *
 * @author James Way
 * @version 1.0
 */
 
?>

<!-- Auto refresh the page every 20 seconds -->
<meta http-equiv="refresh" content="10" >

<include href="views/components/header.php"></include>
<include href="views/components/navBarReception.php"></include>
<script src="{{ @BASE }}/scripts/reception.js?v={{ rand()}}"></script>

    <div class="container mt-3">
        <table class="table table-bordered" id="employeeTable">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    </div>

</body>
</html>
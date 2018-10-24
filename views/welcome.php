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

<div class="container d-flex justify-content-center col-sm-11 mt-4 gray">
    <div id="add-employee-popup" class="green col-sm-12">
        <form id="create-list-form"  method="post">

            <div class="form-row pt-3">
                <!--  F I R S T  N A M E  -->
                <div class="form-group col-md-4">
                    <!--<label for="inputEmail4">First Name</label>-->
                    <input id="first-name" class="form-control radius border-dark"
                           name="first-name" type="text" placeholder="First Name" value="">
                </div>
                <!--  L A S T  N A M E  -->
                <div class="form-group col-md-4">
                    <!--<label for="inputPassword4">Last Name</label>-->
                    <input id="last-name" class="form-control radius border-dark"
                           name="last-name" type="text" placeholder="Last Name" value="">
                </div>

                <!--  B U T T O N  -->
                <button id="add-employee-btn-save" name="save" type="submit" value="login"
                        class="btn btn-secondary mb-3 radius blue">Save
                </button>
            </div>

            <!-- A D M I N  C H E C K  B O X -->
            <!--            <div class="form-group">-->
            <!--                <div class="form-check">-->
            <!--                    <input class="form-check-input" type="checkbox" id="gridCheck">-->
            <!--                    <label class="form-check-label" for="gridCheck">-->
            <!--                        Admin-->
            <!--                    </label>-->
            <!--                </div>-->
            <!--            </div>-->
            <!-- C H E C K  E R R O R -->
            <!--            <div id="error" class="a">-->
            <!--                <strong class="error-title mt-1 py-3">Error JS</strong>-->
            <!--                <div class="error-message py-3"></div>-->
            <!--            </div>-->
        </form>
    </div>

</div>

<!--  T A B L E  -->
<div class="container d-flex justify-content-center col-sm-11 mt-4 rounded gray">
    <table id="time-sheet-table-div" class="table table-responsive-sm table-hover table-bordered">
        <thead>
        <tr class="green white">
            <!--            <th scope="col">ID</th>-->
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <!--            <th scope="col"></th>-->
            <!--            <th scope="col"></th>-->
            <!--            <th scope="col"></th>-->
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
</body>
</html>
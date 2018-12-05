<div class="container d-flex justify-content-center col-sm-12 mt-1 gray">
    <div id="add-employee-popup" class="container col-xl-5 col-lg-6 col-md-7 col-sm-9 col-xs-12 px-0 mt-5 py-3 bg-light" style="display:none;">

        <h5 id="close-employee-popup" class="a btn float-right px-3 py-0 text-secondary radius">&#x2715;</h5>
        <h4 class="green text-center montserrat pl-5">Add Employee</h4>

        <div class="container px-4">
            <form id="create-list-form" method="post" class="">
                <div class="d-flex justify-content-center form-row pt-2 pb-0">

                    <!--  F I R S T  N A M E  -->
                    <div class="form-group col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2">
                        <input id="first-name" class="cap form-control radius border-dark"
                               name="first-name" type="text" placeholder="First Name" value="">
                    </div>
                    <!--  L A S T  N A M E  -->
                    <div class="form-group col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2">
                        <input id="last-name" class="cap form-control radius border-dark"
                               name="last-name" type="text" placeholder="Last Name" value="">
                    </div>
                    <!--  P I N  -->
                    <div class="form-group col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 my-2">
                        <input id="pin" class="cap form-control radius border-dark" maxlength="4"
                               name="pin" type="text" placeholder="PIN" value="">
                    </div>
                </div>

                <div id="admin-input" class="d-flex justify-content-center form-row"></div>

                <div class="d-flex justify-content-center form-row pt-2">
                    <div class="d-flex justify-content-between col-12 pl-0">

                        <!-- R A D I O  B U T T O N S -->
                        <div class="form-check col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ml-1"></div>

                        <!--  B U T T O N  -->
                        <button id="add-employee-btn-save" name="save" type="submit" value="save"
                                class="btn  btn-secondary mx-0 mt-4 radius blue" style="width: 8em;">Save
                        </button>
                    </div>
                </div>
                <div id="errors">
                </div>
            </form>
        </div>
    </div>
</div>

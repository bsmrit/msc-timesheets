<div class="container d-flex justify-content-center col-sm-12 mt-1 gray">
    <div id="edit-employee-popup" class="container col-xl-5 col-lg-6 col-md-7 col-sm-9 col-xs-12 px-0 mt-5 py-3 bg-light" style="display:none;">

        <h5 id="close-edit-employee-popup" class="a btn float-right px-3 py-0 text-secondary radius">&#x2715;</h5>
        <h4 class="green text-center montserrat pl-5">Delete Employee</h4>


        <div class="container px-4">
            <form id="create-list" method="post">
                <div class="d-flex justify-content-center form-row pt-2 pb-0">

                    <!--  F I R S T  N A M E  -->
                    <div class="form-group col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2">
                        <input id="edit-first-name" class="cap form-control radius border-dark"
                               name="edit-first-name" type="text" placeholder="First Name" value="">
                    </div>
                    <!--  L A S T  N A M E  -->
                    <div class="form-group col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2">
                        <input id="edit-last-name" class="cap form-control radius border-dark"
                               name="edit-last-name" type="text" placeholder="Last Name" value="">
                    </div>
                    <!--  P I N  -->
                    <div class="form-group col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 my-2">
                        <input id="pin-edit" class="cap form-control radius border-dark" maxlength="4"
                               name="pin" type="text" placeholder="PIN" value="">
                    </div>
                </div>

                <div id="admin-input-edit" class="d-flex justify-content-center form-row"></div>

                <div class="d-flex justify-content-center form-row">
                    <div class="d-flex justify-content-between col-12 pl-0">

                        <!-- R A D I O  B U T T O N S -->
                        <div class="form-check col-6 ml-1">
<!--                            <div>-->
<!--                                <input id="empl-edit" class="form-check-input mt-2 mb-0" type="radio" name="edit-admin" value="0" checked>-->
<!--                                <label class="form-check-label mb-0 mt-1" for="empl-edit">Set as employee</label>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <input id="admin-edit" class="form-check-input mt-2 mb-0" type="radio" name="edit-admin" value="1">-->
<!--                                <label class="form-check-label mb-0 mt-1" for="admin-edit">Set as admin</label>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <input id="recep-edit" class="form-check-input mt-2 mb-0" type="radio" name="edit-admin" value="2">-->
<!--                                <label class="form-check-label mb-0 mt-1" for="recep-edit">Set as receptionist</label>-->
<!--                            </div>-->
                        </div>

                        <div class="text-right col-6 pr-1 pb-0">
                            <!--  D E L E T E  B U T T O N  -->
                            <button id="edit-employee-btn-delete" name="edit-delete" type="button" value="edit-delete"
                                    class="btn btn-secondary mt-4 radius blue" style="width: 4.5em;">Delete
                            </button>
                            <!--  S A V E  B U T T O N  -->
<!--                            <button id="edit-employee-btn-save" name="edit-save" type="button" value="edit-save"-->
<!--                                    class="btn btn-secondary mt-4 radius blue" style="width: 4.5em;">Save-->
<!--                            </button>-->
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
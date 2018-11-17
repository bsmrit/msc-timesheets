<div class="container d-flex justify-content-center col-sm-7 mt-4 gray">
    <div id="edit-employee-popup" class="col-sm-12 px-0 mt-5 py-3 bg-light" style="display:none;">

        <h5 id="close-edit-employee-popup" class="a btn float-right px-3 py-0 text-secondary radius">&#x2715;</h5>
        <h4 class="green text-center montserrat pl-5">Edit Employee</h4>

        <form id="create-list" method="post" class="">
            <div class="d-flex justify-content-center form-row pt-2 pb-0">
                <!--  F I R S T  N A M E  -->
                <div class="form-group col-md-5 my-2">
                    <input id="edit-first-name" class="cap form-control radius border-dark"
                           name="edit-first-name" type="text" placeholder="First Name" value="">
                </div>
                <!--  L A S T  N A M E  -->
                <div class="form-group col-md-5 my-2">
                    <input id="edit-last-name" class="cap form-control radius border-dark"
                           name="edit-last-name" type="text" placeholder="Last Name" value="">
                </div>
            </div>

            <div id="admin-input-edit" class="d-flex justify-content-center form-row">
            </div>

            <div class="d-flex justify-content-center form-row pt-2">
                <div class="d-flex justify-content-between col-md-10 pl-0">

                    <!-- C H E C K  B O X -->
                    <div class="form-check col-md-5 ml-1">
<!--                        <div><!-- A D M I N  C H E C K  B O X -->
<!--                            <input id="admin-edit" class="b form-check-input mt-2 mb-0" type="checkbox">-->
<!--                            <label class="form-check-label mb-0 mt-1" for="admin">Set as admin</label>-->
<!--                        </div>-->
<!---->
<!--                        <div> <!-- R E C E P.  C H E C K  B O X -->
<!--                            <input id="recep-edit" class="b form-check-input mt-2 mb-0" type="checkbox">-->
<!--                            <label class="form-check-label mb-0 mt-1" for="recep">Set as receptionist</label>-->
<!--                        </div>-->
                    </div>

                    <!--  D E L E T E  B U T T O N  -->
                    <button id="edit-employee-btn-delete" name="edit-delete" type="button" value="edit-delete"
                            class="btn col-md-3 btn-secondary mt-2 mb-3 radius blue">Delete
                    </button>
                    <!--  S A V E  B U T T O N  -->
<!--                    <button id="edit-employee-btn-save" name="edit-save" type="button" value="edit-save"-->
<!--                            class="btn col-md-3 btn-secondary mt-2 mb-3 radius blue">Save-->
<!--                    </button>-->
                </div>
            </div>
        </form>
    </div>
</div>
<!-- LOG IN  -->
<!--<form id="login-form" action="{{ @BASE.'/welcome' }}" method="post">-->
<form id="login-form" action="" method="post">
    <div id="login-popup" class="container mt-5 pt-3 col-sm-4 bg-light" style="display:none;">
        <h5 id="close-login-popup" class="a btn float-right px-0 py-0 text-secondary radius">&#x2715</h5>
        <h4 class="green text-center montserrat">Admin Login</h4>
        <!--  name, password  -->
        <div class="px-4">
            <input id="user" class=" white-fond my-3 form-control radius"
                   name="user" type="text" placeholder="Name" value="">
            <input id="password" class="my-3 form-control radius"
                   name="password" type="password" placeholder="Password" value="">
            <div class="col-sm-3 text-right pt-3"></div>
            <!--  button  -->
            <div class="container-fluid px-0">
                <button id="login" name="login" type="submit" value="login" style="width:100%;"
                        class="px-3 mb-3 btn btn-outline-secondary radius blue white">LOG IN
                </button>
            </div>
        </div>
    </div>
</form>
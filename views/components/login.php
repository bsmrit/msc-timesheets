<!-- LOG IN  -->
<!--<form id="login-form" action="{{ @BASE.'/welcome' }}" method="post">-->
<div class="container login-container d-flex justify-content-center col-sm-12 mt-4 gray">

        <div id="login-popup" class="container col-xl-5 col-lg-6 col-md-7 col-sm-9 col-xs-12 mt-5 pt-3 bg-light" style="display:none;">
            <h5 id="close-login-popup" class="a btn float-right px-0 py-0 text-secondary radius">&#x2715;</h5>
            <h4 class="green text-center montserrat">Login</h4>
            <!--  name, password  -->
            <div class="px-4">
                <form id="login-form" method="post">
                    <input id="user" class=" white-fond my-3 form-control radius"
                           name="user" type="text" placeholder="Username" value="">
                    <input id="password" class="my-3 form-control radius"
                           name="password" type="password" placeholder="Password" value="">
                    <div class="col-sm-3 text-right pt-3"></div>
                    <!--  button  -->
                    <div class="container-fluid px-0">
                        <button id="login" name="login" type="submit" value="login" style="width:100%;"
                                class="px-3 mb-3 btn btn-outline-secondary radius blue white">LOG IN
                        </button>
                    </div>
                </form>
            </div>
        </div>

</div>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <!-- Set variable for CSRF check -->
    <meta name="csrf-token" content="<?php echo csrf_token(); ?>">

    <title>RESTodo Auth</title>
    <link rel="shortcut icon" href="icon.png">

    <link rel="stylesheet" href="css/vendors/normalize.css">
    <link rel="stylesheet" href="css/vendors/foundation.min.css">
    <link rel="stylesheet" href="css/styles.css">

    <script data-main="js/main" src="js/libs/require/require.js"></script>
</head>

<body>

    <div class="row app-wrapper main-content">
        <div class="small-12 columns">

        <span id="flash-message" class="flash-message"></span>
        <h1 class="site-title">RESTodo</h1>    

        <div class="user row">
            <div class="small-12 medium-8 small-centered medium-centered columns">
                <div id="user-login"></div>
                <div id="create-account"></div>
            </div>            
        </div>  

        <div class="todos row">
            <div class="small-12 medium-8 small-centered medium-centered columns">
                <span id="errorMessage" class="error" ></span>
                <div id="todo-creator"></div>
                <ul id="todo-list"></ul>
            </div>            
        </div>    

        </div>
    </div>

</body>

</html>

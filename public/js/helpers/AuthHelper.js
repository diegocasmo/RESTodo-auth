define([
    'jquery',
    'underscore',
    'jqueryCookie'
], function ($, _) {
    
    var AuthHelper = {

        // check if current user is logged in
        isLoggedIn: function() {
            if(typeof($.cookie('_auth')) !== 'undefined' && $.cookie('_auth') === 'true')
                return true;
            return false;
        },

        // logs out a user
        logOut: function() {
            this.setCookie(false);
            $.get('http://localhost:8000/api/v1/user/sign-out');
        },

        // sets cookie to a particular value
        setCookie: function(value) {
            $.cookie('_auth', value);
        }

    };

    return AuthHelper;

});
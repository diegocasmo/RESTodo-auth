define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'helpers/Message',
    'helpers/AuthHelper',
    'handlebars'
], function($, _, Backbone, Router, Message, AuthHelper) {
    var initialize = function() {

        var app_router = new Router.appRouter();

        // set up CSRF token in requests header
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            return jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));
        });

        // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
        $.ajaxSetup({
            statusCode: {
                401: function() {
                    // Redirec the to the login page
                    AuthHelper.setCookie(false);
                    app_router.navigate('login', {trigger: true});
                },
                403: function() {
                    // Redirec the to the login page
                    AuthHelper.setCookie(false);
                    app_router.navigate('login', {trigger: true});
                }
            }
        });

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});

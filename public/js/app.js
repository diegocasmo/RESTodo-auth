define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'helpers/Message',
    'jqueryCookie',
    'handlebars'
], function($, _, Backbone, Router, Message) {
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
                    // Redirec the to the login page.
                    console.log('Redirect to the login page.');
                    $.cookie('_auth', false);
                    app_router.navigate('login', {trigger: true});
                },
                403: function() {
                    // 403 -- Access denied
                    console.log('Redirect to the login page.');
                    $.cookie('_auth', false);
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

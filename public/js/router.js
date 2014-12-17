define([
    'jquery',
    'underscore',
    'backbone',
    'views/TodosLayoutManager',
    'views/UserLayoutManager',
    'handlebars',
    'jqueryCookie'
], function($, _, Backbone, TodosLayoutManager, UserLayoutManager) {

    var userLayoutManager = 'undefined',
        todosLayoutManager = 'undefined';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'login',
            'login': 'login',
            'home': 'home'
        },

        cleanSubViews: function() {
            if(todosLayoutManager !== 'undefined') {
                todosLayoutManager.cleanSubViews();
                todosLayoutManager.undelegateEvents();
                todosLayoutManager = 'undefined';
            }           

            if(userLayoutManager !== 'undefined') {
                userLayoutManager.cleanSubViews();
                userLayoutManager.undelegateEvents();
                userLayoutManager = 'undefined';
            }
        },

        cleanSessionMessage: function() {
            var $sessionMsg = $('.session');
            if($sessionMsg.length > 0) {
                _.each($sessionMsg, function(msg) {
                    $(msg).remove();
                });
            }
        },

        addBodyClass: function(page) {
            var $body = $('body');
            $body.removeClass();
            $body.addClass(page)
        }

    });

    var initialize = function() {

        var app_router = new AppRouter;

        app_router.on('route:login', function() {

            app_router.cleanSubViews();
            app_router.addBodyClass('login');
            
            if($.cookie('_auth') === 'true') {
                this.navigate('home', {trigger: true});
            } else {
                // make sure server session is always destroyed
                $.get('http://localhost:8000/api/v1/user/sign-out');
                userLayoutManager = new UserLayoutManager({
                    router: this
                });
            }

        });

        app_router.on('route:home', function() {
            
            app_router.cleanSubViews();
            app_router.addBodyClass('home');
            app_router.cleanSessionMessage();

            if($.cookie('_auth') === 'true') {
                todosLayoutManager = new TodosLayoutManager({
                    router: this
                });
            } else {
                this.navigate('login', {trigger: true});
            }

        });

        Backbone.history.start();
    };
    return {
        initialize: initialize,
        appRouter: AppRouter
    };
});

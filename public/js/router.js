define([
    'jquery',
    'underscore',
    'backbone',
    'views/TodosLayoutManager',
    'views/UserLayoutManager',
    'handlebars',
    'jqueryCookie'
], function($, _, Backbone, TodosLayoutManager, UserLayoutManager) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'login',
            'login': 'login',
            'home': 'home'
        }
    });

    var initialize = function() {

        var app_router = new AppRouter;

        app_router.on('route:login', function() {
            if($.cookie('_auth')) {
                this.navigate('home', {trigger: true});
            } else {
                var userLayoutManager = new UserLayoutManager({
                    router: this
                });
            }
        });

        app_router.on('route:home', function() {
            if($.cookie('_auth')) {
                var todosLayoutManager = new TodosLayoutManager({
                    router: this
                });
            } else {
                this.navigate('login', {trigger: true});
            }
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});

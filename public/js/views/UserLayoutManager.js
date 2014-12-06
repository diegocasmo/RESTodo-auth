define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'helpers/Message',
    'views/user/UserLoginView',
    'views/user/UserCreateAccountView'
], function($, _, Backbone, Handlebars, Message, UserLoginView, UserCreateAccountView) {

    var UserLayoutManager = Backbone.View.extend({

        el: $("#user"),

        initialize: function(options) {
            this.router = options.router;
            this.message = Message.getInstance();

            // initialize sub views
            this.userLoginView = new UserLoginView();
            this.userCreateAccountView = new UserCreateAccountView();
        },

        render: function() {
            this.userLoginView.setElement().render();
            this.userCreateAccountView.setElement().render();
        },
    });

    return UserLayoutManager;

});
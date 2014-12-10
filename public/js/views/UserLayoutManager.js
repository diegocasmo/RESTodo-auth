define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'helpers/Message',
    'views/user/RegistrationView'
], function($, _, Backbone, Handlebars, Message, RegistrationView) {

    var UserLayoutManager = Backbone.View.extend({

        el: $("#user"),

        initialize: function(options) {
            this.router = options.router;
            this.message = Message.getInstance();

            // initialize sub view
            this.registrationView = new RegistrationView(options);
        },

        render: function() {
            this.registrationView.setElement().render();
        },

        cleanSubViews: function() {
            this.registrationView.$el.html('');
            this.registrationView.undelegateEvents();
        }
    });

    return UserLayoutManager;

});
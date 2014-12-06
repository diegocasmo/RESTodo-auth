define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/user/userLoginTemplate.html',
    'helpers/Message'
], function($, _, Backbone, Handlebars, userLoginView, Message) {

    var UserLoginView = Backbone.View.extend({

        template: Handlebars.compile(userLoginView),

        el: $('#user-login'),

        events: {
        },

        initialize: function() {
            this.message = Message.getInstance();
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            return this;
        },
    });

    return UserLoginView;

});
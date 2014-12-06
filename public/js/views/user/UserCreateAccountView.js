define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/user/userCreateTemplate.html',
    'helpers/Message'
], function($, _, Backbone, Handlebars, userCreateView, Message) {

    var UserCreateView = Backbone.View.extend({

        template: Handlebars.compile(userCreateView),

        el: $('#create-account'),

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

    return UserCreateView;

});

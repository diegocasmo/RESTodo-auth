define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/todos/todoView.html',
    'helpers/Message',
    'helpers/AuthHelper'
], function($, _, Backbone, Handlebars, todoView, Message, AuthHelper) {

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile(todoView),

        events: {
            'click input[type="checkbox"]': '_changeModel',
            'click .delete': '_removeModel'
        },

        initialize: function(options) {
            this.model = options.model;
            this.message = Message.getInstance();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        _removeModel: function() {
            if(AuthHelper.isLoggedIn()) {
                var that = this;
                that.model.destroy(
                {
                    url: that.model.url + that.model.get('id'),
                    success: function(model, response, options) {
                        that.message._setFlashMessage('Todo has been successfully removed.');
                        that.unbind(); // Unbind all local event bindings
                        that.remove(); // Remove view from DOM
                    },
                    error: function() {
                        that.message._setFlashMessage(that.message._customErrors.error);
                    }
                });            
            } else {
                AuthHelper.logOut();
            }
        },

        _changeModel: function() {
            if(AuthHelper.isLoggedIn()) {
                var that = this,
                    done = parseInt(that.model.get('done'));

                that.model.save({
                    'title': that.model.get('title'),
                    'done': (done === 1 ? 0 : 1)
                }, 
                { 
                    url: that.model.url + that.model.get('id'),
                    success: function(model, response, options) {
                        that.message._setFlashMessage('Todo has been successfully updated.');
                    }, 
                    error: function(model, response, options) {
                        that.message._setFlashMessage(that.message._customErrors.error);
                    }
                });
            } else {
                AuthHelper.logOut();
            }
        }
    });

    return TodoView;

});
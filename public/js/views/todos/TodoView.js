define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/todos/todoView.html',
    'helpers/Message'
], function($, _, Backbone, Handlebars, todoView, Message) {

    var TodoView = Backbone.View.extend({

        template: Handlebars.compile(todoView),

        events: {
            'click input[type="checkbox"]': '_changeModel',
            'click .delete': '_removeModel'
        },

        initialize: function(options) {
            this.model = options.model;
            this.message = Message.getInstance();
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        _removeModel: function() {
            var that = this;
            
            that.model.destroy(
            {
                url: that.model.url + that.model.get('id'),
                success: function(model, response, options) {
                    that.message._setFlashMessage(response);
                    that.unbind(); // Unbind all local event bindings
                    that.remove(); // Remove view from DOM
                },
                error: function() {
                    that.message._setFlashMessage(that.message._customErrors.error);
                }
            });            
        },

        _changeModel: function() {
            var that = this;

            var done = that.model.get('done');

            if(done === 1)
                done = 0;
            else
                done = 1;

            that.model.save({
                'id': that.model.get('id'),
                'todo': that.model.get('todo'),
                'done': done
            }, 
            { 
                url: that.model.url + that.model.get('id'),
                success: function(model, response, options) {
                    that.message._setFlashMessage(response);
                }, 
                error: function(model, response, options) {
                    that.message._setFlashMessage(that.message._customErrors.error);
                }
            });
        }
    });

    return TodoView;

});

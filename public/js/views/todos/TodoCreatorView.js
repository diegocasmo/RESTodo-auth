define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/todos/todoCreatorView.html',
    'models/TodoModel',
    'helpers/Message',
    'helpers/AuthHelper'
], function($, _, Backbone, Handlebars, todoCreatorView, TodoModel, Message, AuthHelper) {

    var TodoCreatorView = Backbone.View.extend({

        template: Handlebars.compile(todoCreatorView),

        el: $('#todo-creator'),
        
        events: {
            'submit': '_createTodo',
            'focus input[type="text"]': '_deleteTodoErrorMessages',
            'click #log-out': '_signOut'
        },
        
        initialize: function(options) {
            this.router = options.router;
            this.layoutManager = options.todosLayoutManager;
            this.model = new TodoModel();
            this.message = Message.getInstance();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        _signOut: function(event) {
            event.preventDefault();
            AuthHelper.logOut();
            this.router.navigate('login', {trigger: true});
        },

        _createTodo: function(event) {
            event.preventDefault();
            if(AuthHelper.isLoggedIn()) {
                var that = this,        
                    title = $.trim($('input[name="title"]').val());

                var todo = new TodoModel({
                    title: title,
                    done: 0
                });

                var validator = todo._validateTodo();
                if (_.isEmpty(validator)) {
                    todo.save(null, {
                        success: function(model, response, options) {
                            that.message._setFlashMessage('Todo has been successfully created.');
                            that.layoutManager.configureRender();
                        },
                        error: function() {
                            that.message._setFlashMessage(that.message._customErrors.error);
                        }
                    });
                } else {
                    that._showErrors(validator);
                }
            } else {
                AuthHelper.logOut();
            }
        },

        _showErrors: function(errors) {
            for (var key in errors) {
               var obj = errors[key];
               for (var prop in obj) {
                  if(obj.hasOwnProperty(prop)){
                    $('[name="' + prop + '"]').val(obj[prop]);
                  }
               }
            }
        },

        _deleteTodoErrorMessages: function(event) {
            event.preventDefault();

            _.each(this.model._customErrors.title, function(customError) {
                $currentTarget = $(event.currentTarget);
                if($currentTarget.val() === customError)
                    $currentTarget.val('');
            });          
        }

    });

    return TodoCreatorView;

});
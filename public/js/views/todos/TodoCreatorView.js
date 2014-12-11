define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/todos/todoCreatorView.html',
    'models/TodoModel',
    'helpers/Message',
    'jqueryCookie'
], function($, _, Backbone, Handlebars, todoCreatorView, TodoModel, Message) {

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
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        _signOut: function(event) {
            console.log('_signOut');
            event.preventDefault();
            $.get('http://localhost:8000/api/v1/user/sign-out');
            $.cookie('_auth', false);
            this.router.navigate('login', {trigger: true});
        },

        _createTodo: function(event) {
            event.preventDefault();
            console.log('_createTodo');

            var that = this,        
                todo = $.trim($('input[name="todo"]').val());

            var todo = new TodoModel({
                todo: todo,
                done: 0
            });

            var validator = todo._validate();
            if (_.isEmpty(validator)) {
                todo.save(null, {
                    success: function(model, response, options) {
                        that.message._setFlashMessage(response);
                        that.undelegateEvents();
                        that.layoutManager._configureRender();
                    },
                    error: function() {
                        that.message._setFlashMessage(that.message._customErrors.error);
                    }
                });
            } else {
                validator.forEach(function(objArr) {
                    $('[name="' + objArr.key + '"]').val(objArr.value);
                });
            }
        },

        _deleteTodoErrorMessages: function(event) {
            event.preventDefault();
            _.each(this.model._customErrors.todo, function(customError) {
                $currentTarget = $(event.currentTarget);
                if($currentTarget.val() === customError)
                    $currentTarget.val('');
            });          
        }

    });

    return TodoCreatorView;

});

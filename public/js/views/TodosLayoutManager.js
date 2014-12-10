define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/TodosCollection',
    'views/todos/TodoListView',
    'views/todos/TodoCreatorView',
    'helpers/Message',
    'jqueryCookie'
], function($, _, Backbone, Handlebars, TodosCollection, TodoListView, TodoCreatorView, Message) {

    var TodosLayoutManager = Backbone.View.extend({

        el: $("#todos"),

        initialize: function(options) {
            this.router = options.router;
            //this._signOut();

            /*
            this.collection = new TodosCollection();
            this.todoCreatorView = new TodoCreatorView({
                    router: this.router,
                    layoutManager: this
                });
            this.message = Message.getInstance();
            this._configureRender();
            */
        },


        render: function(todoListView) {
            todoListView.setElement(this.$('#todo-list')).render();
            this.todoCreatorView.setElement(this.$('#todo-creator')).render();
        },

        _signOut: function() {
            $.get('http://localhost:8000/api/v1/user/sign-out');
            $.cookie('_auth', false);
            this.router.navigate('login', {trigger: true});
        },

        _configureRender: function() {
            var that = this;
            that.collection.fetch({
                success: function(collection, response, options) {
                    if(typeof response === 'object') {
                        that.todoListView = new TodoListView({
                            collection: that.collection,
                            layoutManager: that
                        });
                        that.render(that.todoListView);
                    } else {
                        that.message._setStaticMessage(response);
                    }
                },

                error: function(collection, response, options) {
                    that.message._setStaticMessage(that.message._customErrors.error);
                } 
            });
        },
    });

    return TodosLayoutManager;

});
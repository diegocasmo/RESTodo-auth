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

        el: $('#todos'),

        initialize: function(options) {
            this.options = options;
            this.router = options.router;
            this.message = Message.getInstance();
            this.collection = new TodosCollection();

            // initialize subviews
            this.todoCreatorView = new TodoCreatorView({
                    router: this.router,
                    layoutManager: this
                });
            this.todoListView = new TodoListView(options);
            
            // fetch collection
            this.collection.getResults();

            this.listenTo(this.collection, 'successOnFetch', this.handleSuccess);
            this.listenTo(this.collection, 'errorOnFetch', this.handleError);
        },

        handleSuccess: function() {
            this.render();
        },

        errorOnFetch: function() {
            console.log('errorOnFetch');
        },

        render: function() {
            this.todoCreatorView.render().el;
            this.todoListView.render(this.collection).el;
        },

        cleanSubViews: function() {
            $('#todo-creator').html('');
            this.todoCreatorView.undelegateEvents();
            $('#todo-list').html('');
            this.todoListView.undelegateEvents();
        }
    });

    return TodosLayoutManager;

});
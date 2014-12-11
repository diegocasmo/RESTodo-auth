define([
  'jquery',
  'underscore',
  'backbone',
  'models/TodoModel'
], function($, _, Backbone, TodoModel){
  var Tweets = Backbone.Collection.extend({

  	model: TodoModel,

    url: 'http://localhost:8000/api/v1/todos',

    getResults: function() {
        var that = this;
        this.fetch({
            reset: true,
            success: function(collection, response, options) {
                that.trigger('successOnFetch');
            },

            error: function(collection, response, options) {
                that.trigger('errorOnFetch');
            } 
        });
    },
  
  });

  return Tweets;
});

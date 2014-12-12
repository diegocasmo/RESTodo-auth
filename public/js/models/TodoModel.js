    define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TodoModel = Backbone.Model.extend({

        url: 'http://localhost:8000/api/v1/todos/',

        defaults: {
            title: '',
            done: 0
        },
        
        _customErrors: {
            title: {
                empty: 'Please enter a title.',
                tooLong: 'Title is too long.'
            },
            done: {
                empty: 'Please enter a valid value for done.'
            }
        },

        _validateTodo: function() {
            var title = this.attributes.title,
                done = this.attributes.done;

            var errors = [];

            if (title === '' || title === this._customErrors.title.empty) {
                errors.push({
                    title: this._customErrors.title.empty
                });
            } else if( title.length > 255 || title === this._customErrors.title.tooLong) {
                 errors.push({
                    title: this._customErrors.title.tooLong
                });               
            }

            if (done === '' || done === this._customErrors.done.empty) {
                errors.push({
                    done: this._customErrors.title.empty
                });
            }

            return errors;
        }

    });

    return TodoModel;

});

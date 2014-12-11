    define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TodoModel = Backbone.Model.extend({

        url: 'http://localhost:8000/api/v1/todos/',

        defaults: {
            todo: '',
            done: 0
        },
        
        _customErrors: {
            todo: {
                empty: 'Please enter a todo.',
                tooLong: 'todo is too long.'
            },
            done: {
                empty: 'Please enter a valid value for done.'
            }
        },

        _validate: function() {
            var todo = this.attributes.todo,
                done = this.attributes.done;

            var errors = [];

            if (todo === '' || todo === this._customErrors.todo.empty) {
                errors.push({
                    key: 'todo',
                    value: this._customErrors.todo.empty
                });
            } else if( todo.length > 255 || todo === this._customErrors.todo.tooLong) {
                 errors.push({
                    key: 'todo',
                    value: this._customErrors.todo.tooLong
                });               
            }

            if (done === '' || done === this._customErrors.done.empty) {
                errors.push({
                    key: 'done',
                    value: this._customErrors.done.empty
                });
            }

            return errors;
        }

    });

    return TodoModel;

});

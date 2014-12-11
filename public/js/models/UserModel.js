    define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var UserModel = Backbone.Model.extend({

        url: 'http://localhost:8000/api/v1/',

        defaults: {
            email: '',
            password: '',
            password_repeat: ''
        },
        
        _customErrors: {
            email: {
                empty: 'Please enter an email.',
                invalidEmail: 'Please enter a valid email'
            },
            password: {
                empty: 'Please enter a password.',
                tooShort: 'Password must be larger than 3 characteres.'
            },
            password_repeat: {
                empty: 'Please enter a password repeat.',
                notMatch: 'Password Repeat must match passwrod.'
            }
        },

        _validateCreate: function() {
            var email = $.trim(this.attributes.email),
                password = $.trim(this.attributes.password),
                password_repeat = $.trim(this.attributes.password_repeat);

            var errors = [];

            // validates email input
            var pemailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if (email === '' || email === this._customErrors.email.empty) {
                errors.push({
                    email: this._customErrors.email.empty
                });
            } else if (typeof(email) == 'undefined' || !pemailRegex.test(email)) {
                errors.push({
                    email: this._customErrors.email.invalidEmail
                });
            }
            
            // validates password input
            if (password === '' || password === this._customErrors.password.empty) {
                errors.push({
                    password: this._customErrors.password.empty
                });
            } else if(password.length < 3) {
                errors.push({
                    password: this._customErrors.password.tooShort
                });      
            }

            // validates password repeat input
            if (password_repeat === '' || password_repeat === this._customErrors.password_repeat.empty) {
                errors.push({
                    password_repeat: this._customErrors.password_repeat.empty
                });  
            } else if(password_repeat !== password) {
                errors.push({
                    password_repeat: this._customErrors.password_repeat.notMatch
                });
            }

            return errors;
        },

        _validateLogIn: function() {
            var email = $.trim(this.attributes.email),
                password = $.trim(this.attributes.password),
                password_repeat = $.trim(this.attributes.password_repeat);

            var errors = [];

            // validates email input
            var pemailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if (email === '' || email === this._customErrors.email.empty) {
                errors.push({
                    email: this._customErrors.email.empty
                });
            } else if (typeof(email) == 'undefined' || !pemailRegex.test(email)) {
                errors.push({
                    email: this._customErrors.email.invalidEmail
                });
            }
            
            // validates password input
            if (password === '' || password === this._customErrors.password.empty) {
                errors.push({
                    password: this._customErrors.password.empty
                });
            } else if(password.length < 3) {
                errors.push({
                    password: this._customErrors.password.tooShort
                });      
            }

            return errors;
        }
    });

    return UserModel;

});
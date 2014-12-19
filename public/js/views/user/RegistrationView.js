define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/user/registrationViewTemplate.html',
    'helpers/Message',
    'models/UserModel',
    'helpers/AuthHelper'
], function($, _, Backbone, Handlebars, registrationView, Message, UserModel, AuthHelper) {

    var RegistrationView = Backbone.View.extend({

        template: Handlebars.compile(registrationView),

        el: $('#registration'),

        events: {
            'click #log-in': '_logIn',
            'click #create': '_createAccount',
            'focus input': '_cleanSingleError'
        },

        initialize: function(options) {
            this.router = options.router;
            this.message = Message.getInstance();
        },

        render: function() {
            this.$el.html(this.template);
            return this;
        },

        _logIn: function(event) {
            event.preventDefault();

            var email = $.trim($('input[name="log-in-email"]').val()),
                password = $('input[name="log-in-password"]').val();

            var user = new UserModel({
                email: email,
                password: password
            });

            // make sure we clean all error before updating 
            // form state
            this._cleanAllErrors();

            var validator = user._validateLogIn(),
                that = this;

            if (_.isEmpty(validator)) {
                user.save(null, 
                    {
                    url: user.url + 'user/sign-in',
                    success: function(model, response, options) {
                        AuthHelper.setCookie(true);
                        that.router.navigate('home', {trigger: true});
                    },

                    error: function(model, response, options) {
                        AuthHelper.setCookie(false);
                        that.router.navigate('login', {trigger: true});
                        that.message._setFlashMessage('Wrong email or password.');
                    }
                });
            } else {
                this._showErrors(validator, 'log-in');
            }
        },

        _createAccount: function(event) {
            event.preventDefault();

            var email = $.trim($('input[name="create-email"]').val()),
                password = $('input[name="create-password"]').val(),
                password_repeat = $('input[name="create-password_repeat"]').val();

            var user = new UserModel({
                email: email,
                password: password,
                password_repeat: password_repeat
            });

            // make sure we clean all error before updating 
            // form state
            this._cleanAllErrors();

            var validator = user._validateCreate(),
                that = this;

            if (_.isEmpty(validator)) {
                user.save(null, 
                    {
                    url: user.url + 'account',
                    success: function(model, response, options) {
                        that.message._setStaticMessage('Your account has been created. We have sent you an email to activate your account.');
                    },

                    error: function(model, response, options) {
                        if(response.status === 400) {
                            var errors = JSON.parse(response.responseText);

                            var parsedErrors = [];
                            _.each(errors, function(error, key) {
                                switch(key) {
                                    case 'email':
                                        parsedErrors.push({
                                            email: error.toString()
                                        });
                                        break;
                                    case 'password':
                                        parsedErrors.push({
                                            password: error.toString()
                                        });
                                        break;
                                    case 'password_repeat':
                                        parsedErrors.push({
                                            password_repeat: error.toString()
                                        });
                                        break;
                                }
                            });
                            that._showErrors(parsedErrors, 'create');
                        } else {
                            that.message._setStaticMessage(that.message._customErrors.error);
                        }
                    }
                });
            } else {
                this._showErrors(validator, 'create');
            }
        },
        
        _showErrors: function(errors, form) {
            for (var key in errors) {
               var obj = errors[key];
               for (var prop in obj) {
                  if(obj.hasOwnProperty(prop)){
                    $error = $('.error-' + form + '-' + prop);
                    $error.text(obj[prop]);
                    $error.css('display', 'block');
                  }
               }
            }
        },

        _cleanAllErrors: function() {
            $errors = $('.error');
            _.each($errors, function(error) {
                $(error).css('display', 'none');
                $(error).text('');
            });
        },

        _cleanSingleError: function(event) {
            var $error  = $('.error-' + event.currentTarget.name);
            $error.css('display', 'none');
            $error.text('');
        }
    });

    return RegistrationView;

});
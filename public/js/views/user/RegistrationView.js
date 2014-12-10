define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/user/registrationViewTemplate.html',
    'helpers/Message',
    'models/UserModel'
], function($, _, Backbone, Handlebars, registrationView, Message, UserModel) {

    var RegistrationView = Backbone.View.extend({

        template: Handlebars.compile(registrationView),

        el: $('#registration'),

        events: {
            'click #log-in': '_logIn',
            'click #create': '_createAccount'
        },

        initialize: function() {
            this.message = Message.getInstance();
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            return this;
        },

        _logIn: function(event) {
            event.preventDefault();
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
            this.cleanAllErrors();

            var validator = user._validateCreate(),
                that = this;

            if (_.isEmpty(validator)) {
                user.save(null, 
                    {
                    url: user.url + 'account',
                    success: function(model, response, options) {
                        console.log('Your account has been created!');
                    },

                    error: function(model, response, options) {
                        if(response.status === 400) {
                            var errors = JSON.parse(response.responseText);
                            // parse response

                            // that.showErrors();
                        } else {
                            // show static message error
                        }
                    }
                });
            } else {
                this.showErrors(validator);
            }
        },
        
        showErrors: function(errors) {
            console.log(errors);
            errors.forEach(function(objArr) {
                $error = $('.error-' + objArr.key);
                $error.text(objArr.value);
                $error.css('display', 'block');
            });
        },

        cleanAllErrors: function() {
            $errors = $('.error');
            _.each($errors, function(error) {
                $(error).css('display', 'none');
                $(error).text('');
            });
        }
    });

    return RegistrationView;

});

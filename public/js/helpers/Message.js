/*
* Message  Class
*/
define([
    'jquery',
    'underscore'
    ], function($, _) {
        var Message  = (function() {
            var instance;

            function createInstance() {
                return {

                    _customErrors: {
                        error: 'There has been an error, please try again later.',
                    },

                    _setFlashMessage: function(msg) {
                        $flashMessage = $('#flash-message');

                        // make sure any previoys animation is stopped
                        $flashMessage.stop();
                        clearInterval(this.timeout);

                        $flashMessage.text(msg);
                        $flashMessage.animate({
                            opacity: 1
                        });
                        
                        this.timeout = setTimeout(function () {
                            $flashMessage.animate({
                                opacity: 0
                            },function() {
                                $('#serverResponse').text('');
                            });
                        }, 1500);
                    },

                    _setStaticMessage: function(msg) {
                        $flashMessage = $('#flash-message');
                        $flashMessage.text(msg);
                        $flashMessage.animate({
                            opacity: 1
                        });
                    }               
                };
            }

            return {

                getInstance: function() {
                    if(!instance) {
                        instance = createInstance();
                    }
                    return instance;
                }

            }
        }); 

return new Message;

}); 
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates',
    handlebars: 'libs/handlebars/handlebars',
    jqueryCookie: 'libs/jquery/jquery.cookie'
  }

});

require([
  'app',
  'jqueryCookie'
], function(App, Message) {
	// set up CSRF token in requests header
	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
		return jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'));
	});

	// Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
	$.ajaxSetup({
	    statusCode: {
	        401: function(){
	            // Redirec the to the login page.
	            $.cookie('_auth', false);
	            window.location.replace('/#login');
	        },
	        403: function() {
	            // 403 -- Access denied
	            $.cookie('_auth', false);
	            window.location.replace('/#login');
	        }
	    }
	});
    
	// set up application
	App.initialize();
});
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
  'app'
], function(App) {
   	// set up application
	App.initialize();
});
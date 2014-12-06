<?php

Route::group(array('prefix' => 'api/v1'), function()
{
	/** 
	 * Unauthenticaded group
	 */
	Route::group(array('before' => 'guest'), function() 
	{ 
		Route::post('user/sign-in', array(
			'as' => 'user.sign.in',
			'uses' => 'v1\UsersController@postSignIn'
			));
	});

	/** 
	 * Authenticaded group
	 */
	Route::group(array('before' => 'auth'), function() 
	{ 	
		/*
		 *	Sign out (GET)
		 */
		Route::get('user/sign-out', array(
			'as' => 'user.sign.out',
			'uses' => 'v1\UsersController@getSignOut'
			));
	});
});
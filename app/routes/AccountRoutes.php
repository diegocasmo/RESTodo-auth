<?php
/**
 * API v1 routes
 */
Route::group(array('prefix' => 'api/v1'), function()
{
	/** 
	 * Unauthenticaded group
	 */
	Route::group(array('before' => 'guest'), function() { 
		/** 
		 * Account reources
		 */
	    Route::resource('account', 'v1\AccountController');
	});
});

/** 
 * Unauthenticaded group
 */
Route::group(array('before' => 'guest'), function() { 
	/** 
	 * Activate account (GET)
	 */
	Route::get('account/activate/{code}', array(
		'as' => 'account.activate',
		'uses' => 'v1\AccountController@activateAccount'
		));
});
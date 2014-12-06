<?php

Route::group(array('prefix' => 'api/v1'), function()
{
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

		/** 
		 * Account reources
		 */
	    Route::resource('account', 'v1\AccountController');
	});
});
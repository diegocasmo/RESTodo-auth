<?php

/**
 * API v1 routes
 */
Route::group(array('prefix' => 'api/v1'), function()
{
    /** 
     * Unauthenticaded group
     */
    Route::group(array('before' => 'auth'), function() { 
        /*
         *  Sign out (GET)
         */
        Route::get('user/test', function() {
            echo 'test';
        });
    });
});
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
        /** 
         * Todos reources
         */
        Route::resource('todo', 'v1\TodosController');

        /*
         *  Test route for auth (GET)
         */
        Route::get('user/test', function() {
            echo 'test';
        });
    });
});
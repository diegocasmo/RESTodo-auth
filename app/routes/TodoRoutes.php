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
        Route::resource('todos', 'v1\TodosController');
    });
});
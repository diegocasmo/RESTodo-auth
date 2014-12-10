<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

App::bind('AccountRepositoryInterface', 'EloquentAccountRepository');
App::bind('UserRepositoryInterface', 'EloquentUserRepository');

/** 
 * Make sure all POST, PUT, DELETE
 * requests are protected against CSRF
 */
Route::when('*', 'csrf', array('post', 'put', 'delete'));

/** 
 * Unauthenticaded group
 */
Route::group(array('before' => 'guest'), function() 
{ 
    /** 
     * Render home view
     */
    Route::get('/', array(
        'as' => 'index',
        'uses' => 'BaseController@index'
        ));
});

require 'routes/AccountRoutes.php';
require 'routes/UserRoutes.php';
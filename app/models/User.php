<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * Values of the User model which can be filled.
	 * @var array
	 */
	protected $fillable = array('email', 'password', 'code', 'active');

	/**
	 * Validation rules for User model
	 */
    public static $rules = array(
    	'email'       => 'unique:users|required|email',
		'password' => 'required|min:6',
		'password_repeat' => 'required|same:password'
    );

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('id', 'password', 'code', 'active');

	/**
	 * Model relationship with todos model
	 */
	public function todos()
	{
		return $this->hasMany('Todo', 'user_id');
	}

}

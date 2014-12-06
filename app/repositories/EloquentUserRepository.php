<?php

class EloquentUserRepository implements UserRepositoryInterface {
	
	/*
	 * Sign in a user if credentials 
	 * and validation are both are correct
	 */
	public function store(array $user) {
		// validate user
		$this->validate($user);

		$userAttempt = array(
				'email' => $user['email'],
				'password' => $user['password'],
				'active' => 1
			);

		// attempt to log in user
		if(!Auth::attempt($userAttempt)) 
		{
			throw new UnauthorizedException();
		}

		return Auth::user();
	}

	/*
	 * Sign out a user
	 */
	public function getSignOut() {
		Auth::logout();
	}

	/** 
	 * Validates user according to sign in rules
	 * set on User model
	 */
	public function validate(array $user)
	{
		$validator = Validator::make($user, User::$signInRules);
		if($validator->fails()) throw new ValidationException($validator);
		return true;
	}

	public function instance($user = array())
	{
		return new User($user);
	}

}
<?php

class EloquentAccountRepository implements AccountRepositoryInterface {

	/** 
	 * Stores a user on DB if it passes validation correctly.
	 * Hashes password and sets code and active to 0
	 * @return User
	 */
	public function store(array $user)
	{
		$user += array(
			'code' => str_random(30),
			'active' => 0
			);

		$this->validate($user);
		// make sure password is hashed before being
		// save to DB
		$user['password'] = Hash::make($user['password']);
		$user = User::create($user);

		if(!$user)
		{
			throw new Exception();
		}
		
		$this->sendUserEmail($user);

		return $user;
	}

	/** 
	 * Activates and account according to random code
	 * assigned to it upon registration
	 * @return User
	 */
	public function activateByCode($code) {
		$user = User::where('code', '=', $code)->where('active', '=', 0);
		if($user->count()) 
		{
			$user = $user->first();

			// Update user to active
			$user->active = 1;
			$user->code = '';

			if ($user->save()) 
			{	
				return $user;
			}
		}

		throw new PermissionException('Action not allowed');
	}

	public function sendUserEmail($user) {
			// Send email
			Mail::send('emails.auth.activate', array('link' => URL::route('account.activate', $user->code)), function($message) use ($user) {
				$message->to($user->email)->subject('Activate your account');
			});
	}
	/** 
	 * Validates user according to rules
	 * set on User model
	 */
	public function validate(array $user)
	{
		$validator = Validator::make($user, User::$rules);
		if($validator->fails()) throw new ValidationException($validator);
		return true;
	}

	public function instance($user = array())
	{
		return new User($user);
	}

}
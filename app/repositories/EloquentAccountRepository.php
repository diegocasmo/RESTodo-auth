<?php

class EloquentAccountRepository implements AccountRepositoryInterface {

	public function store($user)
	{
		$user += array(
			'code' => str_random(30),
			'active' => 0
			);

		$this->validate($user);
		// make sure password is hashed before being
		// save to DB
		$user['password'] = Hash::make($user['password']);
		return User::create($user);
	}

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

	public function validate($user)
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
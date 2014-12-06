<?php

namespace v1;

use BaseController;
use UserRepositoryInterface;
use Input;

class UsersController extends \BaseController {

    /**
     * Inject user repository instance in controller
     */
    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

	/**
	 * Attemps to sign in a user
	 */
	public function postSignIn()
	{
		return $this->users->store(Input::all());
	}

	/**
	 * Sign out a user
	 */
	public function getSignOut()
	{
		return $this->users->getSignOut();
	}
}
<?php

namespace v1;

use BaseController;
use UserRepositoryInterface;
use Input;
use Redirect;

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
		return $this->users->postSignIn(Input::all());
	}

	/**
	 * Sign out a user
	 */
	public function getSignOut()
	{
		$this->users->getSignOut();     
	}
}
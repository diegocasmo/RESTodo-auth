<?php

namespace v1;

use BaseController;
use AccountRepositoryInterface;
use Input;

class AccountController extends \BaseController {
    
    /**
     * Inject account repository instance in controller
     */
    public function __construct(AccountRepositoryInterface $accounts)
    {
        $this->accounts = $accounts;
    }

	/**
	 * Store a newly created account in storage.
	 * POST /accounts
	 *
	 * @return Response
	 */
	public function store()
	{	
		$user = array(
			'email' => Input::get('email'),
			'password' => Input::get('password'),
			'password_repeat' => Input::get('password_repeat'),
			'code' => str_random(30),
			'active' => 0
			);
		return $this->accounts->store($user);	
	}

	/**
	 * Activate account using the random
	 * code
	 */
	public function activateAccount($code) {
		return $this->accounts->activateByCode($code);
	}
}
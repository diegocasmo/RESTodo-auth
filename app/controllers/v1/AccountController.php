<?php

namespace v1;

use BaseController;
use AccountRepositoryInterface;
use Input;
use Redirect;

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
		$this->accounts->store(Input::all());	
        return  Redirect::route('index')
               ->with('success', 'Your account has been created. We have sent you an email to activate your account.');
	}

	/**
	 * Activate account using the random
	 * code
 	 * @return Response
	 */
	public function activateAccount($code) {
		$this->accounts->activateByCode($code);
        return  Redirect::route('index')
                ->with('success', 'Good news! Your account has been activated, you can now sign in.');
	}
}
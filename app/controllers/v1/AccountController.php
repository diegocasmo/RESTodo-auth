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
		return $this->accounts->store(Input::all());	
	}

	/**
	 * Activate account using the random
	 * code
 	 * @return Response
	 */
	public function activateAccount($code) {
		return $this->accounts->activateByCode($code);
	}
}
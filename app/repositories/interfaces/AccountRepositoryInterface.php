<?php

interface AccountRepositoryInterface {
	public function store($user);
	public function activateByCode($code);
	public function validate($user);
	public function instance();
}
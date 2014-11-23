<?php

interface AccountRepositoryInterface {
	public function store(array $user);
	public function activateByCode($code);
	public function validate(array $user);
	public function instance();
}
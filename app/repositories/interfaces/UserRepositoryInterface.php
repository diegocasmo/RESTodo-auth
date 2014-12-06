<?php

interface UserRepositoryInterface {
	public function store(array $user);
	public function getSignOut();
	public function validate(array $user);
	public function instance();
}
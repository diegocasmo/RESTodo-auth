<?php

interface UserRepositoryInterface {
	public function postSignIn(array $user);
	public function getSignOut();
	public function validate(array $user);
	public function instance();
}
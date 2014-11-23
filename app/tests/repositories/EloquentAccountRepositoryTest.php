<?php

class EloquentAccountRepositoryTest extends TestCase {

	public function setUp()
	{
		parent::setUp();
		$this->repo = App::make('EloquentAccountRepository');
	}

	public function testValidatePasses()
	{
		$user = $this->repo->validate(array(
			'email'       => 'test@test.com',
			'password'     => 'admin123.',
			'password_repeat' => 'admin123.'
		));

		$this->assertTrue($user);
	}

	public function testValidateFailsWithoutEmail()
	{
		try {
			$user = $this->repo->validate(array(
				'password'     => 'admin123.',
				'password_repeat' => 'admin123.'
			));
		}
		catch(ValidationException $expected)
		{
			return;
		}

		$this->fail('ValidationException was not raised');
	}

	public function testValidateFailsWithoutPassword()
	{
		try {
			$user = $this->repo->validate(array(
				'email'       => 'test@test.com',
				'password_repeat' => 'admin123.'
			));
		}
		catch(ValidationException $expected)
		{
			return;
		}

		$this->fail('ValidationException was not raised');
	}

	public function testValidateFailsWithoutPasswordRepeat()
	{
		try {
			$user = $this->repo->validate(array(
				'email'       => 'test@test.com',
				'password'     => 'admin123.'
			));
		}
		catch(ValidationException $expected)
		{
			return;
		}

		$this->fail('ValidationException was not raised');
	}

	public function testValidateFailsWithoutRealEmail()
	{
		try {
			$user = $this->repo->validate(array(
				'email'       => 'test',
				'password'     => 'admin123.',
				'password_repeat' => 'admin123.'
			));
		}
		catch(ValidationException $expected)
		{
			return;
		}

		$this->fail('ValidationException was not raised');
	}

	public function testValidateFailsDifferentPasswords()
	{
		try {
			$user = $this->repo->validate(array(
				'email'       => 'test@gmail.com',
				'password'     => 'admin123.',
				'password_repeat' => 'admin456.'
			));
		}
		catch(ValidationException $expected)
		{
			return;
		}

		$this->fail('ValidationException was not raised');
	}

	public function testValidateFailsWeakPasswords()
	{
		try {
			$user = $this->repo->validate(array(
				'email'       => 'test@gmail.com',
				'password'     => '123',
				'password_repeat' => '123'
			));
		}
		catch(ValidationException $expected)
		{
			return;
		}

		$this->fail('ValidationException was not raised');
	}

	public function testStoreReturnsModel()
	{
		$user = array(
			'email'       => 'test@test.com',
			'password'     => 'admin123.',
			'password_repeat' => 'admin123.'
		);

		$user = $this->repo->store($user);

		$this->assertTrue($user instanceof Illuminate\Database\Eloquent\Model);
		$this->assertTrue($user->email === $user['email']);
		$this->assertTrue($user->password === $user['password']);
	}

	public function testActivateByCodeReturnsModel()
	{
		$user = array(
			'email'       => 'test2@test.com',
			'password'     => 'admin123.',
			'password_repeat' => 'admin123.'
		);

		$user = $this->repo->store($user);

		$user = $this->repo->activateByCode($user->code);

		$this->assertTrue($user instanceof Illuminate\Database\Eloquent\Model);
		$this->assertTrue($user->email === $user['email']);
		$this->assertTrue($user->password === $user['password']);
	}
	
}
<?php

class AccountControllerTest extends TestCase {
	
	public function testStoreShouldCallStoreMethod() {
		$mock = Mockery::mock('AccountRepositoryInterface');
		$mock->shouldReceive('store')->once()->andReturn('foo');
		App::instance('AccountRepositoryInterface', $mock);
		
		$response = $this->call('POST', route('api.v1.account.store'));
		$this->assertTrue(!! $response->original);
	}

	public function testActiveAccountShouldCallActivateByCodeMethod() {
		$mock = Mockery::mock('AccountRepositoryInterface');
		$mock->shouldReceive('activateByCode')->once()->andReturn('foo');
		App::instance('AccountRepositoryInterface', $mock);

		$response = $this->call('GET', 'api/v1/account/activate/123');
		$this->assertTrue(!! $response->original);
	}
	
}
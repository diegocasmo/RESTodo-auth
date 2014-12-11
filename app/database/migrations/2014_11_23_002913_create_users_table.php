<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	public function up()
	{
		Schema::create('users', function(Blueprint $table) {
			$table->increments('id');
			$table->string('email', 255)->unique();
			$table->text('password');
			$table->text('code');
			$table->tinyInteger('active')->default('0');
			$table->string('remember_token')->nullable();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('users');
	}
}
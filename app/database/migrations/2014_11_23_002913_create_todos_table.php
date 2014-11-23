<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTodosTable extends Migration {

	public function up()
	{
		Schema::create('todos', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->text('todo');
			$table->tinyInteger('status')->default('0');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('todos');
	}
}
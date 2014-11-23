<?php

class TodosTableSeeder extends Seeder {

	public function run()
	{
        $todos = array(
            array(
                'user_id'       => 1,
                'todo'     => 'Lorem ipsum Reprehenderit velit est irure in enim in magna aute occaecat qui velit ad.',
                'status' => 1,
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ),
            array(
                'user_id'       => 1,
                'todo'     => 'Lorem ipsum Reprehenderit.',
                'status' => 0,
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            )
        );

        DB::table('todos')->insert($todos);
	}

}
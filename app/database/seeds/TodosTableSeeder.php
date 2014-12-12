<?php

class TodosTableSeeder extends Seeder {

	public function run()
	{
        $todos = array(
            array(
                'user_id'       => 1,
                'title'     => 'Lorem ipsum Reprehenderit velit est irure in enim in magna aute occaecat qui velit ad.',
                'done' => 1,
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ),
            array(
                'user_id'       => 1,
                'title'     => 'Lorem ipsum Reprehenderit.',
                'done' => 0,
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            )
        );

        DB::table('todos')->insert($todos);
	}

}
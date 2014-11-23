<?php

class UsersTableSeeder extends Seeder {

	public function run()
	{
        $users = array(
            array(
                'email'       => 'active@email.com',
                'password'     => Hash::make('password_1'),
                'code' => '',
                'active'  => 1,
                'updated_at'  => date('Y-m-d H:i:s'),
            ),
            array(
                'email'       => 'unactive@email.com',
                'password'     => Hash::make('password_2'),
                'code' => str_random(30),
                'active'  => 0,
                'updated_at'  => date('Y-m-d H:i:s'),
            )
        );

        DB::table('users')->insert($users);
	}

}
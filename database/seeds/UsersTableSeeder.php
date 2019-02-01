<?php

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('secret'),
                'role' => 1,
                'avatar' => 'avatar.jpg'
            ],
            [
                'name' => 'seller',
                'email' => 'seller@gmail.com',
                'password' => bcrypt('secret'),
                'role' => 2,
                'avatar' => 'avatar.jpg'
            ],
            [
                'name' => 'user',
                'email' => 'user@gmail.com',
                'password' => bcrypt('secret'),
                'role' => 3,
                'avatar' => 'avatar.jpg'
            ]

        ]);
    }
}

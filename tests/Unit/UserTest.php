<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
    */
    public function a_user_requires_a_name()
    {
        $user = [
            'email' => 'lorem@mail.com',
            'password' => bcrypt('secret'),
            'avatar' => 'lorem.jpg'
        ];

    	$this->expectException('\Illuminate\Database\QueryException');

    	\App\User::create($user);
    }

    /**
     * @test
    */
    public function a_user_requires_an_email()
    {
    	$user = [
    		'name' => 'lorem',
    		'password' => bcrypt('secret'),
            'avatar' => 'lorem'
    	];

    	$this->expectException('\Illuminate\Database\QueryException');

    	\App\User::create($user);
    }

    /**
     * @test
    */
    public function a_user_requires_a_password()
    {
    	$user = [
    		'name' => 'lorem',
    		'email' => 'lorem@mail.com',
            'avatar' => 'lorem.jpg'
    	];

    	$this->expectException('\Illuminate\Database\QueryException');

    	\App\User::create($user);
    }

    /**
     * @test
     */
    public function it_requires_an_avatar()
    {
        $user = [
            'name' => 'lorem',
            'email' => 'lorem@mail.com',
            'password' => bcrypt('lorem')
        ];

        $this->expectException('\Illuminate\Database\QueryException');

        \App\User::create($user);
    }

    /**
     * @test
     */
    public function it_requires_a_role()
    {
        $user = [
            'name' => 'lorem',
            'email' => 'lorem@mail.com',
            'password' => bcrypt('lorem'),
            'avatar' => 'lorem.jpg'
        ];

        $this->expectException('\Illuminate\Database\QueryException');

        \App\User::create($user);
    }
}

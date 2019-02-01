<?php

namespace Tests;

use App\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Feature\UsersApiTest;
use JWTAuth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Authenticates a new \App\User instance
     * receives attributes to overwrite the factory defaults
     *
     * @param array $attributes
     * @return array
     */
    protected function authenticate($attributes = [])
    {
        $user = factory(User::class)->create($attributes);

        $headers = [];

        if (!is_null($user)) {
            $token = JWTAuth::fromUser($user);
            JWTAuth::setToken($token);
            $headers['Authorization'] = 'Bearer '.$token;

        }


        return $headers;
    }
}

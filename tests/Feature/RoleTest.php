<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_fetch_all_users()
    {
        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios')
            ->assertStatus(403)
            ->assertJson([ 'message' => 'This action is unauthorized.']);
    }

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_create_a_user()
    {
        $headers = $this->authenticate(['role' => 3]);

        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'name' => 'lorem',
            'role' => 1,
            'email' => 'lorem@email.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'avatar' => $file
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data)
            ->assertStatus(403)
            ->assertJson([ 'message' => 'This action is unauthorized.']);
    }

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_update_another_user()
    {
        factory(User::class)->create();

        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.User::first()->id, [ 'name' => 'ipsum'])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function a_common_user_can_update_itself()
    {
        $headers = $this->authenticate(['role' => 3]);
        
        $user = User::find(1);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'name' => 'ipsum'])
            ->assertStatus(200);
        $this->assertEquals($user->fresh()->name, 'ipsum');
    }

    /**
     * @test
     */
    public function a_common_user_can_fetch_only_its_information()
    {
        factory(User::class)->create();

        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios/1')
            ->assertStatus(403);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios/2')
            ->assertStatus(200)
            ->assertSee(auth()->user()->name);
    }

    /**
     * @test
     */
    public function a_common_user_can_soft_delete_itself()
    {
        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => false])
            ->assertStatus(202);
    }

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_soft_delete_other_users()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, ['delete_permanently' => false])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_delete_permanently_itself()
    {
        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => true])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_delete_permanently_other_users()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, ['delete_permanently' => true])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function a_common_user_is_not_allowed_to_restore_itself()
    {
        $headers = $this->authenticate(['role' => 3]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => false])
            ->assertStatus(202);

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/1/restaurar')
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function a_seller_can_fetch_all_registered_users()
    {
        $headers = $this->authenticate(['role' => 2]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios')
            ->assertStatus(200)
            ->assertSee(auth()->user()->name);
    }

    /**
     * @test
     */
    public function a_seller_can_fetch_any_user_information()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 2]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios/'.$user->id)
            ->assertStatus(200)
            ->assertSee($user->name);
    }

    /**
     * @test
     */
    public function a_seller_is_not_allowed_to_create_a_user()
    {
        $headers = $this->authenticate(['role' => 2]);

        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'name' => 'lorem',
            'role' => 1,
            'email' => 'lorem@email.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'avatar' => $file
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data)
            ->assertStatus(403)
            ->assertJson([ 'message' => 'This action is unauthorized.']);
    }


    /**
     * @test
     */
    public function a_seller_can_update_any_user_information()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 2]);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'name' => 'ipsum'])
            ->assertStatus(200);
        $this->assertEquals($user->fresh()->name, 'ipsum');
    }

    /**
     * @test
     */
    public function a_seller_can_soft_delete_any_user()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 2]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, ['delete_permanently' => false])
            ->assertStatus(202);
    }

    /**
     * @test
     */
    public function a_seller_is_not_allowed_to_delete_permanently_any_user()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 2]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, ['delete_permanently' => true])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function a_seller_is_not_allowed_to_restore_any_user()
    {
        $headers = $this->authenticate(['role' => 2]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => false])
            ->assertStatus(202);

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/1/restaurar')
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function an_admin_can_creates_users()
    {
        $headers = $this->authenticate(['role' => 1]);

        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'name' => 'lorem',
            'role' => 1,
            'email' => 'lorem@email.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'avatar' => $file
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data)
            ->assertStatus(201)
            ->assertSee($data['name']);
    }

    /**
     * @test
     */
    public function an_admin_can_fetch_all_registered_users()
    {
        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios')
            ->assertStatus(200)
            ->assertSee(auth()->user()->name);
    }

    /**
     * @test
     */
    public function an_admin_can_fetch_any_user_information()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios/'.$user->id)
            ->assertStatus(200)
            ->assertSee($user->name);
    }

    /**
     * @test
     */
    public function an_admin_can_update_any_user_information()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'name' => 'ipsum'])
            ->assertStatus(200);

        $this->assertEquals($user->fresh()->name, 'ipsum');
    }

    /**
     * @test
     */
    public function an_admin_can_soft_delete_any_user()
    {
        $user = factory(User::class)->create();

        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, ['delete_permanently' => false])
            ->assertStatus(202);
    }

    /**
     * @test
     */
    public function an_admin_can_delete_permanently_other_users()
    {
        factory(User::class)->create();

        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => true])
            ->assertStatus(202);
    }

    /**
     * @test
     */
    public function an_admin_is_not_allowed_to_permanently_delete_itself()
    {
        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => true])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function an_admin_can_restore_other_users()
    {
        factory(User::class)->create();

        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => false])
            ->assertStatus(202);

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/1/restaurar')
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function an_admin_cannot_restore_itself()
    {
        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/1', ['delete_permanently' => false])
            ->assertStatus(202);

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/1/restaurar')
            ->assertStatus(403);
    }
}

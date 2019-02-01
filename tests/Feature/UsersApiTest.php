<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UsersApiTest extends TestCase
{
	use RefreshDatabase;

    /**
     * @test
    */
    public function it_fetches_all_users()
    {
        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios')
    		->assertSee(User::first()->name);
    }

    /**
     * @test
    */
    public function it_fetches_a_single_user()
    {
        $headers = $this->authenticate(['role' => 1]);

        $user = User::first();

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios/'.$user->id)
    		->assertSee($user->name);
    }

    /**
     * @test
     */
    public function it_throws_an_exception_when_user_was_not_found()
    {
        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios/10')
            ->assertStatus(404)
            ->assertJson(['message' => 'No query results for model [App\\User] 10']);
    }

    /**
     * @test
    */
    public function only_an_authenticated_user_can_interact_with_the_api()
    {
    	$user = factory(User::class)->create(['role' => 1]);

    	$this->json('GET', '/api/v1/usuarios')
    		->assertJson([ 'status' => 'Authorization Token not found' ])
    		->assertDontSee($user->name);

        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('GET', '/api/v1/usuarios')
    		->assertStatus(200);
    }

    /**
     * @test
    */
    public function it_creates_a_user()
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
    		->assertStatus(201);

        Storage::assertExists('/public/avatars/'.User::find(2)->avatar);

    	$this->assertDatabaseHas('users', ['name' => 'lorem']);
    }

    /**
     * @test
     */
    public function it_returns_the_created_user()
    {
        $headers = $this->authenticate(['role' => 1]);

        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'name' => 'lorem',
            'email' => 'lorem@email.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'role' => 3,
            'avatar' => $file
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data)
            ->assertSee('lorem@email.com');
    }

    /**
     * @test
    */
    public function it_validates_the_request_data_when_creating_a_user()
    {
        $headers = $this->authenticate(['role' => 1]);

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', [])
    		->assertStatus(422)
    		->assertJsonValidationErrors(['name', 'email', 'password', 'avatar', 'role']);

    	$this->assertCount(1, User::all());
    }

    /**
     * @test
     */
    public function it_validates_a_unique_email_when_creating_a_user()
    {
        $headers = $this->authenticate(['email' => 'lorem@email.com', 'role' => 1]);

        $data = [
            'name' => 'lorem',
            'email' => 'lorem@email.com',
            'password' => bcrypt('secret')
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * @test
     */
    public function it_updates_a_user_attributes()
    {
        $headers = $this->authenticate(['name' => 'lorem']);

        $user = User::first();

        $this->assertEquals('lorem', $user->name);

        $data = [
            'name' => 'ipsum',
            'role' => 1,
            'email' => 'ipsum@email.com',
            'password' => bcrypt('secret1')
        ];

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, $data)
            ->assertStatus(200);

        $user = $user->fresh();

        $this->assertEquals('ipsum', $user->name);
        $this->assertEquals('ipsum@email.com', $user->email);
    }

    /**
     * @test
     */
    public function it_validates_the_update_request_attributes()
    {
        $headers = $this->authenticate(['name' => 'lorem']);

        $user = User::first();

        $this->assertEquals('lorem', $user->name);

        $data = [
            'name' => ['name' => 'lorem'],
            'email' => 'hello world',
            'password' => '',
        ];

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, $data)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /**
     * @test
     */
    public function it_updates_a_single_user_attribute()
    {
        $headers = $this->authenticate(['name' => 'lorem']);

        $user = User::first();

        $this->assertEquals('lorem', $user->name);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'name' => 'ipsum' ])
            ->assertStatus(200);

        $this->assertEquals('ipsum', $user->fresh()->name);
    }

    /**
     * @test
     */
    public function it_returns_the_updated_user()
    {
        $headers = $this->authenticate(['name' => 'lorem']);

        $user = User::first();

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'name' => 'ipsum' ])
            ->assertStatus(200)
            ->assertSee('ipsum');
    }

    /**
     * @test
     */
    public function it_validates_a_unique_email_when_updating_a_user()
    {
        $headers = $this->authenticate(['email' => 'lorem@mail.com', 'role' => 1]);

        $user = factory(User::class)->create(['email' => 'ipsum@mail.com']);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'email' => 'lorem@mail.com' ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * @test
     */
    public function it_throws_an_exception_when_user_to_be_updated_was_not_found()
    {
        $headers = $this->authenticate();

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/10', ['name' => 'lorem'])
            ->assertStatus(404)
            ->assertJson(['message' => 'No query results for model [App\\User] 10']);
    }

    /**
     * @test
     */
    public function it_updates_a_user_avatar()
    {
        $headers = $this->authenticate(['role' => 1]);

        $data = [
            'name' => 'lorem',
            'email' => 'lorem@email.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'role' => 2,
            'avatar' => UploadedFile::fake()->image('avatar.jpg')
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data)
            ->assertStatus(201);

        $user = User::find(2);

        Storage::assertExists('public/avatars/'.$user->avatar);

        $this->withHeaders($headers)->json('PUT', '/api/v1/usuarios/'.$user->id, [ 'avatar' => UploadedFile::fake()->image('avatar2.jpg') ])
            ->assertStatus(200);

        Storage::assertMissing('public/avatars/'.$user->avatar);
        Storage::assertExists('public/avatars/'.$user->fresh()->avatar);
    }

    /**
     * @test
     */
    public function it_deletes_avatar_file_when_user_is_deleted_permanently()
    {
        $headers = $this->authenticate(['role' => 1]);

        $data = [
            'name' => 'lorem',
            'email' => 'lorem@email.com',
            'password' => 'secret',
            'password_confirmation' => 'secret',
            'role' => 2,
            'avatar' => UploadedFile::fake()->image('avatar.jpg')
        ];

        $this->withHeaders($headers)->json('POST', '/api/v1/usuarios', $data);

        $user = User::find(2);

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, [ 'delete_permanently' => true]);

        Storage::assertMissing('public/avatars/'.$user->avatar);
    }
    
    /**
     * @test
     */
    public function it_can_soft_delete_a_user()
    {
        $headers = $this->authenticate(['role' => 1]);

        $user = factory(User::class)->create();

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, [ 'delete_permanently' => false ])
            ->assertStatus(202)
            ->assertJson(['message' => 'The user has been deleted.']);

        $this->assertDatabaseHas('users', [ 'name' => $user->name ]);
        $this->assertDatabaseHas('users', [ 'deleted_at' => $user->fresh()->deleted_at ]);
    }

    /**
     * @test
     */
    public function it_throws_an_exception_when_user_to_be_soft_deleted_was_not_found()
    {
        $headers = $this->authenticate();

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/10')
            ->assertStatus(404)
            ->assertJson(['message' => 'No query results for model [App\\User] 10']);
    }

    /**
     * @test
     */
    public function it_can_restore_a_soft_deleted_user()
    {
        $headers = $this->authenticate(['role' => 1]);

        $user = factory(User::class)->create();

        $user->delete();

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/'.$user->id.'/restaurar')
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function it_throws_an_exception_if_the_user_to_be_restored_is_not_soft_deleted()
    {
        $headers = $this->authenticate(['role' => 1]);

        $user = factory(User::class)->create();

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/'.$user->id.'/restaurar')
        ->assertStatus(422)
        ->assertJson([ 'message' => 'The user is not soft deleted.']);
    }

    /**
     * @test
     */
    public function it_throws_an_exception_if_the_user_to_be_restored_is_not_found()
    {
        $headers = $this->authenticate();

        $this->withHeaders($headers)->json('PATCH', '/api/v1/usuarios/10/restaurar')
            ->assertStatus(404)
            ->assertJson([ 'message' => 'No query results for model [App\\User] 10']);
    }

    /**
     * @test
     */
    public function it_can_permanently_delete_a_user()
    {
        $headers = $this->authenticate(['role' => 1]);

        $user = factory(User::class)->create();

        $this->withHeaders($headers)->json('DELETE', '/api/v1/usuarios/'.$user->id, ['delete_permanently' => true])
            ->assertStatus(202)
            ->assertJson(['message' => 'The user has been permanently deleted.']);

        $this->assertDatabaseMissing('users', [ 'name' => $user->name ]);
    }

}

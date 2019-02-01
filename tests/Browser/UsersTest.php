<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UsersTest extends DuskTestCase
{
    use DatabaseMigrations;
    /**
     * A Dusk test example.
     * @test
     * @return void
     */
    public function a_user_can_view_all_registered_users()
    {
        $users = factory(\App\User::class, 2)->create();

        $this->browse(function (Browser $browser)  use ($users) {
            
            $browser->visit('/usuarios')
                ->assertSee('Usuarios');

            $browser
                ->waitForText($users[0]->name)
                ->assertSee($users[0]->name);

            $browser
                ->waitForText($users[1]->name)
                ->assertSee($users[1]->name);
                        
        });
    }
}

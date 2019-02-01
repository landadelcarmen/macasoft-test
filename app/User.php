<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes;

    public static function boot() {
        parent::boot();

        static::creating(function (User $user) {
            if(!$user->avatar) {
                $user->avatar = static::generateAvatar();
            }
        });
    }

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Checks if authenticated user has an admin role
     *
     * @return boolean
     */
    public function isAdmin()
    {
        return auth()->user()->role == 1;
    }

    /**
     * Checks if authenticated user has an admin role
     *
     * @return boolean
     */
    public function isSeller()
    {
        return auth()->user()->role == 2;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function generateAvatar()
    {
        $icon = new \Jdenticon\Identicon();
        $name = str_random(10);
        $icon->setValue($name);
        $icon->setSize(200);
        Storage::put('public/avatars/'.$name.'.png', $icon->getImageData('png'));
        return $name.'.png';

    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUser;
use App\Http\Requests\UpdateUser;
use App\User;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    public function index()
	{
	    $this->authorize('index', User::class);

		return User::all()->chunk(5);
	}

    public function show($user)
    {
        $user = User::findOrFail($user);

        $this->authorize('view', $user);

        return $user;
    }

    public function store(StoreUser $request)
    {
        $this->authorize('create', User::class);

    	return User::create(
    	    $this->requestWithAvatarPath($request->validated())
        );
    }

    public function update(UpdateUser $request, $user)
    {
        $user = User::findOrFail($user);

        $this->authorize('update', $user);

        return tap($user)->update(
            $this->requestWithAvatarPath($request->validated(), $user)
        );


    }

    public function destroy($user)
    {
        $user = User::findOrFail($user);

        $this->authorize('delete', $user);

        request()->validate([
            'delete_permanently' => 'boolean|required'
        ]);

        if(!request()->delete_permanently) {
            $user->delete();

            return response()->json([ 'message' => 'The user has been deleted.' ], 202);
        }

        $this->authorize('forceDelete', $user);

        Storage::delete('public/avatars/'.$user->avatar);

        $user->forceDelete();

        return response()->json([ 'message' => 'The user has been permanently deleted.' ], 202);


    }

    public function restore($user)
    {
        $user = User::withTrashed()->findOrFail($user);

        $this->authorize('restore', $user);

        if(!$user->trashed()) {
            return response()->json([ 'message' => 'The user is not soft deleted.' ], 422);
        }

        return tap($user)->restore();
    }

    /**
     * Stores User avatar
     * @param $user
     * @param $data
     * @return array
     */
    private function requestWithAvatarPath($data, $user = null)
    {
        if($user) {
            Storage::delete('public/avatars/' . $user->avatar);
        }

        if(request()->file('avatar'))
        {
            $fileName = str_random(10) . '.' . request()->file('avatar')->getClientOriginalExtension();

            request()->file('avatar')->storeAs('public/avatars', $fileName);

            $data['avatar'] = $fileName;
        }

        return $data;
    }
}

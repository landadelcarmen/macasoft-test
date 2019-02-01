<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'string|required',
            'role' => 'integer|in:1,2,3|required',
            'email' => 'email|unique:users,email|required',
            'password' => 'string|confirmed|required',
            'avatar' => 'image|file|required'
        ];
    }
}

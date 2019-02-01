<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUser extends FormRequest
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
            'name' => 'sometimes|string|required',
            'email' => 'sometimes|email|unique:users,email|required',
            'role' => 'sometimes|integer|in:1,2,3|required',
            'password' => 'sometimes|string|required',
            'avatar' => 'sometimes|file|image|required'
        ];
    }
}

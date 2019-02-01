<?php

Route::post('login', 'AuthController@authenticate');

Route::apiResource('/v1/usuarios', 'UserController');
Route::patch('/v1/usuarios/{user}/restaurar', 'UserController@restore');



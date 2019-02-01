<?php

Route::post('login', 'AuthController@authenticate');

Route::get('/v1/usuarios', 'UserController@index');
Route::post('/v1/usuarios', 'UserController@store');
Route::get('/v1/usuarios/{user}', 'UserController@show');
Route::delete('/v1/usuarios/{user}', 'UserController@destroy');
Route::put('/v1/usuarios/{user}', 'UserController@update');
Route::patch('/v1/usuarios/{user}/restaurar', 'UserController@restore');



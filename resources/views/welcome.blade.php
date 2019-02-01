@extends('layouts.app')

@section('content')
    <transition name="view-fade" mode="out-in" appear>
    <router-view></router-view>
    </transition>
@endsection
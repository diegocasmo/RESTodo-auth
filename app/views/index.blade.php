@extends('layout.main')
 
@section('content')

    <div class="row app-wrapper main-content">
        <div class="small-12 columns">

        <span id="flash-message" class="flash-message"></span>
        <h1 class="site-title">RESTodo</h1>    

        <div class="user row">
            <div class="small-12 medium-8 small-centered medium-centered columns">
                <div id="user-login"></div>
                <div id="create-account"></div>
            </div>            
        </div>  

        <div class="todos row">
            <div class="small-12 medium-8 small-centered medium-centered columns">
                <span id="errorMessage" class="error" ></span>
                <div id="todo-creator"></div>
                <ul id="todo-list"></ul>
            </div>            
        </div>    

        </div>
    </div>
    
@stop
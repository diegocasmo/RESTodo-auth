<?php

class EloquentTodoRepository implements TodoRepositoryInterface {

    public function index() {
        $todos = User::find(Auth::id())->todos;
        return $todos;
    }

    /** 
     * Validates todo according to rules
     * set on Todo model
     */
    public function validate(array $todo)
    {
        $validator = Validator::make($todo, Todo::$rules);
        if($validator->fails()) throw new ValidationException($validator);
        return true;
    }

    public function instance($todo = array())
    {
        return new Todo($todo);
    }

}
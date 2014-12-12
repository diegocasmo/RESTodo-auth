<?php

class EloquentTodoRepository implements TodoRepositoryInterface {

    public function index() {
        $todos = User::find(Auth::id())->todos;
        return $todos;
    }

    public function store(array $todo) 
    {
        $this->validate($todo);
        
        $todoAttempt = array(
            'user_id' => Auth::id(),
            'title' => $todo['title'],
            'done' => $todo['done']
            );

        $todoAttempt = Todo::create($todoAttempt);

        if(!$todoAttempt) {
            throw new Exception();
        }

        return $todo;
    }

    public function update(array $todo, $id) 
    {
        // check if the user is the owner of this todo
        $this->validate($todo);
        
        $todoAttempt = User::find(Auth::id())->todos()->where('id', '=', $id);
        
        if(!$todoAttempt->count()) {
            throw new NotFoundException();
        }

        $todoAttempt = $todoAttempt->first();

        $todoAttempt->title = $todo['title'];
        $todoAttempt->done = $todo['done'];

        if(!$todoAttempt->save()) {
            throw new Exception();
        }

        return $todo;
    }

    public function destroy(array $todo, $id)
    {
        $todoAttempt = User::find(Auth::id())->todos()->where('id', '=', $id);
        if(!$todoAttempt->count()) {
            throw new NotFoundException();
        }

        $todoAttempt = $todoAttempt->first();
        if(!$todoAttempt->delete()) {
            throw new Exception();
        }
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
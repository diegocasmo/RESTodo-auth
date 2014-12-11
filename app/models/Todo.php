<?php

class Todo extends \Eloquent {
    
    /**
     * Values of the Todo model which can be filled.
     * @var array
     */
	protected $fillable = ['user_id', 'todo', 'status'];
    
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('user_id');

    /**
     * Model relationship with User model
     */
    public function user()
    {
        return $this->belongsTo('User', 'id');
    }

}
<?php

namespace v1;

use BaseController;
use TodoRepositoryInterface;
use Input;
use Response;

class TodosController extends \BaseController {

    /**
     * Inject todo repository instance in controller
     */
    public function __construct(TodoRepositoryInterface $todos)
    {
        $this->todos = $todos;
    }

	/**
	 * Display a listing of the resource.
	 * GET /todos
	 *
	 * @return Response
	 */
	public function index()
	{
		$todos = $this->todos->index();
		return Response::json(
			$todos,
		    200
		);
	}

	/**
	 * Show the form for creating a new resource.
	 * GET /todos/create
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /todos
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 * GET /todos/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /todos/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /todos/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /todos/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
<?php

interface TodoRepositoryInterface {
    public function index();
    public function store(array $todo);
    public function update(array $todo, $id);
    public function destroy(array $todo, $id);
    public function validate(array $todo);
    public function instance();
}
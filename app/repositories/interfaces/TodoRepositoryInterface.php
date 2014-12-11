<?php

interface TodoRepositoryInterface {
    public function index();
    public function validate(array $todo);
    public function instance();
}
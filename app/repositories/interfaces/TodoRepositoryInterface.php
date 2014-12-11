<?php

interface TodoRepositoryInterface {
    public function validate(array $user);
    public function instance();
}
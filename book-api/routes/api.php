<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('get-all-author', [AuthorController::class, 'index']);
    Route::get('get-all-book', [BookController::class, 'index']);
});

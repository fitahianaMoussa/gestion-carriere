<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Routes protégées par le middleware 'auth' et les politiques
Route::middleware(['auth'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])
        ->name('users.index')
        ->middleware('can:viewAny,' . User::class); // Utilisation de la politique

    Route::get('/users/create', [UserController::class, 'create'])
        ->name('users.create')
        ->middleware('can:create,' . User::class); // Utilisation de la politique

    Route::post('/users', [UserController::class, 'store'])
        ->name('users.store')
        ->middleware('can:create,' . User::class); // Utilisation de la politique

    Route::get('/users/{user}/edit', [UserController::class, 'edit'])
        ->name('users.edit')
        ->middleware('can:update,user'); // Utilisation de la politique

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->name('users.update')
        ->middleware('can:update,user'); // Utilisation de la politique

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->name('users.destroy')
        ->middleware('can:delete,user'); // Utilisation de la politique
});


require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GradoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeccionesController;
use App\Models\Docente;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Docente::create(['nombre' => 'Docente 1', 'apellido' => 'docente apellido', 'correo' => 'corre@mail.com']);

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

    Route::resource('estudiantes', EstudianteController::class)->names('estudiantes');
    Route::resource('grados', GradoController::class)->names(['grados']);
    Route::resource('secciones', SeccionesController::class)->names(['secciones']);
    // Route::post('estudiantes',  [EstudianteController::class, 'store'])->name('estudiantes');
});

require __DIR__ . '/auth.php';

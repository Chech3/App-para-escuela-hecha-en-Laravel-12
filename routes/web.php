<?php

use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\ConstanciaController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\GradoController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\PersonalCocinaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeccionesController;
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

route::get('offline', function () {
    return Inertia::render('Offline');
})->name('offline');

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
    Route::resource('docente', DocenteController::class)->names(['profesores']);
    Route::get('/reporte-docentes', [DocenteController::class, 'generarReporte'])->name('docentes.reporte');
    Route::resource('horarios', HorarioController::class)->names(['horarios']);
    Route::resource('personalCocina', PersonalCocinaController::class)->names(['personal_cocina']);
    // Route::post('estudiantes',  [EstudianteController::class, 'store'])->name('estudiantes');

    Route::get('/constancia/{id}', [ConstanciaController::class, 'generarConstancia'])->name('constancia');
    Route::get('/constancia-estudio/{id}', [ConstanciaController::class, 'generarConstanciaEstudio'])
        ->name('constancia.estudio');

    Route::get('/reporte-retiro/{id}', [ConstanciaController::class, 'generarConstanciaRetiro']);
    Route::get('conducta/{id}', [ConstanciaController::class, 'conducta']);


    Route::get('asistencias', [AsistenciaController::class, 'index'])->name('asistencias.index');
    Route::post('asistencias', [AsistenciaController::class, 'store'])->name('asistencias.store');
    Route::delete('asistencias/{asistencia}', [AsistenciaController::class, 'destroy'])->name('asistencias.destroy'); // ✅ Corregido
    Route::put('asistencias/{asistencia}', [AsistenciaController::class, 'update'])->name('asistencias.update');
    Route::get('reporte-asistencias', [AsistenciaController::class, 'generarReporte']);


    // Route::post('/asistencias/masivo', [AsistenciaController::class, 'storeMassive'])
    //     ->name('asistencias.masivo');
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Personal_cocina;
use Inertia\Inertia;
use App\Models\Asistencia;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use App\Models\User;

class AsistenciaController extends Controller
{
    public function index(Request $request)
    {
        $fecha = $request->input('fecha', now()->format('Y-m-d'));
        $estudiantes = Estudiante::with('seccion')->get();
        return Inertia::render('Asistencias/Index', [
            'asistencias' => Asistencia::with(['estudiante', 'docente', 'personalCocina'])
                ->whereDate('fecha', $fecha)
                ->orderBy('hora_entrada')
                ->get(),
            'fechaActual' => $fecha,
            'estudiantes' => $estudiantes,
            'docentes' => Docente::get(['id', 'nombre']),
            'personalCocina' => Personal_cocina::get(['id', 'nombre']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:estudiante,docente,personal_cocina',
            'persona_id' => 'required|integer',
            'fecha' => 'required|date',
            'hora_entrada' => 'required|date_format:H:i',
            'observaciones' => 'nullable|string|max:255',
        ]);

        $data = [
            'fecha' => $request->fecha,
            'hora_entrada' => $request->hora_entrada,
            'tipo' => $request->tipo,
            'registrador_id' => auth()->id(),
            'observaciones' => $request->observaciones,
        ];

        switch ($request->tipo) {
            case 'estudiante':
                $data['estudiante_id'] = $request->persona_id;
                break;
            case 'docente':
                $data['docente_id'] = $request->persona_id;
                break;
            case 'personal_cocina':
                $data['personal_cocina_id'] = $request->persona_id;
                break;
        }

        Asistencia::create($data);

        return redirect()->back()->with('success', 'Asistencia registrada correctamente');
    }

    public function update(Request $request, Asistencia $asistencia)
    {
        $request->validate([
            'hora_salida' => 'required|date_format:H:i|after:hora_entrada',
        ]);

        $asistencia->update([
            'hora_salida' => $request->hora_salida,
        ]);

        return redirect()->back()->with('success', 'Salida registrada correctamente');
    }
}
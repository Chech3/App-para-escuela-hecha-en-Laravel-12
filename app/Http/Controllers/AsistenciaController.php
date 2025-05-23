<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Grado;
use App\Models\Personal_cocina;
use App\Models\Secciones;
use DB;
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

        return Inertia::render('Asistencias/Index', [
            'asistencias' => Asistencia::with(['docente', 'personalCocina'])
                ->whereDate('fecha', $fecha)
                ->orderBy('hora_entrada')
                ->get(),
            'fechaActual' => $fecha,
            'docentes' => Docente::get(['id', 'nombre']),
            'personalCocina' => Personal_cocina::get(['id', 'nombre']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tipo' => 'required|in:docente,personal_cocina',
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

        // Asignar el ID correcto según el tipo
        if ($request->tipo === 'docente') {
            $data['docente_id'] = $request->persona_id;
        } elseif ($request->tipo === 'personal_cocina') {
            $data['personal_cocina_id'] = $request->persona_id;
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

    // public function storeMassive(Request $request)
    // {
    //     $validated = $request->validate([
    //         'tipo' => 'required|in:estudiante,docente,personal_cocina',
    //         'seccion_id' => 'required_if:tipo,estudiante|integer|nullable',
    //         'fecha' => 'required|date',
    //         'hora_entrada' => 'required|date_format:H:i',
    //         'todos_presentes' => 'sometimes|boolean',
    //     ]);

    //     // Obtener las personas según el tipo
    //     $personas = match ($validated['tipo']) {
    //         'estudiante' => Estudiante::where('seccion_id', $validated['seccion_id'])
    //             ->where('activo', true)
    //             ->get(),
    //         'docente' => Docente::all(),
    //         'personal_cocina' => Personal_cocina::all(),
    //         default => collect(),
    //     };

    //     $registrosCreados = 0;
    //     $horaActual = now()->format('H:i');

    //     DB::beginTransaction();
    //     try {
    //         foreach ($personas as $persona) {
    //             // Verificar si ya existe registro para evitar duplicados
    //             $existe = Asistencia::where('fecha', $validated['fecha'])
    //                 ->where($validated['tipo'] . '_id', $persona->id)
    //                 ->exists();

    //             if (!$existe) {
    //                 Asistencia::create([
    //                     'fecha' => $validated['fecha'],
    //                     'hora_entrada' => $validated['hora_entrada'],
    //                     'tipo' => $validated['tipo'],
    //                     $validated['tipo'] . '_id' => $persona->id,
    //                     'registrador_id' => auth()->id(),
    //                     'observaciones' => 'Marcado masivo - ' . ($validated['todos_presentes'] ? 'Todos presentes' : ''),
    //                 ]);
    //                 $registrosCreados++;
    //             }
    //         }

    //         DB::commit();

    //         return redirect()
    //             ->back()
    //             ->with('success', "Asistencias registradas: $registrosCreados");

    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return redirect()
    //             ->back()
    //             ->with('error', 'Error al registrar: ' . $e->getMessage());
    //     }
    // }
}
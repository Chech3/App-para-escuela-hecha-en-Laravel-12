<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      
        $search = $request->input('search', '');

        // Consulta 
        $query = Horario::query()->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('dia', 'like', "%{$search}%");
            });
        }

        $horarios = $query->get()->map(function ($horario) {
            return [
                'id' => $horario->id,
                'dia' => $horario->dia,
                'hora_inicio' => $horario->hora_inicio,
                'hora_fin' => $horario->hora_fin,
            ];
        });

        // Retornar la vista con los datos
        return Inertia::render('Horarios/Index', [
            'horarios' => $horarios,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'dia' => 'required|string|max:255',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i',
        ]);

        Horario::create($validated);

        return redirect()->back()->with('success', 'Horario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Horario $horario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Horario $horario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Horario $horario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Horario $horario)
    {
        if ($horario->docentes()->exists()) {

            return redirect()->back()->with('error', 'No se puede eliminar el horario porque está asignado a uno o más docentes.');
        }

        $horario->delete();

        return redirect()->back()->with([
            'success' => 'Horario eliminado correctamente.'
        ]);

    }
}

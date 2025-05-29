<?php

namespace App\Http\Controllers;

use App\Models\Personal_cocina;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonalCocinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $search = $request->input('search', '');

        // Consulta 
        $query = Personal_cocina::query()->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%");
            });
        }

        $personal = $query->get()->map(function ($personal_cocina) {
            return [
                'id' => $personal_cocina->id,
                'nombre' => $personal_cocina->nombre,
                'apellido' => $personal_cocina->apellido,
                'cedula' => $personal_cocina->cedula,
                'tipo' => $personal_cocina->tipo,
            ];
        });

        // Retornar la vista con los datos
        return Inertia::render('PersonalCocina/Index', [
            'personal' => $personal,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
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
            'nombre' => 'required|string|max:25',
            'apellido' => 'required|string|max:25',
            'cedula' => 'required|string|max:25',
            'tipo' => 'required|string|max:25',
        ]);

        Personal_cocina::create($validated);

        return redirect()->back()->with('success', 'Personal creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Personal_cocina $personalCocina)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Personal_cocina $personalCocina)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Personal_cocina $personalCocina)
    {
        $personalCocina = Personal_cocina::findOrFail($personalCocina->id);

        if ($personalCocina) {
            $personalCocina->update([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'cedula' => $request->cedula,
                'tipo' => $request->tipo,
            ]);
        }
        return redirect()->back()->with('success', 'Personal actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Personal_cocina $personalCocina)
    {
        $personalCocina->delete();

        return redirect()->back()->with('success', 'Personal eliminado exitosamente.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Grado;
use App\Models\Secciones;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeccionesController extends Controller
{

//  public function index()
//     {
//         return Inertia::render('Secciones/Index', [
//             'secciones' => Secciones::with(['grado', 'docente'])->get(),
//             'grados' => Grado::all(),
//             'docentes' => Docente::all(),
//         ]);
//     }
  public function index(Request $request)
{
    $search = $request->input('search', '');

    $grados = Grado::all();
    $docentes = Docente::all();

    // Armar la consulta correctamente antes de usar get()
    $query = Secciones::query()
        ->with(['grado', 'docente'])
        ->orderBy('created_at', 'desc');

    if ($search) {
        $query->where('nombre', 'like', "%{$search}%");
    }

    // Ejecutar la consulta
    $secciones = $query->get()->map(function ($seccion) {
        return [
            'id' => $seccion->id,
            'nombre' => $seccion->nombre,
            'grado' => $seccion->grado ?? 'No asignado',
            'docente' => $seccion->docente, 
        ];
    });

    return Inertia::render('Secciones/Index', [
        'secciones' => $secciones,
        'filters' => $request->only('search'),
        'grados' => $grados,
        'docentes' => $docentes,
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:10',
            'grado_id' => 'required|exists:grados,id',
            'docente_id' => 'nullable|exists:docentes,id',
        ]);

        Secciones::create($validated);

        return redirect()->back()->with('success', 'Sección creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Secciones $seccione)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Secciones $seccione)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Secciones $seccione)
    {
         $seccione = Secciones::findOrFail($seccione->id);

        if ($seccione) {
            $seccione->update([
                'nombre' => $request->nombre,
                 'grado_id' => $request->grado_id,
                'docente_id' => $request->docente_id, 
            ]);
        }

        return redirect()->back()->with('success', 'Sección actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Secciones $seccione)
    {

        if ($seccione->estudiantes()->exists()) {
            return redirect()->back()->with('error', 'No se puede eliminar la sección porque tiene estudiantes asignados.');
        }

        $seccione->delete();

        return redirect()->back()->with('success', 'seccion eliminada exitosamente.');
    }
}

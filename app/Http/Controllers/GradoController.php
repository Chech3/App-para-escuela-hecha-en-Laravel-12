<?php

namespace App\Http\Controllers;

use App\Models\Grado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradoController extends Controller
{
    public function index(Request $request)
    {

        $search = $request->input('search', '');

        // Consulta 
        $query = Grado::query()->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%");
            });
        }

        $grados = $query->get()->map(function ($grado) {
            return [
                'id' => $grado->id,
                'nombre' => $grado->nombre,
                'tipo' => $grado->tipo,
            ];
        });

        // Retornar la vista con los datos
        return Inertia::render('Grados/Index', [
            'grados' => $grados,
            'filters' => $request->only('search'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'tipo' => 'required|in:Primaria,Inicial',
        ]);

        Grado::create($request->only('nombre', 'tipo'));

        return redirect()->back()->with('success', 'Grado creado exitosamente.');
    }

    public function show(Grado $grado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grado $grado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grado $grado)
    {

       $grado = Grado::findOrFail($grado->id);

        if ($grado) {
            $grado->update([
                'nombre' => $request->nombre,
                'tipo' => $request->tipo,
            ]);
        }
        return redirect()->back()->with('success', 'Grado actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grado $grado)
    {
        $grado->delete();

        return redirect()->back()->with('success', 'Grado eliminado exitosamente.');
    }


}

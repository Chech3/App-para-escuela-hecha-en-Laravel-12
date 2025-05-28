<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Horario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocenteController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search', '');

        $horarios = Horario::all();
        // Consulta 
        $query = Docente::query()->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('apellido', 'like', "%{$search}%");
            });
        }

        $docentes = $query->get()->map(function ($docente) {
            return [
                'id' => $docente->id,
                'nombre' => $docente->nombre,
                'apellido' => $docente->apellido,
                'correo' => $docente->correo,
                'horario' => $docente->horario,
                'especialidad' => $docente->especialidad,
            ];
        });

        // Retornar la vista con los datos
        return Inertia::render('Docentes/Index', [
            'docentes' => $docentes,
            'filters' => $request->only('search'),
            'horarios' => $horarios,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|max:255|unique:docentes,correo',
        ]);

        Docente::create($request->all());

        return redirect()->route('docente.index')->with('success', 'Docente creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Docente $docente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Docente $docente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Docente $docente)
    {
        $docente = Docente::findOrFail($docente->id);

        if ($docente) {
            $docente->update([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'correo' => $request->correo ,
                'especialidad' => $request->especialidad,
                'horario_id' => $request->horario_id
            ]);
        }
        return redirect()->back()->with('success', 'Docente actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Docente $docente)
    {


        if ($docente->secciones()->exists()) {

            return redirect()->back()->with('error', 'No se puede eliminar el docente porque está asignado a una sección.');
        }


        //   if ($docente->horario()->exists()) {

        //     return redirect()->back()->with('error', 'No se puede eliminar el docente porque está asignado a un horario.');
        // }

        $docente->delete();

        return redirect()->route('docente.index')->with('success', 'Docente eliminado con éxito.');
    }
}

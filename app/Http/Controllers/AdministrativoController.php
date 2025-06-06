<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdministrativoController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search', '');

        // Consulta 
        $query = Administrativo::query()->orderBy('created_at', 'desc');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('apellido', 'like', "%{$search}%");
            });
        }

        $personal = $query->get()->map(function ($docente) {
            return [
                'id' => $docente->id,
                'nombre' => $docente->nombre,
                'apellido' => $docente->apellido,
                'cedula' => $docente->cedula,
                // 'especialidad' => $docente->especialidad,
                'numero' => $docente->numero,
                'correo' => $docente->correo,
                'cargo' => $docente->cargo,
            ];
        });

        // Retornar la vista con los datos
        return Inertia::render('PersonalAdministrativo/Index', [
            'personal' => $personal,
            'filters' => $request->only('search'),
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'cedula' => 'required|string|max:255',
            'correo' => 'required|email|max:255|unique:administrativo,correo',
        ]);

        Administrativo::create($request->all());

        return redirect()->route('administrativo.index')->with('success', 'Personal creado correctamente');
    }


    public function update(Request $request, Administrativo $administrativo)
    {
        $administrativo = Administrativo::findOrFail($administrativo->id);

        if ($administrativo) {
            $administrativo->update([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'cedula' => $request->cedula,
                'correo' => $request->correo,
                // 'especialidad' => $request->especialidad,
                'numero' => $request->numero,
                'cargo' => $request->cargo
            ]);
        }
        return redirect()->back()->with('success', 'Personal actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Administrativo $administrativo)
    {

        $administrativo->delete();

        return redirect()->route('administrativo.index')->with('success', 'Personal eliminado con éxito.');
    }


}

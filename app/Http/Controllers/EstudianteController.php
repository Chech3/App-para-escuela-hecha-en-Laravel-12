<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Estudiante;
use App\Models\Grado;
use App\Models\Secciones;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $search = $request->input('search', '');

    // Construir consulta con relaciones
    $query = Estudiante::with(['grado', 'seccion'])->orderBy('created_at', 'desc');

    // Aplicar filtro de búsqueda si se proporcionó
    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('nombre', 'like', "%{$search}%")
              ->orWhere('apellido', 'like', "%{$search}%")
              ->orWhere('correo', 'like', "%{$search}%");
        });
    }

    // Obtener y transformar los resultados
    $estudiantes = $query->get()->map(function ($estudiante) {
        return [
            'id' => $estudiante->id,
            'nombre' => $estudiante->nombre,
            'apellido' => $estudiante->apellido,
            'correo' => $estudiante->correo,
            'genero' => $estudiante->genero,
            'cedula' => $estudiante->cedula,
            'grado' => $estudiante->grado ?? 'No asignado',
            'seccion' => $estudiante->seccion ?? 'No asignado',
        ];
    });

    // Devolver vista con filtros y datos adicionales
    return Inertia::render('Estudiantes/Index', [
        'estudiantes' => $estudiantes,
        'filters' => $request->only('search'),
        'grados' => Grado::all()->map(fn ($g) => ['id' => $g->id, 'nombre' => $g->nombre]),
        'docentes' => Docente::all()->map(fn ($d) => ['id' => $d->id, 'nombre' => $d->nombre, 'apellido' => $d->apellido]),
        'secciones' => Secciones::all()->map(fn ($s) => ['id' => $s->id, 'nombre' => $s->nombre]),
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Estudiantes/Create', [
            'grados' => Grado::all(),
            'secciones' => Secciones::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'fecha_nacimiento' => 'required|date',
            'genero' => 'required',
            'grado_id' => 'required|exists:grados,id',
            'seccion_id' => 'required|exists:secciones,id',
        ]);

        Estudiante::create($request->all());

        return redirect()->route('estudiantes.index')->with('success', 'Estudiante creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Estudiante $estudiante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estudiante $estudiante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estudiante $estudiante)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estudiante $estudiante)
    {
        $estudiante->delete();

        return redirect()->back()->with('success', 'Estudiante eliminado exitosamente.');
    }
}

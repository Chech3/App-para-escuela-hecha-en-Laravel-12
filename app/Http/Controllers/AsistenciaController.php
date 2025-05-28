<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Models\Personal_cocina;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\CarbonInterface;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\Asistencia;
use Illuminate\Http\Request;

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
            'docentes' => Docente::get(['id', 'nombre', 'apellido']),
            'personalCocina' => Personal_cocina::get(['id', 'nombre', 'apellido']),
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
            $data['personal_id'] = $request->persona_id;
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



     public function destroy(Asistencia $asistencia)
    {

        $asistencia->delete();

        return redirect()->back()->with('success', 'asistencia eliminada exitosamente.');
    }

    public function generarReporte(Request $request)
    {
        $tipo = $request->input('tipo', 'semanal'); // 'mensual' o 'semanal'
        $fecha = $request->input('fecha') ?? now()->toDateString();
        $fechaCarbon = Carbon::parse($fecha);

        if ($tipo === 'semanal') {
            $inicio = $fechaCarbon->startOfWeek(CarbonInterface::MONDAY)->toDateString();
            $fin = $fechaCarbon->endOfWeek(CarbonInterface::SUNDAY)->toDateString();
        } else {
            $inicio = $fechaCarbon->copy()->startOfMonth()->toDateString();
            $fin = $fechaCarbon->copy()->endOfMonth()->toDateString();
        }

        $asistencias = Asistencia::with(['docente', 'personalCocina'])
            ->whereBetween('fecha', [$inicio, $fin])
            ->get();

        $pdf = Pdf::loadView('reportes.asistencias', [
            'asistencias' => $asistencias,
            'inicio' => $inicio,
            'fin' => $fin,
            'tipo' => $tipo
        ]);

        return $pdf->stream("reporte_asistencias_{$tipo}.pdf");
    }


}
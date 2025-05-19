<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ConstanciaController extends Controller
{
    public function generarConstancia($id)
    {
        $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');

        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'cedula' => $student->cedula,
            'numeroConstancia' => 'CONST-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('constancia', $data);


        return $pdf->stream('constancia-inscripcion-' . $student->id . '.pdf');

    }

    public function generarConstanciaEstudio($id)
    {
         $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');

        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'director' => 'Nombre del Director',
            'institucion' => 'Unidad Educativa Nacional Simon Rodriguez',
            'sello' => public_path('/sello.jpg'),
            'numeroConstancia' => 'EST-' . now()->format('Y') . '-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('constancia_estudio', $data);
        return $pdf->stream('constancia-estudio-' . $student->documento . '.pdf');
    }
}

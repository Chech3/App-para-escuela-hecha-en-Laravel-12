<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;

use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use DateTime;
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


       $edad = Carbon::parse($student->fecha_nacimiento)->age;

        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'director' => ' PROF. JOSÉ MARTINEZ TORRES',
            'institucion' => 'Unidad Educativa Nacional Simon Rodriguez',
            'edad' => $edad,
            'sello' => public_path('/sello.jpg'),
            'numeroConstancia' => 'EST-' . now()->format('Y') . '-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('constancia_estudio', $data);
        return $pdf->stream('constancia-estudio-' . $student->documento . '.pdf');
    }


    public function generarConstanciaRetiro($id)
    {
        $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');
        $data = [
            'student' => $student,
            'director' => 'Jose Argenis Martinez Torres',
            'motivo' => 'Cambio de residencia',
            'fecha' => $fecha,
        ];

        $pdf = Pdf::loadView('retiro', $data);
        return $pdf->stream('constancia_retiro.pdf');
    }


}

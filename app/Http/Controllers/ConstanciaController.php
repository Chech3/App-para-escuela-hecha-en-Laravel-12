<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\Estudiante;

use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class ConstanciaController extends Controller
{
    public function generarConstancia($id)
    {
        $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');
        $director = Administrativo::where('cargo', 'Director')->first();


        $directorData = [
            'nombre' => $director ? $director->nombre : 'JOSÉ',
            'apellido' => $director ? $director->apellido : 'MARTINEZ TORRES',
            'cedula' => $director ? $director->cedula : 'V-17.666.104',
            'telefono' => $director ? $director->numero : '0412-6669403',
            'nombre_completo' => $director ? ($director->nombre . ' ' . $director->apellido) : 'PROF. JOSÉ MARTINEZ TORRES',
        ];
        $edad = Carbon::parse($student->fecha_nacimiento)->age;


        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'director' => $directorData,
            'institucion' => 'Unidad Educativa Nacional Simon Rodriguez',
            'edad' => $edad,
            'numeroConstancia' => 'EST-' . now()->format('Y') . '-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('constancia', $data);
        return $pdf->stream('constancia-inscripcion' . $student->documento . '.pdf');

    }

    public function generarConstanciaEstudio($id)
    {
        $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');
        $director = Administrativo::where('cargo', 'Director')->first();

        $directorData = [
            'nombre' => $director ? $director->nombre : 'JOSÉ',
            'apellido' => $director ? $director->apellido : 'MARTINEZ TORRES',
            'cedula' => $director ? $director->cedula : 'V-17.666.104',
            'telefono' => $director ? $director->numero : '0412-6669403',
            'nombre_completo' => $director ? ($director->nombre . ' ' . $director->apellido) : 'PROF. JOSÉ MARTINEZ TORRES',
        ];

        $edad = Carbon::parse($student->fecha_nacimiento)->age;

        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'director' => $directorData,
            'institucion' => 'Unidad Educativa Nacional Simon Rodriguez',
            'edad' => $edad,
            'numeroConstancia' => 'EST-' . now()->format('Y') . '-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('constancia_estudio', $data);
        return $pdf->stream('constancia-estudio-' . $student->documento . '.pdf');
    }


    public function generarConstanciaRetiro($id)
    {
        $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');
        $director = Administrativo::where('cargo', 'Director')->first();

       $directorData = [
            'nombre' => $director ? $director->nombre : 'JOSÉ',
            'apellido' => $director ? $director->apellido : 'MARTINEZ TORRES',
            'cedula' => $director ? $director->cedula : 'V-17.666.104',
            'telefono' => $director ? $director->numero : '0412-6669403',
            'nombre_completo' => $director ? ($director->nombre . ' ' . $director->apellido) : 'PROF. JOSÉ MARTINEZ TORRES',
        ];

        $edad = Carbon::parse($student->fecha_nacimiento)->age;

        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'director' => $directorData,
            'institucion' => 'Unidad Educativa Nacional Simon Rodriguez',
            'edad' => $edad,
            'numeroConstancia' => 'EST-' . now()->format('Y') . '-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('retiro', $data);
        return $pdf->stream('constancia-retiro' . $student->documento . '.pdf');
    }

    public function conducta($id)
    {
        $student = Estudiante::findOrFail($id);
        $fecha = now()->format('d/m/Y');
        $edad = Carbon::parse($student->fecha_nacimiento)->age;

        $director = Administrativo::where('cargo', 'Director')->first();

       $directorData = [
            'nombre' => $director ? $director->nombre : 'JOSÉ',
            'apellido' => $director ? $director->apellido : 'MARTINEZ TORRES',
            'cedula' => $director ? $director->cedula : 'V-17.666.104',
            'telefono' => $director ? $director->numero : '0412-6669403',
            'nombre_completo' => $director ? ($director->nombre . ' ' . $director->apellido) : 'PROF. JOSÉ MARTINEZ TORRES',
        ];

        $data = [
            'student' => $student,
            'fecha' => $fecha,
            'director' => $directorData,
            'institucion' => 'Unidad Educativa Nacional Simon Rodriguez',
            'edad' => $edad,
            'numeroConstancia' => 'EST-' . now()->format('Y') . '-' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
        ];

        $pdf = Pdf::loadView('conducta', $data);
        return $pdf->stream('constancia-conducta' . $student->documento . '.pdf');
    }
}

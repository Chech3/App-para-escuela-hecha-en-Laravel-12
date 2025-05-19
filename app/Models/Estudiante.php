<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $table = 'estudiantes';
    protected $fillable = [
        'nombre',
        'apellido',
        'fecha_nacimiento',
        'genero',
        'cedula',
        'grado_id',
        'seccion_id',
    ];
    public function grado()
    {
        return $this->belongsTo(Grado::class);
    }

    public function seccion()
    {
        return $this->belongsTo(Secciones::class);
    }
}

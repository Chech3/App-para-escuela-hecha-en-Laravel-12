<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asistencia extends Model
{
      use SoftDeletes;
    protected $fillable = [
        'fecha',
        'hora_entrada',
        'hora_salida',
        'tipo',
        'docente_id',
        'estudiante_id',
        'personal_id',
        'observaciones'
    ];

    protected $casts = [
        'fecha' => 'date',
        'hora_entrada' => 'datetime:H:i',
        'hora_salida' => 'datetime:H:i',
    ];

    // Relaciones
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }

    public function personalCocina()
    {
        return $this->belongsTo(Personal_cocina::class, 'personal_id');
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'docente_id');
    }

     // Accesor para obtener la persona relacionada
    public function getPersonaAttribute()
    {
        return match($this->tipo) {
            'docente' => $this->docente,
            'personal_cocina' => $this->personalCocina,
            default => null,
        };
    }

    // Accesor para obtener el nombre
    public function getNombreAttribute()
    {
        return match($this->tipo) {
            'docente', 'personal_cocina' => $this->persona->nombre,
            default => 'Desconocido',
        };
    }

    

}

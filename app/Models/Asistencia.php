<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
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
            'estudiante' => $this->estudiante,
            'docente' => $this->docente,
            'personal_cocina' => $this->personalCocina,
            default => null,
        };
    }

    // Accesor para obtener el nombre
    public function getNombreAttribute()
    {
        return match($this->tipo) {
            'estudiante' => $this->estudiante->nombre_completo,
            'docente', 'personal_cocina' => $this->persona->name,
            default => 'Desconocido',
        };
    }

    

}

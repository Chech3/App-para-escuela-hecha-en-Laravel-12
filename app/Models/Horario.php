<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $fillable = [
        'dia',
        'hora_inicio',
        'hora_fin',
    ];

   

    public function docente()
    {
        return $this->belongsTo(Docente::class);
    }
}

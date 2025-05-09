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

   

    public function docentes()
{
    return $this->hasMany(Docente::class);
}
    
}

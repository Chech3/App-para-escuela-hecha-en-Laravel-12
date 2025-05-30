<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Horario extends Model
{
      use SoftDeletes;
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

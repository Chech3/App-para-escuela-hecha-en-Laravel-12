<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grado extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
    ];

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class);
    }

    public function secciones()
    {
        return $this->hasMany(Secciones::class);
    }
}

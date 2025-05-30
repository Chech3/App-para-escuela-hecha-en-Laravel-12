<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grado extends Model
{
    use HasFactory;
      use SoftDeletes;
    protected $table = 'grados';
    protected $fillable = [
        'nombre', 'tipo' 
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

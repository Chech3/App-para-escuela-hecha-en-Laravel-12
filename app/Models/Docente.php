<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $table = 'docentes';

    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        'especialidad',
    ];
    public function secciones()
    {
        return $this->hasMany(Secciones::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Docente extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'docentes';

    protected $fillable = [
        'id',
        'nombre',
        'apellido',
        'correo',
        'cedula',
        'numero',
        'horario_id'
    ];
    public function secciones()
    {
        return $this->hasMany(Secciones::class);
    }

    public function horario()
    {
        return $this->belongsTo(Horario::class);
    }
}

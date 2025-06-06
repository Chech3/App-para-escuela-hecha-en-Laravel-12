<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Administrativo extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'administrativo';
    protected $fillable = [
        'id',
        'nombre',
        'apellido',
        'correo',
        'cedula',
        'numero',
        // 'especialidad',
        'cargo'
    ];
}

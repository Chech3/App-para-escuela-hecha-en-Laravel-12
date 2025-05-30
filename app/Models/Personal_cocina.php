<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Personal_cocina extends Model
{
    use HasFactory;
      use SoftDeletes;
    protected $table = 'personal_cocinas'; 


    protected $fillable = [
        'id',
        'nombre',
        'apellido',
        'cedula',
        'tipo'
    ];
}

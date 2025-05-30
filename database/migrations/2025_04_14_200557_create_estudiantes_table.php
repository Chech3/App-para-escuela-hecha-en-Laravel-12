<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->date('fecha_nacimiento');
            $table->string('genero');
            $table->integer('cedula')->nullable();
            $table->unsignedBigInteger('grado_id');
            $table->unsignedBigInteger('seccion_id')->nullable();
            $table->timestamps();

            $table->foreign('grado_id')->references('id')->on('grados')->onDelete('cascade');
            $table->foreign('seccion_id')->references('id')->on('secciones')->onDelete('cascade');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estudiantes', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

    }
};

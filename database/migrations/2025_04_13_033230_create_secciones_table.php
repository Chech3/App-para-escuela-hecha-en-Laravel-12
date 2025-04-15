<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('secciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Ejemplo: "A", "B"
            $table->unsignedBigInteger('grado_id');
            $table->unsignedBigInteger('docente_id')->nullable();
            $table->timestamps();
        
            $table->foreign('grado_id')->references('id')->on('grados')->onDelete('cascade');
            $table->foreign('docente_id')->references('id')->on('docentes')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('secciones');
    }
};

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
        Schema::create('asistencias', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->time('hora_entrada')->nullable();
            $table->time('hora_salida')->nullable();
            $table->enum('tipo', ['estudiante', 'docente', 'personal_cocina'])->default('estudiante');
            $table->foreignId('estudiante_id')->nullable()->constrained();
            $table->foreignId('docente_id')->nullable()->constrained();
            $table->foreignId('personal_id')->nullable()->constrained('personal_cocinas');
            $table->string('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asistencias');
    }
};

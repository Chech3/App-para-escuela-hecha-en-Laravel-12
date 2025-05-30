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
        Schema::create('horarios', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('docente_id')->constrained('docentes')->onDelete('cascade');
            $table->string('dia');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->timestamps();

             $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('horarios', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};

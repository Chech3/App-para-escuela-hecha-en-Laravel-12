<?php

namespace App\Http\Controllers;

use App\Models\Grado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grados = Grado::all();
        $fibonacci = $this->generateFibonacciCode(10);
        return Inertia::render('Grados/Index', [
            'grados' => $grados,
            'fibonacci' => $fibonacci,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        Grado::create($data);

        return redirect()->back()->with('success', 'Grado creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Grado $grado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grado $grado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Grado $grado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grado $grado)
    {
        $grado->delete();

        return redirect()->back()->with('success', 'Grado eliminado exitosamente.');
    }

    private function generateFibonacciCode($n)
    {
        $sequence = [0, 1];

        for ($i = 2; $i < $n; $i++) {
            $sequence[] = $sequence[$i - 1] + $sequence[$i - 2];
        }

        // Mezclamos los números
        shuffle($sequence);

        // Tomamos los primeros 5 números (puedes cambiar esto)
        $selected = array_slice($sequence, 0, 5);

        // Los unimos como un string (puedes agregar separadores si quieres)
        $code = implode('', $selected);

        return $code;
    }
}

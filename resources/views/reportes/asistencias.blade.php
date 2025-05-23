<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Asistencias</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #333; padding: 5px; text-align: left; }
        th { background-color: #eee; }
    </style>
</head>
<body>
    <h2>Reporte de Asistencias {{ $tipo === 'semanal' ? 'semanal' : 'mensual' }}</h2>
    <p>Desde: {{ $inicio }} — Hasta: {{ $fin }}</p>

    <table>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Observaciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($asistencias as $a)
                <tr>
                    <td>{{ $a->fecha }}</td>
                    <td>
                        @if($a->tipo === 'docente')
                            {{ $a->docente?->nombre }} {{ $a->docente?->apellido }}
                        @elseif($a->tipo === 'personal_cocina')
                            {{ $a->personalCocina?->nombre }} {{ $a->personalCocina?->apellido }}
                        @endif
                    </td>
                    <td>{{ ucfirst($a->tipo) }}</td>
                    <td>{{ $a->hora_entrada }}</td>
                    <td>{{ $a->hora_salida ?? '---' }}</td>
                    <td>{{ $a->observaciones ?? '---' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

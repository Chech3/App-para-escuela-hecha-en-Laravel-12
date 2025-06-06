<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte de Docentes</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #444;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #eee;
        }

        h2 {
            text-align: center;
        }
    </style>
</head>

<body>
    <h2>Reporte General de Docentes</h2>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cedula</th>
                <th>Correo</th>
                <th>Número</th>
                <th>Especialidad</th>
                <th>Fecha de Registro</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($docentes as $index => $docente)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $docente->nombre }}</td>
                    <td>{{ $docente->apellido }}</td>
                     <td>{{ $docente->cedula }}</td>
                    <td>{{ $docente->correo }}</td>
                    <td>{{ $docente->numero ?? 'No definida' }}</td>
                     <td>{{ $docente->especialidad }}</td>
                    <td>{{ $docente->created_at->format('d/m/Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>

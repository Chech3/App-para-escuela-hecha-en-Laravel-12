<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Constancia de Inscripción</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 18px; font-weight: bold; margin-bottom: 30px; text-align: center; }
        .content { margin: 20px 0; text-align: justify; }
        .signature { margin-top: 50px; text-align: center; }
        .footer { margin-top: 50px; font-size: 12px; text-align: center; }
        .border { border: 1px solid #000; padding: 20px; }
    </style>
</head>
<body>
    <div class="border">
        <div class="header">
            <img src="{{ public_path('/escudo.jpg') }}" alt="Logo" width="100">
            <h2>INSTITUCIÓN EDUCATIVA</h2>
            <p>Dirección:  Calle Principal La Pitahaya Vía Baraived Sector El Molino</p>
            <p>Teléfono: (123) 456-7890</p>
        </div>

        <div class="title">
            <u>CONSTANCIA DE INSCRIPCIÓN</u>
        </div>

        <div class="content">
            <p>Por medio de la presente se hace constar que el(la) estudiante <strong>{{ $student->nombre }}</strong> <strong>
              {{$student->apellido  }} </strong> , 
            identificado(a) con documento número <strong>{{ $student->cedula ?? "N/P" }}</strong>, se encuentra 
            oficialmente matriculado(a) en esta institución para el año académico {{ date('Y') }} en el 
            grado <strong>{{ $student->grado->nombre }}</strong>.</p>

            <p>Esta constancia se expide a solicitud del interesado(a) para los fines que estime conveniente.</p>
        </div>

        <div class="signature">
            <p>_________________________</p>
            <p>Firma y sello</p>
        </div>

        <div class="footer">
            <p>Constancia No: {{ $numeroConstancia }}</p>
            <p>Fecha de emisión: {{ $fecha }}</p>
        </div>
    </div>
</body>
</html>
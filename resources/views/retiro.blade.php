<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Constancia de Inscripción</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 30px;
            text-align: center;
        }

        .content {
            margin: 20px 0;
            text-align: justify;
        }

        .signature {
            margin-top: 50px;
            text-align: center;
        }

        .footer {
            margin-top: 50px;
            font-size: 12px;
            text-align: center;
        }

        .border {
            border: 1px solid #000;
            padding: 20px;
        }
    </style>
</head>

<body>
    <div class="border">
        <div class="header">
            <img src="{{ public_path('/escudo.jpg') }}" alt="Logo" width="50">
            <strong>
                REPUBLICA BOLIVARIANA DE VENEZUELA
                MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN
                CENTRO DE DESARROLLO DE LA CALIDAD EDUCATIVA (CDCE)
                UNIDAD EDUCATIVA NACIONAL "SIMON RODRIGUEZ"
            </strong>
        </div>

        <div class="title">
            <u>CONSTANCIA DE RETIRO</u>
        </div>

        <div class="content">
            <p>
                Quien suscribe, {{ $director }} Titular de la cédula de
                identidad N° V-17.666.104, en mi condición de Director (E) de la Unidad
                Educativa Nacional SIMÓN RODRIGUEZ, ubicada en Pitahaya, Parroquia Buena
                Vista, Municipio Falcón, Estado Falcón, por medio de la presente HAGO
                CONSTAR que el (la) estudiante:
                <strong>{{ $student->nombre }}</strong> <strong>
                    {{ $student->apellido }} </strong> ,
            </p>


            <p>
                Cédula Escolar {{ $student->cedula }} de __ años curso {{ $student->grado->nombre }} en la Unidad
                Educativa Nacional
                "SIMÓN RODRIGUEZ", código plantel: OD09401109 y SE RETIRA de la
                misma por motivo de _________________________________________.
                Constancia que se expide a petición de parte interesada a los 28 días del mes
                de {{ $mes }} del año {{ $anio }}.
            </p>
            {{-- <p>Por medio de la presente se hace constar que el(la) estudiante 
               
                identificado(a) con documento número <strong>{{ $student->cedula ?? 'N/P' }}</strong>, se encuentra
                oficialmente matriculado(a) en esta institución para el año académico {{ date('Y') }} en el
                grado <strong>{{ $student->grado->nombre }}</strong>.</p>

            <p>Esta constancia se expide a solicitud del interesado(a) para los fines que estime conveniente.</p> --}}
        </div>

        <div class="signature">
            <p>_________________________</p>
            <p>Firma y sello</p>
        </div>

        <div class="footer">
            <p>Fecha de emisión: {{ $fecha }}</p>
        </div>
    </div>
</body>

</html>

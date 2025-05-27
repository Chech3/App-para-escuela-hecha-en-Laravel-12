<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Constancia de Estudio</title>
    <style>
        body {
            font-family: "Times New Roman", serif;
            font-size: 14px;
            line-height: 1.5;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .title {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            text-decoration: underline;
            margin: 30px 0;
        }

        .content {
            margin: 20px 0;
            text-align: justify;
        }

        .signature {
            margin-top: 80px;
            text-align: center;
            width: 100%;
        }

        .footer {
            margin-top: 30px;
            font-size: 12px;
            text-align: center;
        }

        .border {
            border: 2px solid #000;
            padding: 30px;
            position: relative;
        }

        .sello {
            position: absolute;
            right: 50px;
            bottom: 400px;
            opacity: 1;
        }

         .logo {
            position: absolute;
            right: 50px;
            top: 100px;
            opacity: 1;
        }

        .left {
            float: left;
            width: 50%;
        }

        .right {
            float: right;
            width: 50%;
            text-align: right;
        }

        .clear {
            clear: both;
        }
    </style>
</head>

<body>
    <div class="border">
        @if (file_exists($sello))
            <img src="{{ $sello }}" class="sello" width="120">
        @endif

        <img src="{{ public_path('/escudo.jpg') }}" alt="Logo" width="60" class="logo">
        
        <div class="header">
            <h2>{{ strtoupper($institucion) }}</h2>
            <p>RUC: 12345678901 | Resolución de creación: 0001-2021-MINEDU</p>
            <p>Dirección: Calle Principal La Pitahaya  Vía Baraived Sector El Molino | Teléfono: (01) 123-4567</p>
        </div>

        <div class="title">
            CONSTANCIA DE ESTUDIO
        </div>

        <div class="content">
            <p>Quien suscribe, {{ $director }}, Director(a) de {{ $institucion }}, hace constar que:</p>

            <p><strong>{{ strtoupper($student->nombre) }}
                    {{ strtoupper($student->apellido) }}</strong>, identificado(a) con
               N° <strong>{{ $student->cedula ?? "N/P" }}</strong>,
                está matriculado(a) en esta institución educativa en el año académico {{ date('Y') }},
                en el {{ $student->grado->nombre }} grado.</p>


            <p>La presente constancia se expide a solicitud del interesado(a) para los fines que estime conveniente.</p>
        </div>

        <div class="signature">
            <p>Atentamente,</p>
            <br><br><br>
            <p>_________________________</p>
            <p><strong>{{ $director }}</strong></p>
            <p>Director(a)</p>
            <p>{{ $institucion }}</p>
        </div>

        <div class="footer">
            <div class="left">Código de verificación: {{ substr(md5($student->id . $student->documento), 0, 10) }}
            </div>
            <div class="right">Constancia N°: {{ $numeroConstancia }}</div>
            <div class="clear"></div>
            <p>Fecha de emisión: {{ $fecha }}</p>
        </div>
    </div>
</body>

</html>

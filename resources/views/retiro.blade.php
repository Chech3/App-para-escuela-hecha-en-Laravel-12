<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Constancia de Estudio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
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
            margin: 80px 0;
            text-align: justify;
            font-size: 18px
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


        .logo {
            position: absolute;
            right: 30px;
            top: 40px;
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

        .institucion {
            font-size: 16px;
        }

        .efecto {
            font-weight: bold;
            margin: 0;
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="border">

        <img src="{{ public_path('/escudo.jpg') }}" alt="Logo" width="60" class="logo">

        <h2 class="institucion">
            <div style="text-align: center; margin-bottom: 20px;">
                <p style="font-weight: bold; margin: 0;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
                <p style="font-weight: bold; margin: 0;">MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN</p>
                <p style="font-weight: bold; margin: 0;">CENTRO DE DESARROLLO DE LA CALIDAD EDUCATIVA (CDCE)</p>
                <p style="font-weight: bold; margin: 0;">UNIDAD EDUCATIVA NACIONAL "SIMON RODRIGUEZ"</p>
            </div>
        </h2>

        <div class="title">
            CONSTANCIA DE RETIRO
        </div>

        <div class="content">
            Quien suscribe, <span class="efecto">{{ $director }}
            </span> Titular de la cédula de
            identidad <span class="efecto">N° V-17.666.104,
            </span> ,en mi condición de Director (E) de la Unidad Educativa
            Nacional SIMON RODRIGUEZ, ubicada en Pitahaya, Parroquia Buena Vista,
            Municipio Falcón, Estado Falcón, por medio de la presente HAGO CONSTAR que
            el (la) estudiante: <strong>{{ strtoupper($student->nombre) }}
                {{ strtoupper($student->apellido) }}</strong>,
            Cédula Escolar <span class="efecto">{{ $student->cedula }}</span>, de <span
                class="efecto">{{ $edad }} </span> años , cursa estudios de
            <span class="efecto">
                {{ $student->grado->nombre }}
            </span>
            de Educación
            <span class="efecto">
                {{ $student->grado->tipo }}
            </span>
            ,en la Unidad Educativa Nacional "SIMON RODRIGUEZ", código
            plantel:
            <span class="efecto">
                OD09401109.
            </span>
            y SE RETIRA de la misma por motivo de "_________________________________________________________"
        </div>

        <div class="content">
            Constancia que se expide a petición de parte interesada a los ______ días
            del mes de _____________ del año____________
        </div>

        <div class="signature">
            <p>_________________________</p>
            <p><strong>{{ $director }}</strong></p>
            <p>Director(a)</p>
            <p style="font-weight: bold; margin: 0;">N° Telf.: 0412-6669403</p>
        </div>

        <div class="footer">
            <div class="clear"></div>
            <p>Fecha de emisión: {{ $fecha }}</p>
        </div>
    </div>
</body>

</html>

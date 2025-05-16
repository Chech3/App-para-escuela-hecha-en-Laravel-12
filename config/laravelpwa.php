<?php

return [
    'name' => 'Registro de Asistencia',
    'manifest' => [
        'name' => env('APP_NAME', 'Registro de Asistencia'),
        'short_name' => 'Asistencia',
        'start_url' => '/',
        'background_color' => '#ffffff',
        'theme_color' => '#1E3A8A', // Azul personalizado
        'display' => 'standalone',
        'orientation'=> 'portrait',
        'status_bar'=> 'black',
        'icons' => [
            '72x72' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '96x96' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '128x128' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '144x144' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '152x152' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '192x192' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '384x384' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
            '512x512' => [
                'path' => '/escudob.png',
                'purpose' => 'any'
            ],
        ],
        'splash' => [
            '640x1136' => '/images/splash/splash-640x1136.png',
            '750x1334' => '/images/splash/splash-750x1334.png',
            '828x1792' => '/images/splash/splash-828x1792.png',
            '1125x2436' => '/images/splash/splash-1125x2436.png',
            '1242x2208' => '/images/splash/splash-1242x2208.png',
            '1242x2688' => '/images/splash/splash-1242x2688.png',
            '1536x2048' => '/images/splash/splash-1536x2048.png',
            '1668x2224' => '/images/splash/splash-1668x2224.png',
            '1668x2388' => '/images/splash/splash-1668x2388.png',
            '2048x2732' => '/images/splash/splash-2048x2732.png',
        ],
        'shortcuts' => [
            [
                'name' => 'Registrar Asistencia',
                'description' => 'Acceso directo para registrar asistencia',
                'url' => '/registro',
                'icons' => [
                    "src" => "/escudob.png",
                    "purpose" => "any"
                ]
            ],
            [
                'name' => 'Ver Reportes',
                'description' => 'Ver reportes de asistencia',
                'url' => '/reportes',
                'icons' => [
                    "src" => "/images/icons/shortcut-reportes.png",
                    "purpose" => "any"
                ]
            ]
        ],
        'custom' => []
    ]
];

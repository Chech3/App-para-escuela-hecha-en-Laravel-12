import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    const cards = [
        {
            title: 'Grados',
            href: '/grados',
            image: '/libreta.svg',
        },
        {
            title: 'Docentes',
            href: '/docente',
            image: '/teacher.svg',
        },
        {
            title: 'Secciones',
            href: '/secciones',
            image: '/salon.svg',
        },
        {
            title: 'Estudiantes',
            href: '/estudiantes',
            image: '/student.svg',
        },

        {
            title: 'Horarios',
            href: '/horarios',
            image: '/horario.png',
        },

        {
            title: 'Asistencia',
            href: '/asistencias',
            image: '/work.svg',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inicio
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card, index) => (
                            <Link
                                key={index}
                                href={card.href}
                                className="rounded-2xl border border-gray-100 bg-gray-200 p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="mb-4 h-20 w-20 object-contain"
                                    />
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {card.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

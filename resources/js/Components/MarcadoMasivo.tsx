// resources/js/Components/MarcadoMasivo.tsx
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Seccion {
    id: number;
    nombre: string;
}

interface MarcadoMasivoProps {
    secciones: Seccion[];
}

export default function MarcadoMasivo({ secciones }: MarcadoMasivoProps) {
    const { data, setData, post, processing, errors } = useForm({
        tipo: 'estudiante',
        seccion_id: '',
        fecha: new Date().toISOString().substring(0, 10),
        hora_entrada: new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }),
        todos_presentes: true,
    });

    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validación básica
        if (data.tipo === 'estudiante' && !data.seccion_id) {
            alert('Por favor seleccione una sección');
            return;
        }

        post('/asistencias/masivo', {
            preserveScroll: true,
            onSuccess: () => {
                setShowForm(false);
                // Puedes agregar aquí una notificación de éxito
            },
            onError: (errors) => {
                console.error('Error al registrar:', errors);
            }
        });
    };

    return (
        <div className="mb-6">
            <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4"
            >
                {showForm ? 'Ocultar marcado masivo' : 'Marcado masivo por grupo'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo
                            </label>
                            <select
                                value={data.tipo}
                                onChange={(e) => {
                                    setData('tipo', e.target.value);
                                    setData('seccion_id', '');
                                }}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="estudiante">Estudiantes</option>
                                <option value="docente">Docentes</option>
                                <option value="personal_cocina">Personal Cocina</option>
                            </select>
                        </div>

                        {data.tipo === 'estudiante' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sección
                                </label>
                                <select
                                    value={data.seccion_id}
                                    onChange={(e) => setData('seccion_id', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">Seleccione...</option>
                                    {secciones.map((seccion) => (
                                        <option key={seccion.id} value={seccion.id}>
                                            {seccion.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.seccion_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.seccion_id}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={data.fecha}
                                onChange={(e) => setData('fecha', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                            {errors.fecha && (
                                <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hora de entrada
                            </label>
                            <input
                                type="time"
                                value={data.hora_entrada}
                                onChange={(e) => setData('hora_entrada', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                            {errors.hora_entrada && (
                                <p className="mt-1 text-sm text-red-600">{errors.hora_entrada}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="todos_presentes"
                            checked={data.todos_presentes}
                            onChange={(e) => setData('todos_presentes', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="todos_presentes" className="ml-2 block text-sm text-gray-700">
                            Marcar todos como presentes
                        </label>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {processing ? 'Registrando...' : 'Registrar Asistencias'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
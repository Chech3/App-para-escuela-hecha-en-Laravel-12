// resources/js/Pages/Asistencias/Index.tsx
import { Head, useForm, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Persona {
    id: number;
    nombre?: string;
    apellido?: string;
    seccion?: string;
}

interface Asistencia {
    id: number;
    fecha: string;
    hora_entrada: string;
    hora_salida: string | null;
    tipo: "estudiante" | "docente" | "personal_cocina";
    estudiante?: Persona;
    docente?: Persona;
    personalCocina?: Persona;
    observaciones: string | null;
}

interface Props extends PageProps {
    asistencias: Asistencia[];
    fechaActual: string;
    estudiantes: Persona[];
    docentes: Persona[];
    personalCocina: Persona[];
    secciones: Array<{ id: number; nombre: string }>;
}

export default function Index({
    asistencias,
    fechaActual,
    estudiantes,
    docentes,
    personalCocina,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tipo: "estudiante" as "estudiante" | "docente" | "personal_cocina",
        persona_id: "",
        fecha: fechaActual,
        hora_entrada: new Date().toTimeString().substring(0, 5),
        observaciones: "",
    });

    console.log(asistencias);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/asistencias");
    };

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(
            "/asistencias",
            { fecha: e.target.value },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const registrarSalida = (id: number) => {
        const horaSalida = new Date().toTimeString().substring(0, 5);
        router.put(`/asistencias/${id}`, { hora_salida: horaSalida });
    };

    const getPersonas = () => {
        switch (data.tipo) {
            case "estudiante":
                return estudiantes;
            case "docente":
                return docentes;
            case "personal_cocina":
                return personalCocina;
            default:
                return [];
        }
    };

    const getNombrePersona = (asistencia: Asistencia) => {
        switch (asistencia.tipo) {
            case "estudiante":
                return `${asistencia.estudiante?.nombre} ${asistencia.estudiante?.apellido} `;
            case "docente":
                return `${asistencia.docente?.nombre ?? ""} ${
                    asistencia.docente?.apellido ?? ""
                }`;

            case "personal_cocina":
                return asistencia.personalCocina?.nombre;
            default:
                return "Desconocido";
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Asistencias
                </h2>
            }
        >
            <Head title="Registro de Asistencias" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold mb-4">
                                Registro de Asistencias
                            </h2>

                            {/* Filtro por fecha */}
                            <div className="mb-6">
                                <label
                                    htmlFor="fecha"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="fecha"
                                    value={fechaActual}
                                    onChange={handleFechaChange}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                            </div>

                            {/* <MarcadoMasivo secciones={secciones} /> */}

                            {/* Formulario de registro */}
                            <form
                                onSubmit={handleSubmit}
                                className="mb-8 p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tipo
                                        </label>
                                        <select
                                            value={data.tipo}
                                            onChange={(e) => {
                                                setData(
                                                    "tipo",
                                                    e.target.value as
                                                        | "estudiante"
                                                        | "docente"
                                                        | "personal_cocina"
                                                );
                                                setData("persona_id", "");
                                            }}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="estudiante">
                                                Estudiante
                                            </option>
                                            <option value="docente">
                                                Docente
                                            </option>
                                            <option value="personal_cocina">
                                                Personal Cocina
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {data.tipo === "estudiante"
                                                ? "Estudiante"
                                                : data.tipo === "docente"
                                                ? "Docente"
                                                : "Personal Cocina"}
                                        </label>
                                        <select
                                            value={data.persona_id}
                                            onChange={(e) =>
                                                setData(
                                                    "persona_id",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        >
                                            <option value="">
                                                Seleccione...
                                            </option>
                                            {getPersonas().map((persona) => (
                                                <option
                                                    key={persona.id}
                                                    value={persona.id}
                                                >
                                                    {data.tipo === "estudiante"
                                                        ? `${persona.nombre} - ${persona.seccion.nombre}`
                                                        : persona.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Hora de entrada
                                        </label>
                                        <input
                                            type="time"
                                            value={data.hora_entrada}
                                            onChange={(e) =>
                                                setData(
                                                    "hora_entrada",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Observaciones
                                        </label>
                                        <input
                                            type="text"
                                            value={data.observaciones}
                                            onChange={(e) =>
                                                setData(
                                                    "observaciones",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                            placeholder="Opcional"
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Listado de asistencias */}
                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tipo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Entrada
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Salida
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Observaciones
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {asistencias.map((asistencia) => (
                                            <tr key={asistencia.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getNombrePersona(
                                                        asistencia
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap capitalize">
                                                    {asistencia.tipo.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {asistencia.hora_entrada}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {asistencia.hora_salida || (
                                                        <button
                                                            onClick={() =>
                                                                registrarSalida(
                                                                    asistencia.id
                                                                )
                                                            }
                                                            className="bg-indigo-400 transition-all hover:text-indigo-600 p-1 rounded-md text-white"
                                                        >
                                                            Registrar salida
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {asistencia.observaciones}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-red-600 hover:text-red-900">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

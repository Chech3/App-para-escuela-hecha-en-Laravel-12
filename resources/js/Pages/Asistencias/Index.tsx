// resources/js/Pages/Asistencias/Index.tsx
import { Head, useForm, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import Modal from "@/Components/Modal";

interface Persona {
    id: number;
    nombre?: string;
    apellido?: string;
}

interface Asistencia {
    id: number;
    fecha: string;
    hora_entrada: string;
    hora_salida: string | null;
    tipo: "docente" | "personal_cocina";
    docente?: Persona;
    personal_cocina?: Persona;
    observaciones: string | null;
}

interface Props extends PageProps {
    asistencias: Asistencia[];
    fechaActual: string;
    docentes: Persona[];
    personalCocina: Persona[];
    secciones: Array<{ id: number; nombre: string }>;
}

export default function Index({
    asistencias,
    fechaActual,
    docentes,
    personalCocina,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tipo: "docente" as "docente" | "personal_cocina",
        persona_id: "",
        fecha: fechaActual,
        hora_entrada: new Date().toTimeString().substring(0, 5),
        observaciones: "",
    });
    const [idM, setIdM] = useState<number | null>(null);
    const [showModalE, setShowModalE] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            case "docente":
                return `${asistencia.docente?.nombre ?? ""} ${
                    asistencia.docente?.apellido ?? ""
                }`;

            case "personal_cocina":
                return `${asistencia?.personal_cocina?.nombre ?? ""} ${
                    asistencia?.personal_cocina?.apellido ?? ""
                }`;
            default:
                return "Desconocido";
        }
    };

    const asistenciasFiltradas = asistencias.filter(
        (a) => a.tipo === "docente" || a.tipo === "personal_cocina"
    );

    const eliminar = (id: number) => {
        router.delete(route("asistencias.destroy", { id }), {
            onSuccess: () => {
                setShowModalE(false);
                setIdM(null);
            },
        });
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
                                                        | "docente"
                                                        | "personal_cocina"
                                                );
                                                setData("persona_id", "");
                                            }}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="docente">
                                                Docente
                                            </option>
                                            <option value="personal_cocina">
                                                Personal
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {data.tipo === "docente"
                                                ? "Docente"
                                                : "Personal"}
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
                                                    {data.tipo === "docente"
                                                        ? `${persona.nombre} ${persona.apellido}`
                                                        : `${persona.nombre} ${persona.apellido}`}
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

                                    <div className="flex space-x-2 items-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            Agregar
                                        </button>

                                        <a
                                            href={`/reporte-asistencias?tipo=semanal&fecha=${fechaActual}`}
                                            target="_blank"
                                            className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 "
                                        >
                                            Semanal
                                        </a>

                                        <a
                                            href={`/reporte-asistencias?tipo=mensual&fecha=${fechaActual}`}
                                            target="_blank"
                                            className="bg-green-600 hover:bg-green-700  text-white px-2 py-2 rounded ml-4"
                                        >
                                            Mensual
                                        </a>
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
                                        {asistenciasFiltradas.map(
                                            (asistencia) => (
                                                <tr key={asistencia.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getNombrePersona(
                                                            asistencia
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                                                        {asistencia.tipo ===
                                                            "personal_cocina" && (
                                                            <p>Personal</p>
                                                        )}

                                                         {asistencia.tipo !==
                                                            "personal_cocina" && (
                                                            <p>Docente</p>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            asistencia.hora_entrada
                                                        }
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
                                                        {
                                                            asistencia.observaciones
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => {
                                                                setShowModalE(
                                                                    true
                                                                );
                                                                setIdM(
                                                                    asistencia.id
                                                                );
                                                            }}
                                                            className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600"
                                                        >
                                                            <img
                                                                className="h-4 w-4"
                                                                src="/delete.svg"
                                                                alt="eliminar"
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>

                                    {asistenciasFiltradas.length === 0 && (
                                        <tbody>
                                            <tr className="text-center py-10">
                                                <td colSpan={6}>
                                                    <p className="text-2xl text-black py-5">
                                                        No hay registros
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showModalE}
                onClose={() => setShowModalE(false)}
                maxWidth="lg"
            >
                <div className="p-6">
                    <p>
                        ¿Estas seguro que deseas eliminar esta asistencia? Esta
                        acción no se puede deshacer.
                    </p>
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModalE(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (!isSubmitting) {
                                    setIsSubmitting(true);
                                    eliminar(idM!);
                                    setTimeout(() => {
                                        setShowModalE(false);
                                        setIsSubmitting(false);
                                    }, 900);
                                }
                            }}
                            type="submit"
                            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${
                                isSubmitting
                                    ? "opacity-75 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Eliminando..." : "Eliminar"}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

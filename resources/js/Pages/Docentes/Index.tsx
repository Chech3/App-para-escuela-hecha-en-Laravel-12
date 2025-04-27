import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { convertirHoraAMPM } from "../../utils/ConvertirHora";
export interface Docente {
    id: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    correo: string;
    horario: any;
}

export default function Index() {
    const { docentes, horarios } = usePage<any>().props;
    const [showModalE, setShowModalE] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        especialidad: "",
        correo: "",
        horario_id: "",
    });

    const eliminar = (id: number) => {
        router.delete(route(`docente.destroy`, { id })),
            {
                onSuccess: () => {
                    setShowModalE(false);
                    setIdM(null);
                },
            };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post("/docente", form, {
            onSuccess: () => {
                setShowModal(false);
                setForm({
                    nombre: "",
                    apellido: "",
                    especialidad: "",
                    correo: "",
                    horario_id: "",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Docentes
                </h2>
            }
        >
            <Head title="Docentes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Listado de Docentes
                            </h1>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Agregar Docente
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">
                                            Nombre
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Apellido
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Especialidad
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Horario
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Correo
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {docentes.map((e: Docente) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">
                                                {e.nombre}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.apellido}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.especialidad}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.horario
                                                    ? convertirHoraAMPM(
                                                          e.horario.hora_inicio
                                                      ) +
                                                      " - " +
                                                      convertirHoraAMPM(
                                                          e.horario.hora_fin
                                                      )
                                                    : "Sin horario"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.correo}
                                            </td>
                                            <td className="px-4 py-2 flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setShowModalE(true),
                                                            setIdM(e.id);
                                                    }}
                                                    className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600"
                                                >
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

            {/* Modal de Agregar Docente */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="lg"
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Agregar Docente
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                type="text"
                                placeholder="Nombre"
                                value={form.nombre}
                                onChange={(e) =>
                                    setForm({ ...form, nombre: e.target.value })
                                }
                                required
                            />
                            <TextInput
                                type="text"
                                placeholder="Apellido"
                                value={form.apellido}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        apellido: e.target.value,
                                    })
                                }
                                required
                            />
                            <TextInput
                                type="text"
                                placeholder="Especialidad"
                                value={form.especialidad}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        especialidad: e.target.value,
                                    })
                                }
                                required
                            />

                            <TextInput
                                type="email"
                                placeholder="Correo"
                                value={form.correo}
                                onChange={(e) =>
                                    setForm({ ...form, correo: e.target.value })
                                }
                                required
                            />

                            <select
                                value={form.horario_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        horario_id: e.target.value,
                                    })
                                }
                                required
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Selecciona un horario</option>
                                {horarios.map((horario: any) => (
                                    <option key={horario.id} value={horario.id}>
                                        {horario.nombre} (
                                        {convertirHoraAMPM(horario.hora_inicio)}
                                        - {convertirHoraAMPM(horario.hora_fin)})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                show={showModalE}
                onClose={() => setShowModalE(false)}
                maxWidth="lg"
            >
                <div className="p-6">
                    <p>
                        Estas seguro que deseas eliminar este docente? Esta
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

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import { User } from "@/types/inertia";

interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    genero: string;
    grado_id: number;
    seccion_id: number;
    grado: { id: number; nombre: string };
    seccion: { id: number; nombre: string };
}

interface Grado {
    id: number;
    nombre: string;
}

interface Seccion {
    id: number;
    nombre: string;
}

interface PageProps {
    auth: { user: User | null };
    estudiantes: Estudiante[];
    grados: Grado[];
    secciones: Seccion[];
}

export default function Index() {
    const { estudiantes, grados, secciones } = usePage<PageProps>().props;

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        genero: "",
        grado_id: "",
        seccion_id: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post("/estudiantes", form, {
            onSuccess: () => {
                setShowModal(false);
                setForm({
                    nombre: "",
                    apellido: "",
                    fecha_nacimiento: "",
                    genero: "",
                    grado_id: "",
                    seccion_id: ""
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Estudiantes
                </h2>
            }
        >
            <Head title="Estudiantes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Listado de Estudiantes</h1>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Agregar Estudiante
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">Nombre</th>
                                        <th className="px-4 py-2 text-left">Apellido</th>
                                        <th className="px-4 py-2 text-left">Género</th>
                                        <th className="px-4 py-2 text-left">Fecha Nacimiento</th>
                                        <th className="px-4 py-2 text-left">Grado</th>
                                        <th className="px-4 py-2 text-left">Sección</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {estudiantes.map((e) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">{e.nombre}</td>
                                            <td className="px-4 py-2">{e.apellido}</td>
                                            <td className="px-4 py-2">{e.genero}</td>
                                            <td className="px-4 py-2">{e.fecha_nacimiento}</td>
                                            <td className="px-4 py-2">{e.grado.nombre}</td>
                                            <td className="px-4 py-2">{e.seccion.nombre}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Agregar Estudiante */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Agregar Estudiante</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full border rounded px-3 py-2"
                                value={form.nombre}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Apellido"
                                className="w-full border rounded px-3 py-2"
                                value={form.apellido}
                                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                                required
                            />
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={form.fecha_nacimiento}
                                onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })}
                                required
                            />
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={form.genero}
                                onChange={(e) => setForm({ ...form, genero: e.target.value })}
                                required
                            >
                                <option value="">Seleccione género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={form.grado_id}
                                onChange={(e) => setForm({ ...form, grado_id: e.target.value })}
                                required
                            >
                                <option value="">Seleccione grado</option>
                                {grados?.map((grado) => (
                                    <option key={grado.id} value={grado.id}>
                                        {grado.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={form.seccion_id}
                                onChange={(e) => setForm({ ...form, seccion_id: e.target.value })}
                                required
                            >
                                <option value="">Seleccione sección</option>
                                {secciones?.map((seccion) => (
                                    <option key={seccion.id} value={seccion.id}>
                                        {seccion.nombre}
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
        </AuthenticatedLayout>
    );
}
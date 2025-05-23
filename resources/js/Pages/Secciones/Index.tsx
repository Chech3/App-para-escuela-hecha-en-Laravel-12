import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import SearchBar from "@/Components/SearchBar";

interface Seccion {
    id: number;
    nombre: string;
    grado: {
        id: number;
        nombre: string;
    };
    docente?: {
        id: number;
        nombre: string;
    } | null;
}

interface Grado {
    id: number;
    nombre: string;
}

interface Docente {
    id: number;
    nombre: string;
}

interface Props {
    secciones: Seccion[];
    grados: Grado[];
    docentes: Docente[];
}

export default function Index({ secciones, grados, docentes }: Props) {
    const [form, setForm] = useState({
        nombre: "",
        grado_id: "",
        docente_id: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [showModalE, setShowModalE] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);

    const eliminar = (id: number) => {
        router.delete(route("secciones.destroy", { id }), {
            onSuccess: () => {
                setShowModalE(false);
                setIdM(null);
            },
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (e.target.name === "nombre" && e.target.value.length > 9) {
            return;
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post("/secciones", form, {
            onSuccess: () => {
                setForm({ nombre: "", grado_id: "", docente_id: "" }),
                    setShowModal(false);
                     setIsSubmitting(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Secciones
                </h2>
            }
        >
            <Head title="Secciones" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Listado de Secciones
                            </h1>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Agregar Sección
                                </button>
                                <SearchBar
                                    routeName="secciones.index"
                                    placeholder="Buscar sección..."
                                    initialValue={
                                        new URLSearchParams(
                                            window.location.search
                                        ).get("search") || ""
                                    }
                                />
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Grado</th>
                                    <th className="p-3">Docente</th>
                                    <th className="p-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {secciones.map((s) => (
                                    <tr key={s.id} className="border-t">
                                        <td className="p-3">{s.nombre}</td>
                                        <td className="p-3">
                                            {s.grado?.nombre}
                                        </td>
                                        <td className="p-3">
                                            {s.docente?.nombre ?? "No asignado"}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    setShowModalE(true);
                                                    setIdM(s.id);
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
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Modal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        maxWidth="lg"
                    >
                        <form onSubmit={handleSubmit} className="mb-6  gap-4">
                            <div className="flex flex-col p-6">
                                <div>
                                    <label htmlFor="">
                                        Nombre de la sección
                                    </label>
                                    <TextInput
                                        type="text"
                                        name="nombre"
                                        value={form.nombre}
                                        onChange={handleChange}
                                        placeholder="Nombre de la sección (Ej: A)"
                                        className="border rounded px-4 py-2 w-full mb-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Grado</label>
                                    <select
                                        name="grado_id"
                                        value={form.grado_id}
                                        onChange={handleChange}
                                        className="border rounded px-4 py-2 w-full mb-2"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar grado
                                        </option>
                                        {grados.map((grado) => (
                                            <option
                                                key={grado.id}
                                                value={grado.id}
                                            >
                                                {grado.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Docente</label>
                                    <select
                                        name="docente_id"
                                        value={form.docente_id}
                                        onChange={handleChange}
                                        className="border rounded px-4 py-2 w-full mb-2"
                                    >
                                        <option value="">
                                            Seleccionar Docente
                                        </option>
                                        {docentes.map((docente) => (
                                            <option
                                                key={docente.id}
                                                value={docente.id}
                                            >
                                                {docente.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        Guardar sección
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>

                    {/* Modal para eliminar Seccion */}
                    <Modal
                        show={showModalE}
                        onClose={() => setShowModalE(false)}
                        maxWidth="lg"
                    >
                        <div className="p-6">
                            <p>
                                ¿Estas seguro que deseas eliminar este seccion?
                                Esta acción no se puede deshacer.
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
                                    {isSubmitting
                                        ? "Eliminando..."
                                        : "Eliminar"}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

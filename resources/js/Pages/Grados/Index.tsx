import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import SearchBar from "@/Components/SearchBar";

interface Grado {
    id: number | null;
    nombre: string;
    codigo: number;
}

interface Props {
    grados: Grado[];
}

export default function Index({ grados }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [showModalE, setShowModalE] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState<{
        id: number | null;
        nombre: string;
    }>({
        id: null,
        nombre: "",
    });

    const closeModalAndReset = () => {
        setShowModal(false);
        setForm({ id: null, nombre: "" });
        setIsSubmitting(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (form.id === null) {
            // Crear
            router.post(route("grados.store"), form, {
                onSuccess: () => {
                    closeModalAndReset();
                },
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.put(route("grados.update", { id: form.id }), form, {
                onSuccess: () => {
                    closeModalAndReset();
                },
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    const eliminar = (id: number) => {
        router.delete(route(`grados.destroy`, { id })),
            {
                onSuccess: () => {
                    setShowModalE(false);
                    setIdM(null);
                },
            };
    };

    const handleEdit = (grado: Grado) => {
        setForm({
            id: grado.id,
            nombre: grado.nombre,
        });
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Grados
                </h2>
            }
        >
            <Head title="Grados" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Listado de Grados
                            </h1>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Agregar Grado
                                </button>
                                <SearchBar
                                    routeName="grados.index"
                                    placeholder="Buscar grado..."
                                    initialValue={
                                        new URLSearchParams(
                                            window.location.search
                                        ).get("search") || ""
                                    }
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">
                                            ID
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Nombre
                                        </th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {grados.map((e: Grado) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">
                                                {e.id}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.nombre}
                                            </td>

                                            <td className="px-4 py-2 flex justify-center space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setShowModalE(true),
                                                            setIdM(e.id);
                                                    }}
                                                    className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600"
                                                >
                                                    <img
                                                        className="h-4 w-4"
                                                        src="/delete.svg"
                                                        alt="eliminar"
                                                    />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleEdit(e)
                                                    }
                                                    className="bg-yellow-500 rounded text-white px-4 py-2 hover:bg-yellow-600 mr-2"
                                                >
                                                    <img
                                                        className="h-4 w-4"
                                                        src="/edit.svg"
                                                        alt="editar"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {grados.length === 0 && (
                                    <tbody>
                                        <tr className="text-center py-10">
                                            <td colSpan={3}>
                                                <p className="text-2xl text-black py-2">
                                                    No hay registros
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>

                        <Modal
                            show={showModal}
                            onClose={() => {
                                setShowModal(false);
                                closeModalAndReset();
                            }}
                            maxWidth="lg"
                        >
                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="flex flex-col p-6">
                                    <div>
                                        <label className="py-2 px-2">
                                            Nombre del Grado
                                        </label>
                                        <TextInput
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            className="border rounded px-4 py-2 w-full mb-2"
                                            placeholder="Nombre del grado"
                                            value={form.nombre}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    nombre: e.target.value,
                                                })
                                            }
                                            required
                                        />
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
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal>

                        <Modal
                            show={showModalE}
                            onClose={() => setShowModalE(false)}
                            maxWidth="lg"
                        >
                            <div className="p-6">
                                <p>
                                    Estas seguro que deseas eliminar este grado?
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
            </div>
        </AuthenticatedLayout>
    );
}

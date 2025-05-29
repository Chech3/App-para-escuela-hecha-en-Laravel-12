import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import SearchBar from "@/Components/SearchBar";

interface PersonalCocina {
    id: number;
    nombre: string;
    apellido: string;
    tipo: string;
    cedula: string;
}

interface Props {
    personal: PersonalCocina[];
}

export default function Index({ personal }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [showModalE, setShowModalE] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        tipo: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (modoEdicion && idM !== null) {
            router.put(route("personalCocina.update", { id: idM }), form, {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            router.post(route("personalCocina.store"), form, {
                onSuccess: () => {
                    setShowModal(false);
                    setIsSubmitting(false);
                    setForm({
                        nombre: "",
                        apellido: "",
                        cedula: "",
                        tipo: "",
                    });
                },
            });
        }
    };

    const handleEdit = (personal: PersonalCocina) => {
        setForm({
            nombre: personal.nombre,
            apellido: personal.apellido,
            cedula: personal.cedula,
            tipo: personal.tipo,
        });
        setIdM(personal.id); // <-- guardar ID del docente a editar
        setModoEdicion(true);
        setShowModal(true);
    };

    const eliminar = (id: number) => {
        router.delete(route(`personalCocina.destroy`, { id })),
            {
                onSuccess: () => {
                    setShowModalE(false);
                    setIdM(null);
                },
            };
    };

    const resetForm = () => {
        setForm({
            nombre: "",
            apellido: "",
            cedula: "",
            tipo: "",
        });
        setIdM(null);
        setModoEdicion(false);
        setShowModal(false);
        setIsSubmitting(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Personal
                </h2>
            }
        >
            <Head title="Personal" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Listado del Personal
                            </h1>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Agregar Personal
                                </button>
                                <SearchBar
                                    routeName="personalCocina.index"
                                    placeholder="Buscar personal..."
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
                                        <th className="px-4 py-2 text-left">
                                            Apellido
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Cedula
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Tipo
                                        </th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {personal.map((e: PersonalCocina) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">
                                                {e.id}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.nombre}
                                            </td>

                                            <td className="px-4 py-2">
                                                {e.apellido}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.cedula}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.tipo}
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

                                {personal.length === 0 && (
                                    <tbody>
                                        <tr className="text-center py-10">
                                            <td colSpan={6}>
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
                                setShowModal(false), resetForm();
                            }}
                            maxWidth="lg"
                        >
                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="flex flex-col p-6">
                                    <div>
                                        <label className="py-2 px-2">
                                            Nombre
                                        </label>
                                        <TextInput
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            className="border rounded px-4 py-2 w-full mb-2"
                                            placeholder="Nombre "
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

                                    <div>
                                        <label className="py-2 px-2">
                                            Apellido
                                        </label>
                                        <TextInput
                                            type="text"
                                            name="apellido"
                                            id="apellido"
                                            className="border rounded px-4 py-2 w-full mb-2"
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
                                    </div>

                                    <div>
                                        <label className="py-2 px-2">
                                            Cedula
                                        </label>
                                        <TextInput
                                            type="number"
                                            name="cedula"
                                            id="cedula"
                                            className="border rounded px-4 py-2 w-full mb-2"
                                            placeholder="cedula"
                                            value={form.cedula}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    cedula: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="py-2 px-2">
                                            Tipo de Trabajador
                                        </label>

                                        <select
                                            value={form.tipo}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    tipo: e.target.value,
                                                })
                                            }
                                            className="w-full border rounded-md px-3 py-2"
                                        >
                                            <option value="Cocinero">
                                                Cocinero
                                            </option>
                                            <option value="Obrero">
                                                Obrero
                                            </option>
                                            <option value="Otro">Otro</option>
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
                                    Estas seguro que deseas eliminar este
                                    personal? Esta acción no se puede deshacer.
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

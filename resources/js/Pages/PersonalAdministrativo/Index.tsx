import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import SearchBar from "../../Components/SearchBar";
import InputError from "@/Components/InputError";

export interface Personal {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    numero: string;
    correo: string;
    cargo: any;
}

export default function Index() {
    const { personal, errors } = usePage<any>().props;

    const personalArray = personal ?? [];

    const [showModalE, setShowModalE] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        // especialidad: "",
        numero: "",
        correo: "",
        cargo: "",
    });

    const eliminar = (id: number) => {
        router.delete(route(`administrativo.destroy`, { id }), {
            onSuccess: () => {
                setShowModalE(false);
                setIdM(null);
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (modoEdicion && idM !== null) {
            router.put(route("administrativo.update", { id: idM }), form, {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            router.post(route("administrativo.store"), form, {
                onSuccess: () => {
                    resetForm();
                },
            });
        }
    };

    const resetForm = () => {
        setForm({
            nombre: "",
            apellido: "",
            cedula: "",
            // especialidad: "",
            numero: "",
            correo: "",
            cargo: "",
        });
        setIdM(null);
        setModoEdicion(false);
        setShowModal(false);
        setIsSubmitting(false);
    };

    const handleEdit = (personal: Personal) => {
        setForm({
            nombre: personal.nombre,
            apellido: personal.apellido,
            cedula: personal.cedula,
            // especialidad: personal.especialidad,
            numero: personal.numero,
            correo: personal.correo,
            cargo: personal.cargo,
        });
        setIdM(personal.id); 
        setModoEdicion(true);
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Personal Administrativo
                </h2>
            }
        >
            <Head title="Personal" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Personal Administrativo
                            </h1>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Agregar Personal
                                </button>

                                <SearchBar
                                    routeName="administrativo.index"
                                    placeholder="Buscar Personal..."
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
                                    <tr className="bg-gray-100 ">
                                        <th className="px-4 py-2 text-left">
                                            Nombre
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Apellido
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Número
                                        </th>
                                       
                                        <th className="px-4 py-2 text-left">
                                            Cargo
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Cedula
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {personalArray.map((e: Personal) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">
                                                {e.nombre}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.apellido}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.numero}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.cargo}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.cedula}
                                            </td>
                                            <td className="px-4 py-2 flex gap-2">
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
                                {personalArray.length === 0 && (
                                    <tbody className="text-center py-10">
                                        <tr>
                                            <td colSpan={7} className="py-10">
                                                <p className="text-2xl text-black text-center">
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

            {/* Modal de Agregar Docente */}
            <Modal
                show={showModal}
                onClose={() => {
                    setShowModal(false), resetForm();
                }}
                maxWidth="lg"
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Agregar Personal
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="nombre"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nombre
                                </label>
                                <TextInput
                                    type="text"
                                    placeholder="Nombre"
                                    value={form.nombre}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nombre: e.target.value,
                                        })
                                    }
                                    required
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors?.nombre}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="apellido"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Apellido
                                </label>
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
                                <InputError
                                    className="mt-2"
                                    message={errors?.apellido}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="cedula"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Cedula
                                </label>
                                <TextInput
                                    type="number"
                                    placeholder="Cedula"
                                    value={form.cedula}
                                    onChange={(e) => {
                                        if (e.target.value.length > 9) {
                                            return;
                                        } else {
                                            setForm({
                                                ...form,
                                                cedula: e.target.value,
                                            });
                                        }
                                    }}
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors?.cedula}
                                />
                            </div>

                            <div>
                                <label htmlFor="">Numero</label>
                                <TextInput
                                    type="number"
                                    placeholder="Numero"
                                    value={form.numero}
                                    onChange={(e) => {
                                        if (e.target.value.length > 12) {
                                            return;
                                        } else {
                                            setForm({
                                                ...form,
                                                numero: e.target.value,
                                            });
                                        }
                                    }}
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors?.numero}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Correo</label>
                                <TextInput
                                    type="email"
                                    placeholder="Correo"
                                    value={form.correo}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            correo: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors?.correo}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Cargo</label>
                                <select
                                    value={form.cargo}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            cargo: e.target.value,
                                        })
                                    }
                                    required
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">
                                        Selecciona un cargo
                                    </option>
                                    <option value="Director">Director</option>
                                    <option value="Personal Administrativo">Personal Administrativo</option>
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors?.cargo}
                                />
                            </div>
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
                        Estas seguro que deseas eliminar este Personal? Esta
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

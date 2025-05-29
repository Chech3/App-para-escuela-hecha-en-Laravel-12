import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Modal from "@/Components/Modal";
import { User } from "@/types/inertia";
import SearchBar from "@/Components/SearchBar";

export interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    cedula?: number;
    fecha_nacimiento: string;
    genero: string;
    grado_id: number;
    seccion_id: number;
    grado: { id: number; nombre: string };
    seccion: { id: number; nombre: string };
}

export interface Grado {
    id: number;
    nombre: string;
}

interface Seccion {
    id: number;
    nombre: string;
}

export interface PageProps {
    auth: { user: User | null };
    estudiantes: Estudiante[];
    grados: Grado[];
    secciones: Seccion[];
    [key: string]: any;
}

export default function Index() {
    const { estudiantes, grados, secciones } = usePage<any>().props;

    const [showModal, setShowModal] = useState(false);
    const [showModalE, setShowModalE] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [idM, setIdM] = useState<number | null>(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        cedula: "",
        genero: "",
        grado_id: "",
        seccion_id: "",
    });

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (modoEdicion && idM !== null) {
            router.put(route("estudiantes.update", { id: idM }), form, {
                onSuccess: () => {
                    resetForm();
                },
            });
        } else {
            router.post("/estudiantes", form, {
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
            fecha_nacimiento: "",
            genero: "",
            grado_id: "",
            seccion_id: "",
        });

        setIdM(null);
        setModoEdicion(false);
        setShowModal(false);
        setIsSubmitting(false);
    };

    const eliminar = (id: number) => {
        router.delete(route("estudiantes.destroy", { id }), {
            onSuccess: () => {
                setShowModalE(false);
                setIdM(null);
            },
        });
    };

    const handleEdit = (estudiante: Estudiante) => {
        console.log(estudiante);
        const fecha = estudiante.fecha_nacimiento
            ? new Date(estudiante.fecha_nacimiento).toISOString().split("T")[0]
            : "";
        setForm({
            nombre: estudiante.nombre,
            apellido: estudiante.apellido,
            fecha_nacimiento: fecha,
            genero: estudiante.genero,
            cedula:
                estudiante.cedula !== undefined
                    ? String(estudiante.cedula)
                    : "",
            grado_id: estudiante.grado ? String(estudiante.grado.id) : "",
            seccion_id: estudiante.seccion ? String(estudiante.seccion.id) : "",
        });
        setIdM(estudiante.id); // <-- guardar ID del docente a editar
        setModoEdicion(true);
        setShowModal(true);
    };

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                            <h1 className="text-2xl font-bold">
                                Listado de Estudiantes
                            </h1>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Agregar Estudiante
                                </button>

                                <SearchBar
                                    routeName="estudiantes.index"
                                    placeholder="Buscar estudiante..."
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
                                            Nombre
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Apellido
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Género
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Cedula Escolar
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Grado
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Sección
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {estudiantes.map((e: Estudiante) => (
                                        <tr key={e.id}>
                                            <td className="px-4 py-2">
                                                {e.nombre}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.apellido}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.genero}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.cedula ?? "N/P"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.grado.nombre}
                                            </td>
                                            <td className="px-4 py-2">
                                                {e.seccion.nombre}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="relative">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                handleEdit(e);
                                                                setShowDropdown(
                                                                    false
                                                                );
                                                            }}
                                                            className="flex items-center rounded-md px-2 py-2 bg-yellow-300 hover:bg-yellow-400"
                                                        >
                                                            <img
                                                                src="/edit.svg"
                                                                alt="Editar"
                                                                className="h-4 w-4"
                                                            />
                                                        </button>
                                                        <button
                                                            className="bg-gray-300 hover:bg-gray-400 px-2 py-2 rounded-md"
                                                            onClick={() =>
                                                                setShowDropdown(
                                                                    !showDropdown
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src="/more.svg"
                                                                alt="Más opciones"
                                                                className="h-4 w-4 backdrop-invert-0 rounded-md"
                                                            />
                                                        </button>
                                                    </div>

                                                    {showDropdown && (
                                                        <div
                                                            ref={dropdownRef}
                                                            className="fixed -right-4 mt-2  transform -translate-x-1/2 z-50 bg-white border rounded shadow-lg w-48"
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    setShowModalE(
                                                                        true
                                                                    );
                                                                    setIdM(
                                                                        e.id
                                                                    );
                                                                    setShowDropdown(
                                                                        false
                                                                    );
                                                                }}
                                                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <img
                                                                    src="/delete.svg"
                                                                    alt="Eliminar"
                                                                    className="h-4 w-4 mr-2"
                                                                />
                                                                Eliminar
                                                            </button>

                                                            <a
                                                                href={`/constancia/${e.id}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() =>
                                                                    setShowDropdown(
                                                                        false
                                                                    )
                                                                }
                                                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <img
                                                                    src="/print.svg"
                                                                    alt="Constancia"
                                                                    className="h-4 w-4 mr-2"
                                                                />
                                                                Constancia Inscripción
                                                            </a>

                                                            <a
                                                                href={`/constancia-estudio/${e.id}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() =>
                                                                    setShowDropdown(
                                                                        false
                                                                    )
                                                                }
                                                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <img
                                                                    src="/print.svg"
                                                                    alt="Constancia Estudio"
                                                                    className="h-4 w-4 mr-2"
                                                                />
                                                                Const. Estudio
                                                            </a>

                                                             <a
                                                                href={`/reporte-retiro/${e.id}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() =>
                                                                    setShowDropdown(
                                                                        false
                                                                    )
                                                                }
                                                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <img
                                                                    src="/print.svg"
                                                                    alt="Constancia"
                                                                    className="h-4 w-4 mr-2"
                                                                />
                                                                Constancia Retiro
                                                            </a>

                                                             <a
                                                                href={`/conducta/${e.id}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() =>
                                                                    setShowDropdown(
                                                                        false
                                                                    )
                                                                }
                                                                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                <img
                                                                    src="/print.svg"
                                                                    alt="Constancia"
                                                                    className="h-4 w-4 mr-2"
                                                                />
                                                                Const. Buena Conducta
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {estudiantes.length === 0 && (
                                    <tbody>
                                        <tr className="text-center py-10">
                                            <td colSpan={7}>
                                                <p className="text-2xl text-black py-2">
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

            {/* Modal de Agregar Estudiante */}
            <Modal
                show={showModal}
                onClose={() => {
                    setShowModal(false), resetForm();
                }}
                maxWidth="lg"
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Agregar Estudiante
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="w-full border rounded px-3 py-2"
                                    value={form.nombre}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nombre: e.target.value,
                                        })
                                    }
                                    maxLength={100}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    className="w-full border rounded px-3 py-2"
                                    value={form.apellido}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            apellido: e.target.value,
                                        })
                                    }
                                    maxLength={100}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="fecha_nacimiento">
                                    Fecha de Nacimiento
                                </label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-3 py-2"
                                    value={form.fecha_nacimiento}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            fecha_nacimiento: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="">Género</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={form.genero}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            genero: e.target.value,
                                        })
                                    }
                                    required
                                >
                                    <option value="">Seleccione género</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Grado</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={form.grado_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            grado_id: e.target.value,
                                        })
                                    }
                                    required
                                >
                                    <option value="">Seleccione grado</option>
                                    {grados?.map((grado: Grado) => (
                                        <option key={grado.id} value={grado.id}>
                                            {grado.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <div>
                                {/* <label htmlFor="">Seccion</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={form.seccion_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            seccion_id: e.target.value,
                                        })
                                    }
                                    required
                                >
                                    <option value="">Seleccione sección</option>
                                    {secciones?.map((seccion: Seccion) => (
                                        <option
                                            key={seccion.id}
                                            value={seccion.id}
                                        >
                                            {seccion.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div> */}

                            <div>
                                <label htmlFor="">Cedula Escolar</label>
                                <input
                                    type="number"
                                    className="w-full border rounded px-3 py-2"
                                    value={form.cedula}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            cedula: e.target.value,
                                        })
                                    }
                                    placeholder="32123466"
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
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 disabled:opacity-75 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:cursor-not-allowed"
                            >
                                {modoEdicion ? "Actualizar" : "Guardar"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            {/* Modal para eliminar Seccion */}
            <Modal
                show={showModalE}
                onClose={() => {
                    setShowModalE(false);
                }}
                maxWidth="lg"
            >
                <div className="p-6">
                    <p>
                        ¿Estas seguro que deseas eliminar este estudiante? Esta
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

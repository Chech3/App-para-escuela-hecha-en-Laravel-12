import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post("/secciones", form, {
            onSuccess: () => setForm({ nombre: "", grado_id: "", docente_id: "" }),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Secciones</h2>}>
            <Head title="Secciones" />

            <div className="max-w-4xl mx-auto py-10 bg-white rounded shadow-md px-6 mt-12">
                {/* <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre (Ej: A)"
                        className="border rounded px-4 py-2"
                        required
                    />

                    <select
                        name="grado_id"
                        value={form.grado_id}
                        onChange={handleChange}
                        className="border rounded px-4 py-2"
                        required
                    >
                        <option value="">Seleccionar grado</option>
                        {grados.map((grado) => (
                            <option key={grado.id} value={grado.id}>
                                {grado.nombre}
                            </option>
                        ))}
                    </select>

                    <select
                        name="docente_id"
                        value={form.docente_id}
                        onChange={handleChange}
                        className="border rounded px-4 py-2"
                    >
                        <option value="">(Opcional) Docente asignado</option>
                        {docentes.map((docente) => (
                            <option key={docente.id} value={docente.id}>
                                {docente.nombre}
                            </option>
                        ))}
                    </select>

                    <div className="col-span-full">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Guardar sección
                        </button>
                    </div>
                </form> */}

                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Grado</th>
                                <th className="p-3">Docente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secciones.map((s) => (
                                <tr key={s.id} className="border-t">
                                    <td className="p-3">{s.nombre}</td>
                                    <td className="p-3">{s.grado?.nombre}</td>
                                    <td className="p-3">{s.docente?.nombre ?? "No asignado"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

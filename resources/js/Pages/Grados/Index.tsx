import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Grado {
    id: number;
    nombre: string;
}

interface Props {
    grados: Grado[];
}

export default function Index({ grados }: Props) {
    const [nombre, setNombre] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post("/grados", { nombre }, {
            onSuccess: () => setNombre(""),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Grados</h2>}>
            <Head title="Grados" />

            <div className="max-w-3xl mx-auto py-10">
                <form onSubmit={handleSubmit} className="mb-6">
                    <input
                        type="text"
                        className="border rounded px-4 py-2 w-full mb-2"
                        placeholder="Nombre del grado"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
                        Agregar Grado
                    </button>
                </form>

                <div className="bg-white shadow rounded">
                    <ul className="divide-y divide-gray-200">
                        {grados.map((g) => (
                            <li key={g.id} className="p-4">{g.nombre}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

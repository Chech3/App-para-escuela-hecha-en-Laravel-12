

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface PageProps {
    auth: { user: User | null };
    estudiantes: Estudiante[];
    grados: Grado[];
    secciones: Seccion[];
}

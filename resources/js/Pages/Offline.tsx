import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {

    return (
        <GuestLayout>
            <Head title="Sin conexion" />

          
            <div className="mb-4 font-medium text-red-600 text-center text-2xl">
                No hay conexión a Internet
            </div>
           
        </GuestLayout>
    );
}

"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
    initialData: {
        nombre: string;
    };
    id_toy: number;
};

const formSchema = z.object({
    nombre: z.string().min(5, {
        message: "El nombre es requerido",
    }),
});

export const TitleForm = ({
    initialData,
    id_toy
}: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        if (!isEditing) {
            form.setValue("nombre", initialData.nombre);
        }
    };

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/juguetes/${id_toy}`, values);
            toast.success("Juguete Actualizado");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Sucedio un error");
        }
    }

    return (
        <div className="mt-6 border bg-[#cfcfcf] dark:bg-[#1f1f1f] rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                nombre del juguete
                <Button onClick={toggleEdit} variant="customghost">
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar nombre
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-xl mt-2">
                    {initialData.nombre}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="ej. 'Naruto modo kurama'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                                variant="success"
                            >
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const formSchema = z.object({
    nombre: z.string().min(1, {
        message: "El nombre es requerido",
    }),
});

const CreatePage = () => {
    const router = useRouter();
    // hook para el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
        },
    });

    ///Extraccion de estados del formulario
    const { isSubmitting, isValid } = form.formState;

    /*const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };*/

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/juguetes", values);
            router.push(`/juguetes/${response.data.uuid}`);
            toast.success("Juguete creado");
        } catch (error) {
            //console.log("ha ocurrido un error");
            toast.error("Ha ocurrido un error");
        }
    }


    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div className="bg-[#cfcfcf] dark:bg-[#1f1f1f] p-6">
                <h1 className="text-2xl">Informacion del nuevo juguete</h1>
                <p className="text-sm text-slate-600 dark:text-gray-500">
                    ¿Cual es el nombre del juguete? No te preocupes, puedes cambiar esto después.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nombre del juguete
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="ej. 'Naruto modo kurama'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        ¿Descripcion del juguete?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/juguetes">
                                <Button
                                    type="button"
                                    variant="destructive"
                                >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="success"
                                disabled={!isValid || isSubmitting}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;

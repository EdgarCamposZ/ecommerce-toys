"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tbl_toys } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface InventoryFormProps {
    initialData: tbl_toys;
    id_toy: number;
}

const formSchema = z.object({
    inventario: z.number().min(0, {
        message: "El inventario debe ser un número entero no negativo",
    }),
});

export const InventoryForm = ({ initialData, id_toy }: InventoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        if (!isEditing) {
            form.setValue("inventario", initialData?.inventario || 0);
        }
    };

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inventario: initialData?.inventario || 0,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/juguetes/${id_toy}`, values);
            toast.success("Inventario del juguete actualizado");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error(
                "Sucedio un error al actualizar el inventario del juguete"
            );
        }
    };

    return (
        <div className="mt-6 border bg-[#cfcfcf] dark:bg-[#1f1f1f] rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Inventario del juguete
                <Button onClick={toggleEdit} variant="customghost">
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar inventario
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className={cn(
                        "text-sm",
                        "text-slate-700 dark:text-white",
                        "mt-2",
                        !initialData.inventario && "italic"
                    )}
                >
                    {initialData.inventario || "* Sin inventario *"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="inventario"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            disabled={isSubmitting}
                                            placeholder="ej. 100"
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
    );
};

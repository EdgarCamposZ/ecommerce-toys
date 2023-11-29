import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
//import { IconBadge } from "@/components/IconBadge";
import { CircleDollarSign, ClipboardList, ImagePlus, LayoutDashboard } from "lucide-react";
import { TitleForm } from "./_components/NombreForm";
import { DescriptionForm } from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";
import { CategoriesForm } from "./_components/CategoriesForm";
import { PriceForm } from "./_components/PriceForm";
import { Prisma } from "@prisma/client";
import { AttachmentsForm } from "./_components/AttachmentsForm";
import { InventoryForm } from "./_components/InventoryForm";

const JugueteUuidPage = async ({
    params
}: {
    params: { uuid: string }
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const juguete = await db.tbl_toys.findFirst({
        where: {
            uuid: params.uuid,
            id_usuario: userId
        },
        include: {
            categoria: true,
            adjuntos: true
        },
    });

    const categories = await db.tbl_categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

    // if (juguete?.id_categoria !== null) {
    //     let category = await db.tbl_categorias.findUnique({
    //         where: {
    //             id_categoria: juguete?.id_categoria
    //         }
    //     });
    //     var categoryName = category?.nombre;
    // }

    if (!juguete) {
        return redirect("/");
    }

    const requiredFields = [
        juguete?.nombre,
        juguete?.descripcion,
        juguete?.imagen_url,
        juguete?.precio,
        juguete?.inventario,
        juguete?.id_categoria];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Configuracion del juguete
                    </h1>
                    <span className="text-sm text-slate-700 dark:text-white">
                        Completar todos los campos {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-full flex items-center justify-center bg-sky-100 dark:bg-[#1f1f1f] p-2">
                            <LayoutDashboard className="h-8 w-8 text-teal-700 dark:text-yellow-500" />
                        </div>
                        <h2 className="text-xl">
                            Personaliza tu juguete
                        </h2>
                    </div>
                    <TitleForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                    />
                    <DescriptionForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                    />
                    <CategoriesForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                        options={categories.map((category) => ({
                            label: category.nombre,
                            value: category.id_categoria,
                        }))}
                    //category={categoryName}
                    />
                    <ImageForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                    />
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-full flex items-center justify-center bg-sky-100 dark:bg-[#1f1f1f] p-2">
                            <CircleDollarSign className="h-8 w-8 text-teal-700 dark:text-yellow-500" />
                        </div>
                        <h2 className="text-xl">
                            Pon precio a tu juguete
                        </h2>
                    </div>
                    <PriceForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                    />
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-full flex items-center justify-center bg-sky-100 dark:bg-[#1f1f1f] p-2">
                            <ClipboardList className="h-8 w-8 text-teal-700 dark:text-yellow-500" />
                        </div>
                        <h2 className="text-xl">
                            Inventario del juguete
                        </h2>
                    </div>
                    <InventoryForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                    />
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-full flex items-center justify-center bg-sky-100 dark:bg-[#1f1f1f] p-2">
                            <ImagePlus className="h-8 w-8 text-teal-700 dark:text-yellow-500" />
                        </div>
                        <h2 className="text-xl">
                            Imagenes del juguete (Opcional)
                        </h2>
                        I</div>
                    <AttachmentsForm
                        initialData={juguete}
                        id_toy={juguete.id_toy}
                    />
                </div>
            </div>
        </div>
    );
}

export default JugueteUuidPage;

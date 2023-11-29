import { tbl_categorias, tbl_toys } from "@prisma/client";

import { db } from "@/lib/db";

type JugueteWithCategory = tbl_toys & {
    categoria: tbl_categorias | null;
};

type GetJuguetes = {
    userId: string;
    name?: string;
    category?: string;
};

export const getJuguetes = async ({
    userId,
    name,
    category
}: GetJuguetes): Promise<JugueteWithCategory[]> => {
    try {
        const categoria = await db.tbl_categorias.findFirst({
            where: {
                uuid: category,
            },
        });

        const juguetes = await db.tbl_toys.findMany({
            where: {
                nombre: {
                    contains: name,
                },
                id_categoria: category ? categoria?.id_categoria : undefined,
            },
            include: {
                categoria: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });


        const juguetesList: JugueteWithCategory[] = await Promise.all(
            juguetes.map(async juguete => {
                return {
                    ...juguete
                }
            })
        );
        return juguetesList;

    } catch (error) {
        console.log("[GET_JUGUETES]", error);
        return [];
    }
}

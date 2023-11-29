import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { id_toy: string } }
) {
    try {
        const { userId } = auth();
        const { id_toy } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const juguete = await db.tbl_toys.update({
            where: {
                id_toy: parseInt(id_toy),
                id_usuario: userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(juguete);
    } catch (error) {
        console.log("[JUGUETE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

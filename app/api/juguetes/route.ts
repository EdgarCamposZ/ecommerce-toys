import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const { nombre } = await req.json();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const juguete = await db.tbl_toys.create({
            data: {
                id_usuario: userId,
                nombre,
                inventario: 0
            }
        });

        return NextResponse.json(juguete);
    } catch (error) {
        console.log("[JUGUETE]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}

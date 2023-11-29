import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id_toy: string, id_adjunto: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const courseOwner = await db.tbl_toys.findUnique({
            where: {
                id_toy: parseInt(params.id_toy),
                id_usuario: userId
            }
        });

        if (!courseOwner) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const attachment = await db.tbl_adjuntos.delete({
            where: {
                id_toy: parseInt(params.id_toy),
                id_adjunto: parseInt(params.id_adjunto),
            }
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}


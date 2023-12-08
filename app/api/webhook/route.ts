import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const toyId = session?.metadata?.toyId;
    const toyUuid = session?.metadata?.toyUuid;

    if (event.type === "checkout.session.completed") {
        if (!userId || !toyId || !toyUuid) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        await db.tbl_compras.create({
            data: {
                id_toy: parseInt(toyId),
                toy_uuid: toyUuid,
                userId: userId,
            }
        });
    } else {
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }

    return new NextResponse(null, { status: 200 });
}

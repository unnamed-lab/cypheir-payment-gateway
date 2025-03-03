import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();

    const invoice = await prisma.invoice.create({
      data: {
        title: body.title,
        description: body.description,
        amount: body.amount,
        currency: body.currency,
        status: "pending",
        recipientEmail: body.recipientEmail,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        merchantPublicKey: body.merchantPublicKey,
        userId: session?.user?.id as string,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}

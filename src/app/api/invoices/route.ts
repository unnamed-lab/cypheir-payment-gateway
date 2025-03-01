import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

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
        userId: body.userId,
      },
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    console.error("Error creating invoice:", error)
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}


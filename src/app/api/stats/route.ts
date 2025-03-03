import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET() {
  try {
    // Calculate total volume
    const totalVolume = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "completed",
      },
    });

    // Count unique merchants (users with at least one transaction)
    const merchantCount = await prisma.user.count({
      where: {
        transactions: {
          some: {},
        },
      },
    });

    // Calculate average savings (assuming 5% is the standard fee and our fee is 1.8%)
    const standardFee = 0.05;
    const ourFee = 0.022;
    const avgSavings = ((standardFee - ourFee) / standardFee) * 100;

    return NextResponse.json({
      totalVolume: totalVolume._sum.amount || 0,
      merchantCount,
      avgSavings: avgSavings.toFixed(1),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

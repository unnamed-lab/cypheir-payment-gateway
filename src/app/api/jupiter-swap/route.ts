import { NextResponse } from "next/server"
import {
  PublicKey,
  // Connection
} from "@solana/web3.js"
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token"

// Mock RPC connection - replace with actual RPC endpoint in production
// const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { inputMint, outputMint, amount, slippage, userPublicKey, merchantPublicKey } = body

    if (!inputMint || !outputMint || !amount || !slippage || !userPublicKey || !merchantPublicKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get merchant's token account
    const merchantTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(outputMint),
      new PublicKey(merchantPublicKey),
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )

    // Get Jupiter quote
    const quoteResponse = await fetch(
      `https://quote-api.jup.ag/v4/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippage}&swapMode=ExactOut`,
    )
    const quoteData = await quoteResponse.json()

    if (!quoteData || quoteData.error) {
      return NextResponse.json({ error: "Failed to get Jupiter quote" }, { status: 500 })
    }

    // Get swap transaction
    const swapResponse = await fetch("https://quote-api.jup.ag/v4/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse: quoteData,
        userPublicKey: userPublicKey,
        destinationTokenAccount: merchantTokenAccount.toString(),
      }),
    })
    const swapData = await swapResponse.json()

    if (!swapData || swapData.error) {
      return NextResponse.json({ error: "Failed to get swap transaction" }, { status: 500 })
    }

    return NextResponse.json({
      swapTransaction: swapData.swapTransaction,
      inputAmount: quoteData.inAmount,
      outputAmount: quoteData.outAmount,
    })
  } catch (error) {
    console.error("Error processing Jupiter swap:", error)
    return NextResponse.json({ error: "Failed to process Jupiter swap" }, { status: 500 })
  }
}


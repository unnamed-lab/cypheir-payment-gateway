"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Invoice, Milestone } from "@prisma/client";

interface PaymentFormProps {
  invoice: Invoice;
  milestone?: Milestone;
}

export function PaymentForm({ invoice, milestone }: PaymentFormProps) {
  const [selectedToken, setSelectedToken] = useState("SOL");
  const [walletAddress, setWalletAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({milestone})
    console.log("Processing payment...");
    if (!walletAddress) {
      toast("Error \nPlease enter your wallet address");
      return;
    }

    setIsProcessing(true);

    try {
      // Get Jupiter swap quote and transaction
      const swapResponse = await fetch("/api/jupiter-swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputMint:
            selectedToken === "SOL"
              ? "So11111111111111111111111111111111111111112"
              : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
          amount: Number.parseFloat(invoice.amount.toString()) * 1000000, // Convert to USDC decimals
          slippage: 50, // 0.5%
          userPublicKey: walletAddress,
          merchantPublicKey: invoice.merchantPublicKey,
        }),
      });

      if (!swapResponse.ok) {
        throw new Error("Failed to get Jupiter swap quote");
      }

      const swapData = await swapResponse.json();

      // In a real app, you would call your API here to process the payment
      const response = await fetch(`/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoiceId: invoice.id,
          walletAddress,
          token: selectedToken,
          swapTransaction: swapData.swapTransaction,
          inputAmount: swapData.inputAmount,
          outputAmount: swapData.outputAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      // const data = await response.json()

      toast("Payment initiated!", {
        description: "Please confirm the transaction in your wallet.",
      });

      // Here you would typically wait for the blockchain confirmation
      // and then update the UI accordingly
    } catch (error) {
      console.error(error);
      toast("Payment failed", {
        description:
          "There was an error processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <RadioGroup
          value={selectedToken}
          onValueChange={setSelectedToken}
          className="grid grid-cols-2 gap-4"
        >
          <div className="relative">
            <RadioGroupItem value="SOL" id="SOL" className="peer sr-only" />
            <Label
              htmlFor="SOL"
              className="flex items-center justify-between rounded-md border-2 border-muted bg-card/50 backdrop-blur-sm p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="h-6 w-6 overflow-hidden rounded-full bg-[#00FFA3]/10">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="SOL"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="font-medium">SOL</div>
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ {(Number(invoice.amount) / 150).toFixed(4)} SOL
              </div>
            </Label>
          </div>

          <div className="relative">
            <RadioGroupItem value="USDC" id="USDC" className="peer sr-only" />
            <Label
              htmlFor="USDC"
              className="flex items-center justify-between rounded-md border-2 border-muted bg-card/50 backdrop-blur-sm p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="h-6 w-6 overflow-hidden rounded-full bg-[#2775CA]/10">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="USDC"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="font-medium">USDC</div>
              </div>
              <div className="text-sm text-muted-foreground">
                {invoice.amount} USDC
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="wallet-address">Your Wallet Address</Label>
          <Input
            id="wallet-address"
            placeholder="Enter your Solana wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            className="bg-background/50"
          />
        </div>

        <Card className="bg-card/30 border-purple-500/10">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Amount:</span>
              <span>
                {invoice.amount} {invoice.currency}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Payment Method:</span>
              <span>{selectedToken}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Network Fee:</span>
              <span>~0.000005 SOL</span>
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
              <span>Total:</span>
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {selectedToken === "SOL"
                  ? `≈ ${(Number(invoice.amount) / 150).toFixed(4)} SOL`
                  : `${invoice.amount} ${selectedToken}`}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {`By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy. All payments will be converted to
          USDC for the merchant using Jupiter.`}
        </p>
      </div>
    </form>
  );
}

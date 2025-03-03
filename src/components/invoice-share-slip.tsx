"use client"

import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface InvoiceShareSlipProps {
  invoice: {
    id: string;
    title: string;
    amount: number;
    currency: string;
    status: string;
    milestones?: Array<{ amount: number }>;
  };
}

export function InvoiceShareSlip({ invoice }: InvoiceShareSlipProps) {
  const invoiceUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/invoice/${invoice.id}`;

  const totalAmount = invoice.milestones
    ? invoice.milestones.reduce((sum, milestone) => sum + milestone.amount, 0)
    : invoice.amount;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice: ${invoice.title}`,
          text: `Please view and pay the invoice for ${formatCurrency(
            totalAmount,
            invoice.currency
          )}`,
          url: invoiceUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(invoiceUrl);
      alert("Invoice link copied to clipboard!");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Invoice Share Slip</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <p className="font-semibold">{invoice.title}</p>
          <p>Amount: {formatCurrency(totalAmount, invoice.currency)}</p>
          <p>Status: {invoice.status}</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG value={invoiceUrl} size={200} />
        </div>
        <Button onClick={handleShare} className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Share Invoice
        </Button>
      </CardContent>
    </Card>
  );
}

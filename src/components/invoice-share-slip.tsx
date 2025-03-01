import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface InvoiceShareSlipProps {
  invoice: {
    id: string
    title: string
    amount: number
    currency: string
    status: string
  }
}

export function InvoiceShareSlip({ invoice }: InvoiceShareSlipProps) {
  const invoiceUrl = `${window.location.origin}/invoice/${invoice.id}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice: ${invoice.title}`,
          text: `Please view and pay the invoice for ${invoice.amount} ${invoice.currency}`,
          url: invoiceUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(invoiceUrl)
      alert("Invoice link copied to clipboard!")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Invoice Share Slip</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <p className="font-semibold">{invoice.title}</p>
          <p>
            Amount: {invoice.amount} {invoice.currency}
          </p>
          <p>Status: {invoice.status}</p>
        </div>
        <QRCodeSVG value={invoiceUrl} size={200} />
        <Button onClick={handleShare} className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Share Invoice
        </Button>
      </CardContent>
    </Card>
  )
}


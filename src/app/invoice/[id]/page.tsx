import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PaymentForm } from "@/components/payment-form"
import { InvoiceShareSlip } from "@/components/invoice-share-slip"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, Copy, Mail, Share2 } from "lucide-react"
import Link from "next/link"

interface InvoicePageProps {
  params: {
    id: string
  }
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { user: true },
  })

  if (!invoice) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Dashboard
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Copy className="h-4 w-4" /> Copy Link
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-none bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl">Invoice Payment</CardTitle>
          <CardDescription>
            Pay invoice #{invoice.id} for {invoice.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-lg border bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-lg font-semibold">{invoice.title}</h3>
                <p className="text-sm text-muted-foreground">
                  From: {invoice.user.firstName} {invoice.user.lastName}
                </p>
              </div>
              <Badge
                variant={invoice.status === "pending" ? "outline" : "default"}
                className={
                  invoice.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                    : "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                }
              >
                {invoice.status}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="text-sm font-medium">Description</div>
                <div className="text-sm text-muted-foreground">{invoice.description || "No description provided"}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <div className="text-sm font-medium">Amount Due</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    {invoice.amount} {invoice.currency}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-sm font-medium">Recipient</div>
                  <div className="flex items-center text-sm">
                    <Mail className="mr-1 h-3 w-3" />
                    {invoice.recipientEmail}
                  </div>
                  {invoice.dueDate && (
                    <div className="flex items-center text-sm">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    Created: {new Date(invoice.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {invoice.status === "pending" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <PaymentForm invoice={invoice} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
          <p>
            Payments are processed securely through our platform. All transactions are converted to USDC for the
            merchant.
          </p>
          <p>Having trouble? Contact support at support@example.com</p>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <InvoiceShareSlip invoice={invoice} />
      </div>
    </div>
  )
}


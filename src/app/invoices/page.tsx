import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionTable } from "@/components/transaction-table"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function InvoicesPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage your invoices and payment links</p>
        </div>
        <Button asChild>
          <Link href="/create-invoice">
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Link>
        </Button>
      </div>

      <Card className="mt-6 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>View and manage all your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionTable isInvoice={true} />
        </CardContent>
      </Card>
    </div>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    totalSpent: "$1,234.56",
    lastTransaction: "2023-06-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    totalSpent: "$987.65",
    lastTransaction: "2023-05-28",
  },
  // Add more mock data as needed
]

export default function CustomersPage() {
  return (
    <div className="p-6 lg:p-16">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage and view information about your customers</p>
        </div>
      </div>

      <Card className="mt-6 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>A list of all your customers and their transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}


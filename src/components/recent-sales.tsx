import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Sale {
  id: string;
  customer: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  amount: number;
  currency: string;
  date: string;
}

interface RecentSalesProps {
  sales: Sale[];
}

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sales.map((sale) => (
            <div key={sale.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={sale.customer.avatarUrl}
                  alt={sale.customer.name}
                />
                <AvatarFallback>
                  {sale.customer.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {sale.customer.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sale.customer.email}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(sale.amount, sale.currency)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

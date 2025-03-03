import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { TokenDistribution } from "@/components/token-distribution"

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-16">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights into your payment activity and performance</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Your revenue trends over the past 12 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Overview />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Token Distribution</CardTitle>
            <CardDescription>Breakdown of received tokens before conversion</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <TokenDistribution />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


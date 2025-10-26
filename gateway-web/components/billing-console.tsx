import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, AlertTriangle, CreditCard, Download } from "lucide-react"

const billingData = {
  currentPeriod: {
    start: "Jan 1, 2025",
    end: "Jan 31, 2025",
    totalCost: 1247.83,
    budgetLimit: 2000,
    usage: 62.4,
  },
  providers: [
    { name: "OpenAI", cost: 567.23, percentage: 45.5, requests: 45200 },
    { name: "Anthropic", cost: 389.45, percentage: 31.2, requests: 28900 },
    { name: "Google", cost: 201.67, percentage: 16.2, requests: 15600 },
    { name: "Others", cost: 89.48, percentage: 7.1, requests: 4300 },
  ],
  alerts: [
    { type: "warning", message: "OpenAI costs increased 15% this week", severity: "medium" },
    { type: "info", message: "New billing cycle starts in 3 days", severity: "low" },
    { type: "success", message: "Cost optimization saved $234 this month", severity: "low" },
  ],
}

export function BillingConsole() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingData.currentPeriod.totalCost.toFixed(2)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Progress value={billingData.currentPeriod.usage} className="flex-1 h-1" />
              <span>{billingData.currentPeriod.usage}% of budget</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(billingData.currentPeriod.budgetLimit - billingData.currentPeriod.totalCost).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">of ${billingData.currentPeriod.budgetLimit} budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingData.alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {billingData.alerts.filter((a) => a.severity === "medium").length} require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">•••• 4242</div>
            <p className="text-xs text-muted-foreground">Expires 12/27</p>
          </CardContent>
        </Card>
      </div>

      {/* Provider Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Provider Cost Breakdown</CardTitle>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingData.providers.map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold">{provider.name.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">{provider.requests.toLocaleString()} requests</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${provider.cost.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{provider.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingData.alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  alert.severity === "medium"
                    ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
                    : alert.type === "success"
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                      : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
                }`}
              >
                <AlertTriangle
                  className={`h-4 w-4 ${
                    alert.severity === "medium"
                      ? "text-yellow-600"
                      : alert.type === "success"
                        ? "text-green-600"
                        : "text-blue-600"
                  }`}
                />
                <span className="text-sm">{alert.message}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, DollarSign, Clock, Zap, AlertTriangle } from "lucide-react"

const metrics = [
  {
    title: "Total Requests",
    value: "24,847",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    description: "Last 24 hours",
  },
  {
    title: "Average Latency",
    value: "342ms",
    change: "-8.2%",
    trend: "down",
    icon: Clock,
    description: "Across all providers",
  },
  {
    title: "Total Cost",
    value: "$127.43",
    change: "+5.1%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Success Rate",
    value: "99.7%",
    change: "+0.3%",
    trend: "up",
    icon: Zap,
    description: "Last 7 days",
  },
  {
    title: "Active Providers",
    value: "3/4",
    change: "1 down",
    trend: "warning",
    icon: AlertTriangle,
    description: "Anthropic offline",
  },
  {
    title: "Tokens Processed",
    value: "2.4M",
    change: "+18.7%",
    trend: "up",
    icon: Activity,
    description: "This week",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{metric.description}</span>
              <Badge
                variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "secondary" : "destructive"}
                className="text-xs"
              >
                {metric.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                {metric.trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
                {metric.trend === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {metric.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

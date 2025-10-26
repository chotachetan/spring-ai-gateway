import { Navigation } from "@/components/navigation"
import { MetricsOverview } from "@/components/metrics-overview"
import { UsageCharts } from "@/components/usage-charts"
import { LogsPanel } from "@/components/logs-panel"
import { DashboardFilters } from "@/components/dashboard-filters"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">
                Enterprise Dashboard
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Observability & Cost Management</h1>
              <p className="text-xl text-muted-foreground">
                Real-time insights into your AI gateway performance, costs, and system health.
              </p>
            </div>

            <div className="space-y-8">
              {/* Filters */}
              <DashboardFilters />

              {/* Metrics Overview */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
                <MetricsOverview />
              </section>

              {/* Charts */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Usage Analytics</h2>
                <UsageCharts />
              </section>

              {/* Logs */}
              <section>
                <h2 className="text-2xl font-bold mb-6">System Logs</h2>
                <LogsPanel />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

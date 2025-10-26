import { Navigation } from "@/components/navigation"
import { RoutingPlayground } from "@/components/routing-playground"
import { Badge } from "@/components/ui/badge"

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">
                Interactive Demo
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Intelligent Routing Playground</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Test Spring AI Gateway's intelligent routing strategies in real-time. See how different algorithms
                choose the optimal AI provider based on cost, latency, and capabilities.
              </p>
            </div>

            <RoutingPlayground />
          </div>
        </div>
      </main>
    </div>
  )
}

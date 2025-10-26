import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, Zap } from "lucide-react"

interface RoadmapItem {
  id: string
  phase: string
  title: string
  description: string
  status: "completed" | "in-progress" | "planned"
  quarter: string
  features: string[]
}

const roadmapItems: RoadmapItem[] = [
  {
    id: "1",
    phase: "Phase 1",
    title: "Core Gateway Foundation",
    description: "Essential gateway functionality with basic routing and provider support",
    status: "completed",
    quarter: "Q4 2024",
    features: ["Multi-provider support", "Basic routing", "Spring Boot integration", "REST API"],
  },
  {
    id: "2",
    phase: "Phase 2",
    title: "Intelligent Routing & Observability",
    description: "Advanced routing strategies and comprehensive monitoring capabilities",
    status: "in-progress",
    quarter: "Q1 2025",
    features: ["Cost-based routing", "Latency optimization", "Prometheus metrics", "Circuit breakers"],
  },
  {
    id: "3",
    phase: "Phase 3",
    title: "Enterprise Features & Security",
    description: "Production-ready security, governance, and enterprise integrations",
    status: "planned",
    quarter: "Q2 2025",
    features: ["Advanced security", "PII governance", "Audit logging", "RBAC"],
  },
  {
    id: "4",
    phase: "Phase 4",
    title: "AI-Powered Optimization",
    description: "Machine learning-driven routing and predictive cost optimization",
    status: "planned",
    quarter: "Q3 2025",
    features: ["ML routing", "Predictive scaling", "Auto-optimization", "Smart caching"],
  },
]

export function RoadmapTimeline() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>
      default:
        return <Badge variant="outline">Planned</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Development Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roadmapItems.map((item, index) => (
            <div key={item.id} className="relative">
              {index < roadmapItems.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />}
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{item.phase}</Badge>
                        <span>{item.quarter}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

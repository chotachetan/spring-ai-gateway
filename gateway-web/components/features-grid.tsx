import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Shield, Zap, Globe, Users, BarChart3, GitBranch, Server } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Java-Native",
    description:
      "Built with Spring Boot and reactive programming principles for seamless integration with existing Java infrastructure.",
    badge: "Core",
  },
  {
    icon: Globe,
    title: "Vendor Agnostic",
    description: "Support for OpenAI, Anthropic, Google Gemini, and more. Switch providers without changing your code.",
    badge: "Flexibility",
  },
  {
    icon: Zap,
    title: "Intelligent Routing",
    description:
      "Cost-based, latency-based, and capability-based routing with automatic failover and circuit breakers.",
    badge: "Performance",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Spring Security integration, JWT authentication, PII governance, and comprehensive audit logging.",
    badge: "Security",
  },
  {
    icon: BarChart3,
    title: "Observability",
    description: "Real-time metrics, token usage tracking, cost analysis, and Prometheus integration out of the box.",
    badge: "Monitoring",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Open-source with active community contributions, extensible architecture, and transparent roadmap.",
    badge: "Open Source",
  },
  {
    icon: Server,
    title: "Self-Hostable",
    description: "Deploy on your infrastructure with full control over data, compliance, and customization.",
    badge: "Control",
  },
  {
    icon: GitBranch,
    title: "Extensible",
    description: "Plugin architecture for custom filters, predicates, and integrations. Build what you need.",
    badge: "Customizable",
  },
]

export function FeaturesGrid() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto max-w-[980px] text-center mb-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-balance">
          Why Spring AI Gateway?
        </h2>
        <p className="mx-auto mt-6 max-w-[750px] text-lg text-muted-foreground text-pretty">
          Built by Java developers, for Java developers. Enterprise-ready features with community-driven innovation.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <feature.icon className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

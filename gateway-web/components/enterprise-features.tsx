import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Crown, Shield, Zap, Users, BarChart3, Lock, Headphones } from "lucide-react"

const features = [
  {
    category: "Security & Compliance",
    icon: Shield,
    items: [
      "Advanced RBAC with custom roles",
      "SOC 2 Type II compliance",
      "GDPR & CCPA compliance tools",
      "Advanced audit logging",
      "Custom security policies",
      "Dedicated security team",
    ],
  },
  {
    category: "Performance & Scale",
    icon: Zap,
    items: [
      "99.99% uptime SLA",
      "Global edge deployment",
      "Auto-scaling infrastructure",
      "Priority routing",
      "Dedicated compute resources",
      "Performance optimization",
    ],
  },
  {
    category: "Team & Collaboration",
    icon: Users,
    items: [
      "Unlimited team members",
      "Advanced team workspaces",
      "Custom approval workflows",
      "Integration with SSO providers",
      "Advanced user management",
      "Team usage analytics",
    ],
  },
  {
    category: "Analytics & Insights",
    icon: BarChart3,
    items: [
      "Advanced cost analytics",
      "Custom reporting dashboards",
      "Predictive cost modeling",
      "Usage forecasting",
      "Custom alerts & notifications",
      "Data export & API access",
    ],
  },
  {
    category: "Support & Services",
    icon: Headphones,
    items: [
      "24/7 dedicated support",
      "Dedicated customer success manager",
      "Priority bug fixes",
      "Custom feature development",
      "Migration assistance",
      "Training & onboarding",
    ],
  },
  {
    category: "Enterprise Integration",
    icon: Lock,
    items: [
      "Private cloud deployment",
      "VPC & private networking",
      "Custom API endpoints",
      "Enterprise connectors",
      "Legacy system integration",
      "Custom SLA agreements",
    ],
  },
]

export function EnterpriseFeatures() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 gap-2">
          <Crown className="h-3 w-3" />
          Enterprise Features
        </Badge>
        <h2 className="text-3xl font-bold mb-4">Everything you need for enterprise deployment</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Spring AI Gateway Enterprise Edition provides advanced features, dedicated support, and enterprise-grade
          security for mission-critical AI applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-5 w-5 text-primary" />
                {feature.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Join the waitlist for Spring AI Gateway Enterprise Edition and be among the first to experience
              enterprise-grade AI gateway management.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
              <Button size="lg" className="gap-2">
                <Crown className="h-4 w-4" />
                Request Early Access
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Headphones className="h-4 w-4" />
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

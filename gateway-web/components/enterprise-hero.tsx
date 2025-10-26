import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, BarChart3, Crown } from "lucide-react"

export function EnterpriseHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 gap-2">
            <Crown className="h-3 w-3" />
            Enterprise Preview
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:leading-[1.1] text-balance mb-6">
            Spring AI Gateway
            <br className="hidden sm:inline" />
            <span className="text-primary">Enterprise Edition</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground text-pretty mb-8">
            Take your AI infrastructure to the next level with enterprise-grade features, dedicated support, and
            advanced management capabilities. Coming soon as a managed SaaS offering.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
            <Button size="lg" className="gap-2">
              <Shield className="h-4 w-4" />
              Request Early Access
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Schedule Demo
            </Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid gap-6 mt-16 md:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">
                Advanced security features, compliance reporting, and dedicated security team support.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Team Management</h3>
              <p className="text-sm text-muted-foreground">
                Advanced RBAC, team workspaces, and centralized user management across your organization.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Premium Support</h3>
              <p className="text-sm text-muted-foreground">
                24/7 dedicated support, SLA guarantees, and direct access to our engineering team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

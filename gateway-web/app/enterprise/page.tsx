import { Navigation } from "@/components/navigation"
import { EnterpriseHero } from "@/components/enterprise-hero"
import { BillingConsole } from "@/components/billing-console"
import { TeamManagement } from "@/components/team-management"
import { EnterpriseFeatures } from "@/components/enterprise-features"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EnterprisePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <EnterpriseHero />

        <div className="container py-12">
          <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="features">Enterprise Features</TabsTrigger>
                <TabsTrigger value="billing">Billing Console</TabsTrigger>
                <TabsTrigger value="team">Team Management</TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <EnterpriseFeatures />
              </TabsContent>

              <TabsContent value="billing">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Unified Billing Console</h2>
                    <p className="text-lg text-muted-foreground">
                      Centralized billing management across all AI providers with advanced cost optimization and
                      budgeting tools.
                    </p>
                  </div>
                  <BillingConsole />
                </div>
              </TabsContent>

              <TabsContent value="team">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Advanced Team Management</h2>
                    <p className="text-lg text-muted-foreground">
                      Comprehensive user management with role-based access control, team workspaces, and advanced
                      permissions.
                    </p>
                  </div>
                  <TeamManagement />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

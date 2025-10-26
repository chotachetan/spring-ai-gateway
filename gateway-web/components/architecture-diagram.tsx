import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Database, Shield, BarChart3, Zap } from "lucide-react"

export function ArchitectureDiagram() {
  return (
    <div className="space-y-8">
      {/* Unified API Layer */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <CardTitle>Unified API Layer</CardTitle>
            <Badge variant="secondary">Core</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-mono">OpenAI</span>
              </div>
              <span className="text-sm text-muted-foreground">GPT-4, GPT-3.5</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-mono">Claude</span>
              </div>
              <span className="text-sm text-muted-foreground">Anthropic</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                <span className="text-sm font-mono">Gemini</span>
              </div>
              <span className="text-sm text-muted-foreground">Google AI</span>
            </div>
          </div>
          <div className="flex justify-center my-4">
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <span className="font-semibold">Normalized Spring AI Gateway API</span>
            <p className="text-sm text-muted-foreground mt-1">Single interface for all providers</p>
          </div>
        </CardContent>
      </Card>

      {/* Routing Engine */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <CardTitle>Routing & Failover Engine</CardTitle>
            <Badge variant="secondary">Intelligence</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Cost-Based</h4>
              <p className="text-sm text-muted-foreground">Route to cheapest provider for your use case</p>
              <div className="mt-2 text-xs font-mono bg-muted p-2 rounded">
                if (cost &lt; threshold) route(cheapest)
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Latency-Based</h4>
              <p className="text-sm text-muted-foreground">Optimize for fastest response times</p>
              <div className="mt-2 text-xs font-mono bg-muted p-2 rounded">if (latency &lt; 200ms) route(fastest)</div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Feature-Based</h4>
              <p className="text-sm text-muted-foreground">Route based on model capabilities</p>
              <div className="mt-2 text-xs font-mono bg-muted p-2 rounded">if (needsVision) route(gpt4v)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Observability Layer */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <CardTitle>Observability Layer</CardTitle>
            <Badge variant="secondary">Monitoring</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Metrics Collection</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Token usage tracking</li>
                <li>• Request/response latency</li>
                <li>• Error rates and types</li>
                <li>• Cost per request</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Integrations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prometheus metrics</li>
                <li>• Grafana dashboards</li>
                <li>• Spring Boot Actuator</li>
                <li>• Custom webhooks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Layer */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>Security Layer</CardTitle>
            <Badge variant="secondary">Enterprise</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Authentication</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Spring Security integration</li>
                <li>• JWT token validation</li>
                <li>• OAuth 2.0 / OIDC</li>
                <li>• API key management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Data Protection</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PII detection & masking</li>
                <li>• Request/response filtering</li>
                <li>• Audit logging</li>
                <li>• Compliance reporting</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

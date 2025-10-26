import { Navigation } from "@/components/navigation"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { CodeExamples } from "@/components/code-examples"
import { InteractiveChecklist } from "@/components/interactive-checklist"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const architecturePrinciples = [
  {
    title: "Model Agnosticism",
    content:
      "Spring AI Gateway provides a unified interface that abstracts away provider-specific APIs. Switch between OpenAI, Anthropic, Google, and other providers without changing your application code. The gateway handles API differences, authentication, and response normalization automatically.",
  },
  {
    title: "Extensibility",
    content:
      "Built on Spring's powerful plugin architecture, the gateway supports custom filters, routing predicates, and provider integrations. Implement your own business logic for request processing, response transformation, and routing decisions using familiar Spring patterns.",
  },
  {
    title: "Reactive Foundation",
    content:
      "Leverages Spring WebFlux for non-blocking, reactive processing. Handle thousands of concurrent AI requests efficiently with backpressure support, circuit breakers, and automatic failover. Perfect for high-throughput enterprise applications.",
  },
  {
    title: "Enterprise Security",
    content:
      "Comprehensive security features including Spring Security integration, JWT authentication, OAuth 2.0 support, PII detection and masking, audit logging, and compliance reporting. Meet enterprise security requirements out of the box.",
  },
  {
    title: "Observability First",
    content:
      "Built-in metrics collection, distributed tracing, and monitoring integration. Track token usage, costs, latency, and error rates with Prometheus, Grafana, and Spring Boot Actuator. Get insights into your AI usage patterns and optimize costs.",
  },
]

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12">
              <Badge variant="secondary" className="mb-4">
                Documentation
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Spring AI Gateway Architecture</h1>
              <p className="text-xl text-muted-foreground">
                Understand the core components and design principles behind Spring AI Gateway's enterprise-ready
                architecture.
              </p>
            </div>

            <div className="space-y-12">
              {/* Architecture Overview */}
              <section>
                <h2 className="text-2xl font-bold mb-6">System Architecture</h2>
                <ArchitectureDiagram />
              </section>

              {/* Architecture Principles */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Architecture Principles</h2>
                <Accordion type="single" collapsible className="w-full">
                  {architecturePrinciples.map((principle, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{principle.title}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{principle.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Code Examples */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Implementation Examples</h2>
                <CodeExamples />
              </section>

              {/* Getting Started */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>For Developers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quick start guide for integrating Spring AI Gateway into your Java applications.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Prerequisites</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Java 17 or higher</li>
                          <li>• Spring Boot 3.0+</li>
                          <li>• Maven or Gradle</li>
                          <li>• AI provider API keys</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <InteractiveChecklist />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

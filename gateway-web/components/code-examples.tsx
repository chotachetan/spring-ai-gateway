"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

const codeExamples = {
  setup: `// Add to your Spring Boot application
@SpringBootApplication
@EnableAIGateway
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// Configuration
spring:
  ai:
    gateway:
      providers:
        - name: openai
          api-key: \${OPENAI_API_KEY}
          enabled: true
        - name: anthropic
          api-key: \${ANTHROPIC_API_KEY}
          enabled: true
      routing:
        strategy: cost-optimized
        fallback: true`,

  usage: `@RestController
public class ChatController {
    
    @Autowired
    private AIGatewayClient aiClient;
    
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        // Gateway automatically routes to best provider
        ChatResponse response = aiClient.chat()
            .model("gpt-4") // or "claude-3" - gateway handles routing
            .messages(request.getMessages())
            .temperature(0.7)
            .execute();
            
        return ResponseEntity.ok(response);
    }
}`,

  routing: `// Custom routing predicate
@Component
public class CostOptimizedPredicate implements RoutingPredicate {
    
    @Override
    public boolean test(AIRequest request, ProviderMetrics metrics) {
        // Route to cheapest provider under latency threshold
        return metrics.getCostPerToken() < 0.001 && 
               metrics.getAverageLatency() < Duration.ofMillis(500);
    }
    
    @Override
    public int getOrder() {
        return 1; // Higher priority
    }
}`,

  filter: `// Custom request/response filter
@Component
public class PIIFilter implements AIGatewayFilter {
    
    @Override
    public Mono<AIResponse> filter(AIRequest request, AIFilterChain chain) {
        // Mask PII in request
        AIRequest sanitized = request.toBuilder()
            .content(maskPII(request.getContent()))
            .build();
            
        return chain.filter(sanitized)
            .map(response -> response.toBuilder()
                .content(maskPII(response.getContent()))
                .build());
    }
    
    private String maskPII(String content) {
        // Implementation for PII detection and masking
        return content.replaceAll("\\b\\d{3}-\\d{2}-\\d{4}\\b", "***-**-****");
    }
}`,
}

export function CodeExamples() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, key: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(key)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Examples</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Getting Started</TabsTrigger>
            <TabsTrigger value="usage">Basic Usage</TabsTrigger>
            <TabsTrigger value="routing">Custom Routing</TabsTrigger>
            <TabsTrigger value="filter">Custom Filter</TabsTrigger>
          </TabsList>

          {Object.entries(codeExamples).map(([key, code]) => (
            <TabsContent key={key} value={key}>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{code}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(code, key)}
                >
                  {copiedCode === key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

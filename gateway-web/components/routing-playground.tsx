"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Zap, DollarSign, Clock, Brain, ArrowRight } from "lucide-react"

interface ProviderResponse {
  provider: string
  model: string
  response: string
  latency: number
  cost: number
  tokens: number
  selected: boolean
  reason: string
}

const mockResponses: Record<string, ProviderResponse[]> = {
  "cost-based": [
    {
      provider: "OpenAI",
      model: "gpt-3.5-turbo",
      response:
        "Spring AI Gateway is an open-source Java-native AI gateway that provides unified API access to multiple AI providers with intelligent routing and enterprise-grade observability.",
      latency: 850,
      cost: 0.002,
      tokens: 45,
      selected: true,
      reason: "Lowest cost per token ($0.002) while meeting latency requirements",
    },
    {
      provider: "Anthropic",
      model: "claude-3-haiku",
      response:
        "Spring AI Gateway serves as a comprehensive Java-based solution for managing AI provider interactions, offering seamless routing, cost optimization, and detailed monitoring capabilities.",
      latency: 920,
      cost: 0.0025,
      tokens: 42,
      selected: false,
      reason: "Higher cost per token ($0.0025)",
    },
    {
      provider: "Google",
      model: "gemini-pro",
      response:
        "The Spring AI Gateway is an enterprise-ready, open-source platform that enables Java developers to integrate multiple AI providers through a single, unified interface with advanced routing logic.",
      latency: 780,
      cost: 0.003,
      tokens: 48,
      selected: false,
      reason: "Highest cost per token ($0.003)",
    },
  ],
  "latency-based": [
    {
      provider: "Google",
      model: "gemini-pro",
      response:
        "The Spring AI Gateway is an enterprise-ready, open-source platform that enables Java developers to integrate multiple AI providers through a single, unified interface with advanced routing logic.",
      latency: 780,
      cost: 0.003,
      tokens: 48,
      selected: true,
      reason: "Fastest response time (780ms)",
    },
    {
      provider: "OpenAI",
      model: "gpt-3.5-turbo",
      response:
        "Spring AI Gateway is an open-source Java-native AI gateway that provides unified API access to multiple AI providers with intelligent routing and enterprise-grade observability.",
      latency: 850,
      cost: 0.002,
      tokens: 45,
      selected: false,
      reason: "Slower response time (850ms)",
    },
    {
      provider: "Anthropic",
      model: "claude-3-haiku",
      response:
        "Spring AI Gateway serves as a comprehensive Java-based solution for managing AI provider interactions, offering seamless routing, cost optimization, and detailed monitoring capabilities.",
      latency: 920,
      cost: 0.0025,
      tokens: 42,
      selected: false,
      reason: "Slowest response time (920ms)",
    },
  ],
  "feature-based": [
    {
      provider: "OpenAI",
      model: "gpt-4-vision",
      response:
        "Spring AI Gateway is an open-source Java-native AI gateway that provides unified API access to multiple AI providers with intelligent routing and enterprise-grade observability. It supports multimodal capabilities including vision processing.",
      latency: 1200,
      cost: 0.01,
      tokens: 52,
      selected: true,
      reason: "Only provider supporting vision capabilities for this request",
    },
    {
      provider: "Anthropic",
      model: "claude-3-haiku",
      response: "Not available - model does not support vision processing",
      latency: 0,
      cost: 0,
      tokens: 0,
      selected: false,
      reason: "No vision support",
    },
    {
      provider: "Google",
      model: "gemini-pro",
      response: "Not available - model does not support vision processing",
      latency: 0,
      cost: 0,
      tokens: 0,
      selected: false,
      reason: "No vision support",
    },
  ],
}

export function RoutingPlayground() {
  const [prompt, setPrompt] = useState("Explain what Spring AI Gateway is and its key benefits.")
  const [strategy, setStrategy] = useState<string>("cost-based")
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<ProviderResponse[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    setShowResults(false)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setResponses(mockResponses[strategy] || [])
    setShowResults(true)
    setIsLoading(false)
  }

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case "cost-based":
        return DollarSign
      case "latency-based":
        return Clock
      case "feature-based":
        return Brain
      default:
        return Zap
    }
  }

  const StrategyIcon = getStrategyIcon(strategy)

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Interactive Routing Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Prompt</label>
            <Textarea
              placeholder="Enter your prompt to test routing..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Routing Strategy</label>
            <Select value={strategy} onValueChange={setStrategy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cost-based">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cost-Based Routing
                  </div>
                </SelectItem>
                <SelectItem value="latency-based">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Latency-Based Routing
                  </div>
                </SelectItem>
                <SelectItem value="feature-based">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Feature-Based Routing
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} disabled={isLoading || !prompt.trim()} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Request...
              </>
            ) : (
              <>
                <StrategyIcon className="mr-2 h-4 w-4" />
                Test Routing Strategy
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Routing Decision Flow */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              Routing Decision Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="text-sm">
                <span className="font-medium">Strategy:</span>{" "}
                {strategy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Selected:</span> {responses.find((r) => r.selected)?.provider} (
                {responses.find((r) => r.selected)?.model})
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="default">Routed</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Comparison */}
      {showResults && (
        <div className="grid gap-6 md:grid-cols-3">
          {responses.map((response, index) => (
            <Card key={index} className={`relative ${response.selected ? "ring-2 ring-primary" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{response.provider}</CardTitle>
                  {response.selected && <Badge variant="default">Selected</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{response.model}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm bg-muted p-3 rounded-lg">{response.response}</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Latency:</span>
                    <div className="text-muted-foreground">{response.latency}ms</div>
                  </div>
                  <div>
                    <span className="font-medium">Cost:</span>
                    <div className="text-muted-foreground">${response.cost.toFixed(4)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Tokens:</span>
                    <div className="text-muted-foreground">{response.tokens}</div>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <div className={response.selected ? "text-green-600" : "text-muted-foreground"}>
                      {response.selected ? "Selected" : "Not Selected"}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <span className="text-xs font-medium">Routing Reason:</span>
                  <p className="text-xs text-muted-foreground mt-1">{response.reason}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Strategy Explanations */}
      <Card>
        <CardHeader>
          <CardTitle>Routing Strategies Explained</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cost" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cost">Cost-Based</TabsTrigger>
              <TabsTrigger value="latency">Latency-Based</TabsTrigger>
              <TabsTrigger value="feature">Feature-Based</TabsTrigger>
            </TabsList>

            <TabsContent value="cost" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Cost Optimization</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Routes requests to the most cost-effective provider while maintaining quality thresholds. Considers
                token pricing, request complexity, and historical cost patterns.
              </p>
              <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                if (provider.costPerToken &lt; threshold && provider.latency &lt; maxLatency) {"{"}
                <br />
                &nbsp;&nbsp;route(provider);
                <br />
                {"}"}
              </div>
            </TabsContent>

            <TabsContent value="latency" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Latency Optimization</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Prioritizes fastest response times for real-time applications. Uses historical latency data and current
                provider health metrics.
              </p>
              <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                if (provider.avgLatency &lt; minLatency && provider.isHealthy()) {"{"}
                <br />
                &nbsp;&nbsp;route(provider);
                <br />
                {"}"}
              </div>
            </TabsContent>

            <TabsContent value="feature" className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Capability-Based</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Routes based on specific model capabilities like vision, function calling, or context length. Ensures
                requests go to providers that support required features.
              </p>
              <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                if (request.requiresVision() && provider.supportsVision()) {"{"}
                <br />
                &nbsp;&nbsp;route(provider);
                <br />
                {"}"}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

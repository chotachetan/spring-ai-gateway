"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error" | "success"
  provider: string
  message: string
  latency?: number
  cost?: number
  tokens?: number
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-01-09 14:32:15",
    level: "success",
    provider: "OpenAI",
    message: "Request completed successfully",
    latency: 320,
    cost: 0.002,
    tokens: 45,
  },
  {
    id: "2",
    timestamp: "2025-01-09 14:31:58",
    level: "warning",
    provider: "Anthropic",
    message: "High latency detected, switching to backup provider",
    latency: 1200,
  },
  {
    id: "3",
    timestamp: "2025-01-09 14:31:45",
    level: "error",
    provider: "Google",
    message: "Rate limit exceeded, request failed",
  },
  {
    id: "4",
    timestamp: "2025-01-09 14:31:30",
    level: "info",
    provider: "OpenAI",
    message: "Circuit breaker opened for provider",
  },
  {
    id: "5",
    timestamp: "2025-01-09 14:31:12",
    level: "success",
    provider: "Anthropic",
    message: "Failover completed successfully",
    latency: 450,
    cost: 0.0025,
    tokens: 38,
  },
  {
    id: "6",
    timestamp: "2025-01-09 14:30:58",
    level: "warning",
    provider: "Google",
    message: "Provider health check failed",
  },
]

export function LogsPanel() {
  const [logs, setLogs] = useState(mockLogs)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = filter === "all" || log.level === filter
    const matchesSearch =
      search === "" ||
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.provider.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const getLogBadgeVariant = (level: string) => {
    switch (level) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Circuit Breaker & Failover Logs</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
              <div className="mt-0.5">{getLogIcon(log.level)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-muted-foreground">{log.timestamp}</span>
                  <Badge variant={getLogBadgeVariant(log.level)} className="text-xs">
                    {log.level.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {log.provider}
                  </Badge>
                </div>
                <p className="text-sm">{log.message}</p>
                {(log.latency || log.cost || log.tokens) && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {log.latency && <span>Latency: {log.latency}ms</span>}
                    {log.cost && <span>Cost: ${log.cost.toFixed(4)}</span>}
                    {log.tokens && <span>Tokens: {log.tokens}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

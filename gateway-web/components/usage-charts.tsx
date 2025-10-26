"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const requestsData = [
  { time: "00:00", requests: 120, latency: 280 },
  { time: "04:00", requests: 80, latency: 320 },
  { time: "08:00", requests: 450, latency: 290 },
  { time: "12:00", requests: 680, latency: 340 },
  { time: "16:00", requests: 920, latency: 380 },
  { time: "20:00", requests: 750, latency: 310 },
  { time: "24:00", requests: 340, latency: 290 },
]

const costData = [
  { name: "OpenAI", value: 45.2, color: "#3b82f6" },
  { name: "Anthropic", value: 32.8, color: "#10b981" },
  { name: "Google", value: 18.4, color: "#f59e0b" },
  { name: "Others", value: 3.6, color: "#6b7280" },
]

const providerData = [
  { provider: "OpenAI", requests: 12400, cost: 45.2, avgLatency: 320 },
  { provider: "Anthropic", requests: 8200, cost: 32.8, avgLatency: 290 },
  { provider: "Google", requests: 4100, cost: 18.4, avgLatency: 380 },
  { provider: "Cohere", requests: 147, cost: 3.6, avgLatency: 450 },
]

export function UsageCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Requests Over Time */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Requests & Latency Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="requests"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Requests"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="latency"
                stroke="#10b981"
                strokeWidth={2}
                name="Latency (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Cost"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {costData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">${item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provider Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Provider Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={providerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="provider" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgLatency" fill="#3b82f6" name="Avg Latency (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

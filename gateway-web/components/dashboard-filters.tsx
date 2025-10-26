"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, X } from "lucide-react"

interface FilterState {
  dateRange: string
  provider: string
  team: string
}

export function DashboardFilters() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "7d",
    provider: "all",
    team: "all",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))

    // Update active filters
    if (value !== "all" && value !== "7d") {
      if (!activeFilters.includes(key)) {
        setActiveFilters((prev) => [...prev, key])
      }
    } else {
      setActiveFilters((prev) => prev.filter((f) => f !== key))
    }
  }

  const clearFilter = (key: string) => {
    const defaultValue = key === "dateRange" ? "7d" : "all"
    setFilters((prev) => ({ ...prev, [key]: defaultValue }))
    setActiveFilters((prev) => prev.filter((f) => f !== key))
  }

  const clearAllFilters = () => {
    setFilters({ dateRange: "7d", provider: "all", team: "all" })
    setActiveFilters([])
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.provider} onValueChange={(value) => updateFilter("provider", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="cohere">Cohere</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.team} onValueChange={(value) => updateFilter("team", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>

          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="gap-1">
                  {filter}: {filters[filter as keyof FilterState]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => clearFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Clear All
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

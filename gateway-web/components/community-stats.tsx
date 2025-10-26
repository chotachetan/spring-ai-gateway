import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, MessageCircle, Users, GitPullRequest, Star, GitFork } from "lucide-react"

const stats = [
  {
    icon: Github,
    label: "GitHub Stars",
    value: "2,847",
    change: "+127 this week",
    color: "text-yellow-500",
  },
  {
    icon: GitFork,
    label: "Forks",
    value: "342",
    change: "+23 this week",
    color: "text-blue-500",
  },
  {
    icon: GitPullRequest,
    label: "Pull Requests",
    value: "156",
    change: "12 open",
    color: "text-green-500",
  },
  {
    icon: Users,
    label: "Contributors",
    value: "89",
    change: "+5 this month",
    color: "text-purple-500",
  },
  {
    icon: MessageCircle,
    label: "Discord Members",
    value: "1,234",
    change: "+89 this week",
    color: "text-indigo-500",
  },
  {
    icon: Star,
    label: "Issues Resolved",
    value: "234",
    change: "8 open",
    color: "text-orange-500",
  },
]

export function CommunityStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

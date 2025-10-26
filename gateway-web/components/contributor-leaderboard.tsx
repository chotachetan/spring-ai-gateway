import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Star, GitPullRequest, Trophy, Medal, Award } from "lucide-react"

interface Contributor {
  id: string
  name: string
  username: string
  avatar: string
  contributions: number
  prs: number
  stars: number
  rank: number
  badge: "gold" | "silver" | "bronze" | "contributor"
  specialties: string[]
}

const contributors: Contributor[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahc-dev",
    avatar: "/developer-avatar.png",
    contributions: 127,
    prs: 45,
    stars: 892,
    rank: 1,
    badge: "gold",
    specialties: ["Core Architecture", "Performance"],
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    username: "mrodriguez",
    avatar: "/developer-avatar-2.png",
    contributions: 98,
    prs: 32,
    stars: 654,
    rank: 2,
    badge: "silver",
    specialties: ["Security", "Authentication"],
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    username: "ytanaka",
    avatar: "/developer-avatar-3.png",
    contributions: 76,
    prs: 28,
    stars: 423,
    rank: 3,
    badge: "bronze",
    specialties: ["Documentation", "Testing"],
  },
  {
    id: "4",
    name: "Alex Thompson",
    username: "athompson",
    avatar: "/developer-avatar-4.jpg",
    contributions: 54,
    prs: 19,
    stars: 287,
    rank: 4,
    badge: "contributor",
    specialties: ["UI/UX", "Frontend"],
  },
  {
    id: "5",
    name: "Priya Patel",
    username: "ppatel",
    avatar: "/developer-avatar-5.jpg",
    contributions: 43,
    prs: 15,
    stars: 198,
    rank: 5,
    badge: "contributor",
    specialties: ["Observability", "Metrics"],
  },
]

export function ContributorLeaderboard() {
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "gold":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case "silver":
        return <Medal className="h-4 w-4 text-gray-400" />
      case "bronze":
        return <Award className="h-4 w-4 text-amber-600" />
      default:
        return <Star className="h-4 w-4 text-primary" />
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "bronze":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-muted-foreground">#{contributor.rank}</span>
                  {getBadgeIcon(contributor.badge)}
                </div>
                <Avatar>
                  <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                  <AvatarFallback>
                    {contributor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{contributor.name}</span>
                    <Badge className={getBadgeColor(contributor.badge)}>{contributor.badge}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>@{contributor.username}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <GitPullRequest className="h-3 w-3" />
                        {contributor.prs} PRs
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {contributor.stars}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {contributor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                View Profile
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Github className="h-4 w-4" />
            View All Contributors
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

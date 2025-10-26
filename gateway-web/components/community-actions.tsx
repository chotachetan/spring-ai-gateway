import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, MessageCircle, Mail, BookOpen, Users, Heart } from "lucide-react"

const actions = [
  {
    icon: Github,
    title: "Star on GitHub",
    description: "Show your support and stay updated with releases",
    action: "Star Repository",
    variant: "default" as const,
  },
  {
    icon: MessageCircle,
    title: "Join Discord",
    description: "Connect with developers and get real-time help",
    action: "Join Community",
    variant: "outline" as const,
  },
  {
    icon: Mail,
    title: "Subscribe to Newsletter",
    description: "Get monthly updates on features and community news",
    action: "Subscribe",
    variant: "secondary" as const,
  },
  {
    icon: BookOpen,
    title: "Contribute Documentation",
    description: "Help improve our docs and tutorials",
    action: "Start Writing",
    variant: "outline" as const,
  },
  {
    icon: Users,
    title: "Become a Maintainer",
    description: "Join the core team and help shape the project",
    action: "Apply Now",
    variant: "default" as const,
  },
  {
    icon: Heart,
    title: "Sponsor the Project",
    description: "Support development with financial contributions",
    action: "Sponsor",
    variant: "outline" as const,
  },
]

export function CommunityActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {actions.map((action, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <action.icon className="h-5 w-5 text-primary" />
              {action.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{action.description}</p>
            <Button variant={action.variant} className="w-full gap-2">
              <action.icon className="h-4 w-4" />
              {action.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

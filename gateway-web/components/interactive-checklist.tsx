"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, MessageCircle, GitPullRequest } from "lucide-react"

const checklistItems = [
  {
    id: "fork",
    title: "Fork the Repository",
    description: "Create your own copy of the Spring AI Gateway repository",
    icon: Github,
    action: "Fork on GitHub",
  },
  {
    id: "clone",
    title: "Clone Locally",
    description: "Clone your fork to your development environment",
    icon: Github,
    action: "git clone",
  },
  {
    id: "setup",
    title: "Run Sample Gateway",
    description: "Start the example application and test basic functionality",
    icon: Github,
    action: "mvn spring-boot:run",
  },
  {
    id: "explore",
    title: "Explore the Code",
    description: "Understand the architecture and identify areas for contribution",
    icon: Github,
    action: "Browse Code",
  },
  {
    id: "issue",
    title: "Pick an Issue",
    description: "Find a good first issue or feature request to work on",
    icon: Github,
    action: "View Issues",
  },
  {
    id: "develop",
    title: "Make Changes",
    description: "Implement your feature or bug fix with tests",
    icon: Github,
    action: "Start Coding",
  },
  {
    id: "pr",
    title: "Submit Pull Request",
    description: "Create a PR with your changes and detailed description",
    icon: GitPullRequest,
    action: "Create PR",
  },
  {
    id: "community",
    title: "Join Discord",
    description: "Connect with other contributors and maintainers",
    icon: MessageCircle,
    action: "Join Community",
  },
]

export function InteractiveChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const progress = (checkedItems.size / checklistItems.length) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contributor Journey</CardTitle>
          <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
              <Checkbox
                id={item.id}
                checked={checkedItems.has(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <label
                    htmlFor={item.id}
                    className={`font-medium cursor-pointer ${
                      checkedItems.has(item.id) ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.title}
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  {item.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserPlus, Settings, Shield, Eye, Edit } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "developer" | "viewer"
  avatar?: string
  lastActive: string
  permissions: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    avatar: "/team-avatar-1.jpg",
    lastActive: "2 hours ago",
    permissions: ["Full Access", "Billing", "User Management"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "developer",
    avatar: "/team-avatar-2.jpg",
    lastActive: "1 day ago",
    permissions: ["API Access", "Dashboard", "Metrics"],
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "developer",
    lastActive: "3 days ago",
    permissions: ["API Access", "Dashboard"],
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@company.com",
    role: "viewer",
    lastActive: "1 week ago",
    permissions: ["Dashboard View", "Reports"],
  },
]

const roleConfig = {
  admin: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: Shield },
  developer: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: Edit },
  viewer: { color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200", icon: Eye },
}

export function TeamManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Team Management</CardTitle>
            </div>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{teamMembers.filter((m) => m.role === "admin").length}</div>
              <div className="text-sm text-muted-foreground">Administrators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {teamMembers.filter((m) => m.lastActive.includes("hour") || m.lastActive.includes("day")).length}
              </div>
              <div className="text-sm text-muted-foreground">Active This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => {
              const RoleIcon = roleConfig[member.role].icon
              return (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{member.name}</span>
                        <Badge className={roleConfig[member.role].color}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {member.role}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                      <div className="text-xs text-muted-foreground">Last active: {member.lastActive}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">Permissions</div>
                      <div className="flex gap-1 mt-1">
                        {member.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {member.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="font-semibold">Administrator</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• Billing & payments</li>
                <li>• Security settings</li>
                <li>• API key management</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">Developer</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• API access</li>
                <li>• Dashboard access</li>
                <li>• Metrics & monitoring</li>
                <li>• Configuration changes</li>
                <li>• Log access</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span className="font-semibold">Viewer</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dashboard view</li>
                <li>• Reports access</li>
                <li>• Metrics viewing</li>
                <li>• Read-only access</li>
                <li>• Export data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

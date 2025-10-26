import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introducing Spring AI Gateway: The Future of AI Integration",
    excerpt:
      "Learn about our vision for creating a Java-native AI gateway that simplifies multi-provider integration while maintaining enterprise-grade security and observability.",
    author: "Spring AI Team",
    date: "2025-01-08",
    category: "Announcement",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Cost Optimization Strategies with Intelligent Routing",
    excerpt:
      "Discover how Spring AI Gateway's intelligent routing can reduce your AI costs by up to 40% while maintaining response quality and performance.",
    author: "Sarah Chen",
    date: "2025-01-05",
    category: "Technical",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Building Your First Custom Routing Predicate",
    excerpt:
      "A step-by-step guide to creating custom routing logic that meets your specific business requirements and performance criteria.",
    author: "Marcus Rodriguez",
    date: "2025-01-02",
    category: "Tutorial",
    readTime: "12 min read",
  },
  {
    id: "4",
    title: "Security Best Practices for AI Gateways",
    excerpt:
      "Essential security considerations when deploying AI gateways in production, including PII handling, authentication, and audit logging.",
    author: "Yuki Tanaka",
    date: "2024-12-28",
    category: "Security",
    readTime: "10 min read",
  },
]

export function BlogFeed() {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "announcement":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "technical":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "tutorial":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "security":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Latest Blog Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="space-y-3 pb-6 border-b last:border-b-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold leading-tight hover:text-primary cursor-pointer transition-colors">
                  {post.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  Read More
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" className="gap-2 bg-transparent">
            <BookOpen className="h-4 w-4" />
            View All Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

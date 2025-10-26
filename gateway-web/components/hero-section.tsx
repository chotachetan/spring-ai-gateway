import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, MessageCircle, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="container flex flex-col items-center justify-center space-y-4 py-24 md:py-32">
      <Badge variant="secondary" className="mb-4">
        AI Gateway Market: $400M → $3.9B
      </Badge>
      <div className="mx-auto max-w-[980px] text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance">
          Java-Native AI Gateway
          <br className="hidden sm:inline" />
          for the Enterprise
        </h1>
        <p className="mx-auto mt-6 max-w-[750px] text-lg text-muted-foreground sm:text-xl text-pretty">
          Open-source, community-driven AI gateway platform. Unified API layer, intelligent routing, and
          enterprise-grade observability built specifically for Java developers.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 mt-8">
        <Button size="lg" className="gap-2">
          <Github className="h-4 w-4" />
          View on GitHub
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          <Play className="h-4 w-4" />
          Try Demo
        </Button>
        <Button variant="ghost" size="lg" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Join Discord
        </Button>
      </div>
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-8">Trusted by developers at</p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          <div className="text-lg font-semibold">Netflix</div>
          <div className="text-lg font-semibold">Spotify</div>
          <div className="text-lg font-semibold">Airbnb</div>
          <div className="text-lg font-semibold">Uber</div>
          <div className="text-lg font-semibold">LinkedIn</div>
        </div>
      </div>
    </section>
  )
}

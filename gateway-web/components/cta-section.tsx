import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, MessageCircle, Star, GitFork } from "lucide-react"

export function CTASection() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto max-w-[980px] text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-balance">
          Join the Community
        </h2>
        <p className="mx-auto mt-6 max-w-[750px] text-lg text-muted-foreground text-pretty">
          Help us build the future of AI gateways for Java developers. Contribute code, share ideas, and shape the
          roadmap.
        </p>
        <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Github className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Star on GitHub</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Show your support and stay updated with the latest releases.
              </p>
              <Button className="w-full gap-2">
                <Star className="h-4 w-4" />
                Star Repository
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <MessageCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Join Discord</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Connect with other developers and get help from the community.
              </p>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <MessageCircle className="h-4 w-4" />
                Join Community
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <GitFork className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contribute</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Fork the repository and submit your first pull request.
              </p>
              <Button variant="secondary" className="w-full gap-2">
                <GitFork className="h-4 w-4" />
                Start Contributing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

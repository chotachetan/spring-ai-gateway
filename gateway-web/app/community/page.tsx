import { Navigation } from "@/components/navigation"
import { ContributorLeaderboard } from "@/components/contributor-leaderboard"
import { RoadmapTimeline } from "@/components/roadmap-timeline"
import { BlogFeed } from "@/components/blog-feed"
import { CommunityStats } from "@/components/community-stats"
import { CommunityActions } from "@/components/community-actions"
import { Badge } from "@/components/ui/badge"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">
                Community Hub
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Join the Spring AI Gateway Community</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with developers, contribute to the project, and help shape the future of AI gateways for Java
                applications.
              </p>
            </div>

            <div className="space-y-12">
              {/* Community Stats */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Community Overview</h2>
                <CommunityStats />
              </section>

              {/* Main Content Grid */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-6">Top Contributors</h2>
                    <ContributorLeaderboard />
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-6">Development Roadmap</h2>
                    <RoadmapTimeline />
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
                    <BlogFeed />
                  </section>
                </div>
              </div>

              {/* Community Actions */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Get Involved</h2>
                <CommunityActions />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

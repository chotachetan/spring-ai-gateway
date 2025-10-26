import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { ComparisonTable } from "@/components/comparison-table"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <FeaturesGrid />
        <ComparisonTable />
        <CTASection />
      </main>
      <footer className="border-t border-border/40 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="h-6 w-6 rounded bg-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by the community for Java developers. Open source and free forever.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 Spring AI Gateway. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

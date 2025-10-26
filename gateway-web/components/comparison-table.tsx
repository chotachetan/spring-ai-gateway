import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const comparisons = [
  {
    feature: "Java-Native",
    springAI: true,
    vercel: false,
    openRouter: false,
  },
  {
    feature: "Open Source",
    springAI: true,
    vercel: false,
    openRouter: false,
  },
  {
    feature: "Self-Hostable",
    springAI: true,
    vercel: false,
    openRouter: false,
  },
  {
    feature: "Enterprise Security",
    springAI: true,
    vercel: true,
    openRouter: false,
  },
  {
    feature: "Multi-Provider Support",
    springAI: true,
    vercel: true,
    openRouter: true,
  },
  {
    feature: "Cost Optimization",
    springAI: true,
    vercel: false,
    openRouter: true,
  },
  {
    feature: "Real-time Observability",
    springAI: true,
    vercel: true,
    openRouter: false,
  },
  {
    feature: "Community Driven",
    springAI: true,
    vercel: false,
    openRouter: false,
  },
]

export function ComparisonTable() {
  return (
    <section className="container py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-[980px] text-center mb-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-balance">How We Compare</h2>
        <p className="mx-auto mt-6 max-w-[750px] text-lg text-muted-foreground text-pretty">
          See why Spring AI Gateway is the right choice for enterprise Java applications.
        </p>
      </div>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-2">Feature</th>
                  <th className="text-center py-4 px-2">
                    <Badge variant="default">Spring AI Gateway</Badge>
                  </th>
                  <th className="text-center py-4 px-2">Vercel AI</th>
                  <th className="text-center py-4 px-2">OpenRouter</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-2 font-medium">{item.feature}</td>
                    <td className="text-center py-4 px-2">
                      {item.springAI ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-2">
                      {item.vercel ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-2">
                      {item.openRouter ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

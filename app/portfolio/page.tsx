import { PortfolioSummary } from "@/components/portfolio-summary"
import { PortfolioHoldings } from "@/components/portfolio-holdings"
import { PortfolioHistory } from "@/components/portfolio-history"

export default function PortfolioPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Your Portfolio</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <PortfolioSummary />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Holdings</h2>
            <PortfolioHoldings />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Portfolio History</h2>
          <PortfolioHistory />
        </div>
      </div>
    </div>
  )
}


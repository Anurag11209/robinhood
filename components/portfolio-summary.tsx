"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserPortfolio } from "@/lib/portfolio"

export function PortfolioSummary() {
  const [portfolio, setPortfolio] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await getUserPortfolio()
        setPortfolio(data)
      } catch (error) {
        console.error("Failed to load portfolio:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">Loading portfolio data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="font-medium">${portfolio.currentValue.toFixed(2)}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Cash Balance</div>
            <div className="font-medium">${portfolio.cashBalance.toFixed(2)}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Day Change</div>
            <div className={`font-medium ${portfolio.dayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {portfolio.dayChange >= 0 ? "+" : ""}
              {portfolio.dayChange.toFixed(2)} ({portfolio.dayChangePercent.toFixed(2)}%)
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-sm text-muted-foreground">Total Return</div>
            <div className={`font-medium ${portfolio.totalReturn >= 0 ? "text-green-500" : "text-red-500"}`}>
              {portfolio.totalReturn >= 0 ? "+" : ""}
              {portfolio.totalReturn.toFixed(2)} ({portfolio.totalReturnPercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


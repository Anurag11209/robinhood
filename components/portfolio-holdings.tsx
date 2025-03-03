"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getUserHoldings } from "@/lib/portfolio"

export function PortfolioHoldings() {
  const [holdings, setHoldings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const data = await getUserHoldings()
        setHoldings(data)
      } catch (error) {
        console.error("Failed to load holdings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadHoldings()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4 text-muted-foreground">Loading holdings...</div>
        </CardContent>
      </Card>
    )
  }

  if (holdings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4 text-muted-foreground">
            You don&apos;t have any holdings yet. Start by buying some stocks!
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Symbol</th>
                <th className="text-right p-4">Shares</th>
                <th className="text-right p-4">Avg Price</th>
                <th className="text-right p-4">Current Price</th>
                <th className="text-right p-4">Market Value</th>
                <th className="text-right p-4">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <Link href={`/stock/${holding.symbol}`} className="font-medium hover:underline">
                      {holding.symbol}
                    </Link>
                  </td>
                  <td className="text-right p-4">{holding.shares}</td>
                  <td className="text-right p-4">${holding.avgPrice.toFixed(2)}</td>
                  <td className="text-right p-4">${holding.currentPrice.toFixed(2)}</td>
                  <td className="text-right p-4">${holding.marketValue.toFixed(2)}</td>
                  <td className={`text-right p-4 ${holding.gain >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {holding.gain >= 0 ? "+" : ""}
                    {holding.gain.toFixed(2)} ({holding.gainPercent.toFixed(2)}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}


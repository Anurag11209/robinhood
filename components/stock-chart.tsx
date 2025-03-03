"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { fetchStockHistory } from "@/lib/stock-api"

export function StockChart({ symbol }: { symbol: string }) {
  const [timeRange, setTimeRange] = useState("1D")
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isPositive, setIsPositive] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true)
      try {
        const data = await fetchStockHistory(symbol, timeRange)
        setChartData(data.prices)
        setIsPositive(data.isPositive)
      } catch (error) {
        console.error("Failed to fetch stock history:", error)
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [symbol, timeRange])

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="1D">1D</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
            <TabsTrigger value="5Y">5Y</TabsTrigger>
          </TabsList>

          <TabsContent value={timeRange} className="h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">Loading chart data...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    domain={["dataMin - 1", "dataMax + 1"]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={50}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Price"]}
                    labelFormatter={(label) => `Time: ${label}`}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


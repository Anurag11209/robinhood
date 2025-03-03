"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { getUserPortfolio } from "@/lib/portfolio"

export function PortfolioValue() {
  const [portfolio, setPortfolio] = useState<any>(null)
  const [timeRange, setTimeRange] = useState("1D")
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const loadPortfolio = async () => {
      const data = await getUserPortfolio()
      setPortfolio(data)

      // Generate chart data based on time range
      generateChartData(data, timeRange)
    }

    loadPortfolio()
  }, [timeRange])

  const generateChartData = (portfolio: any, range: string) => {
    if (!portfolio) return

    let data = []
    const currentValue = portfolio.currentValue

    switch (range) {
      case "1D":
        data = generateDailyData(currentValue)
        break
      case "1W":
        data = generateWeeklyData(currentValue)
        break
      case "1M":
        data = generateMonthlyData(currentValue)
        break
      case "3M":
        data = generateQuarterlyData(currentValue)
        break
      case "1Y":
        data = generateYearlyData(currentValue)
        break
      case "ALL":
        data = generateAllTimeData(currentValue)
        break
      default:
        data = generateDailyData(currentValue)
    }

    setChartData(data)
  }

  // Helper functions to generate mock chart data
  const generateDailyData = (currentValue: number) => {
    const data = []
    const hours = 9
    const volatility = 0.005 // 0.5% volatility
    let value = currentValue * (1 - (volatility * hours) / 2)

    for (let i = 0; i < hours; i++) {
      value = value * (1 + (Math.random() * volatility * 2 - volatility))
      data.push({
        time: `${9 + i}:00`,
        value: value.toFixed(2),
      })
    }

    // Ensure the last value matches the current value
    data.push({
      time: "16:00",
      value: currentValue.toFixed(2),
    })

    return data
  }

  const generateWeeklyData = (currentValue: number) => {
    const data = []
    const days = 7
    const volatility = 0.01 // 1% volatility
    let value = currentValue * (1 - (volatility * days) / 2)

    for (let i = 0; i < days; i++) {
      value = value * (1 + (Math.random() * volatility * 2 - volatility))
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))
      data.push({
        time: date.toLocaleDateString("en-US", { weekday: "short" }),
        value: value.toFixed(2),
      })
    }

    return data
  }

  const generateMonthlyData = (currentValue: number) => {
    const data = []
    const days = 30
    const volatility = 0.015 // 1.5% volatility
    let value = currentValue * (1 - (volatility * days) / 4)

    for (let i = 0; i < days; i += 2) {
      value = value * (1 + (Math.random() * volatility * 2 - volatility))
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))
      data.push({
        time: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: value.toFixed(2),
      })
    }

    return data
  }

  const generateQuarterlyData = (currentValue: number) => {
    const data = []
    const days = 90
    const volatility = 0.03 // 3% volatility
    let value = currentValue * (1 - (volatility * days) / 8)

    for (let i = 0; i < days; i += 6) {
      value = value * (1 + (Math.random() * volatility * 2 - volatility))
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))
      data.push({
        time: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: value.toFixed(2),
      })
    }

    return data
  }

  const generateYearlyData = (currentValue: number) => {
    const data = []
    const months = 12
    const volatility = 0.05 // 5% volatility
    let value = currentValue * (1 - (volatility * months) / 4)

    for (let i = 0; i < months; i++) {
      value = value * (1 + (Math.random() * volatility * 2 - volatility))
      const date = new Date()
      date.setMonth(date.getMonth() - (months - i - 1))
      data.push({
        time: date.toLocaleDateString("en-US", { month: "short" }),
        value: value.toFixed(2),
      })
    }

    return data
  }

  const generateAllTimeData = (currentValue: number) => {
    const data = []
    const years = 5
    const volatility = 0.1 // 10% volatility
    let value = currentValue * (1 - volatility * years)

    for (let i = 0; i < years; i++) {
      for (let j = 0; j < 4; j++) {
        value = value * (1 + (Math.random() * volatility * 2 - volatility))
        const date = new Date()
        date.setFullYear(date.getFullYear() - (years - i))
        date.setMonth(j * 3)
        data.push({
          time: date.toLocaleDateString("en-US", { year: "numeric", month: "short" }),
          value: value.toFixed(2),
        })
      }
    }

    return data
  }

  if (!portfolio) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Portfolio Value</h2>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold">$0.00</span>
              <span className="text-sm font-medium">+0.00 (0.00%)</span>
            </div>
          </div>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Loading portfolio data...
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPositive = portfolio?.change >= 0

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Portfolio Value</h2>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold">${portfolio?.currentValue?.toFixed(2) || "0.00"}</span>
            <span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}
              {portfolio?.change?.toFixed(2) || "0.00"} ({portfolio?.changePercent?.toFixed(2) || "0.00"}%)
            </span>
          </div>
        </div>

        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="1D">1D</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
            <TabsTrigger value="ALL">ALL</TabsTrigger>
          </TabsList>

          <TabsContent value={timeRange} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Value"]}
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


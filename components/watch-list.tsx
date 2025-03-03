"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { fetchStockQuote } from "@/lib/stock-api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function WatchList() {
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [stockData, setStockData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newSymbol, setNewSymbol] = useState("")

  useEffect(() => {
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem("watchlist")
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    } else {
      // Default watchlist
      const defaultWatchlist = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]
      setWatchlist(defaultWatchlist)
      localStorage.setItem("watchlist", JSON.stringify(defaultWatchlist))
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (watchlist.length === 0) {
        setStockData([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const promises = watchlist.map((symbol) => fetchStockQuote(symbol))
        const results = await Promise.all(promises)
        setStockData(results)
      } catch (error) {
        console.error("Failed to fetch watchlist data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (watchlist.length > 0) {
      fetchData()
    }
  }, [watchlist])

  const addToWatchlist = () => {
    if (!newSymbol || watchlist.includes(newSymbol.toUpperCase())) return

    const updatedWatchlist = [...watchlist, newSymbol.toUpperCase()]
    setWatchlist(updatedWatchlist)
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
    setNewSymbol("")
  }

  const removeFromWatchlist = (symbol: string) => {
    const updatedWatchlist = watchlist.filter((s) => s !== symbol)
    setWatchlist(updatedWatchlist)
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Watchlist</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add stock</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add to Watchlist</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Enter stock symbol (e.g. AAPL)"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && addToWatchlist()}
              />
              <Button onClick={addToWatchlist}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4 text-muted-foreground">Loading watchlist...</div>
        ) : stockData.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Your watchlist is empty. Add stocks to track them.
          </div>
        ) : (
          <div className="space-y-2">
            {stockData.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between py-2 group">
                <Link
                  href={`/stock/${stock.symbol}`}
                  className="flex-1 flex items-center justify-between hover:bg-muted/50 px-2 py-1 rounded-md"
                >
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.price.toFixed(2)}</div>
                    <div className={`text-sm ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </div>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromWatchlist(stock.symbol)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove {stock.symbol}</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


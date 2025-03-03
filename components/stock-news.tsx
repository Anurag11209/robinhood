"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchStockNews } from "@/lib/stock-api"
import { Skeleton } from "@/components/ui/skeleton"

export function StockNews({ symbol }: { symbol: string }) {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true)
      try {
        const data = await fetchStockNews(symbol)
        setNews(data)
      } catch (error) {
        console.error("Failed to fetch news:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [symbol])

  return (
    <div className="space-y-4">
      {loading ? (
        Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
      ) : news.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center text-muted-foreground">No recent news for {symbol}</CardContent>
        </Card>
      ) : (
        news.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80">
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.summary}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <span>{item.publishedAt}</span>
                </div>
              </a>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}


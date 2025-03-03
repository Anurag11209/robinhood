"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getTransactionHistory } from "@/lib/portfolio"

export function PortfolioHistory() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactionHistory()
        setTransactions(data)
      } catch (error) {
        console.error("Failed to load transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4 text-muted-foreground">Loading transaction history...</div>
        </CardContent>
      </Card>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4 text-muted-foreground">No transaction history yet.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{transaction.symbol}</div>
                  <div className="text-xs text-muted-foreground">{transaction.date}</div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.type === "buy" ? "text-red-500" : "text-green-500"}`}>
                    {transaction.type === "buy" ? "-" : "+"} ${transaction.total.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.shares} shares @ $
                    {transaction.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


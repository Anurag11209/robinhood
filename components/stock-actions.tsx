"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { executeOrder } from "@/lib/portfolio"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function StockActions({ symbol, price }: { symbol: string; price: number }) {
  const [shares, setShares] = useState<string>("1")
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setShares(value)
    }
  }

  const handleOrder = async () => {
    if (!shares || Number.parseInt(shares) <= 0) {
      toast({
        title: "Invalid shares",
        description: "Please enter a valid number of shares.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await executeOrder({
        symbol,
        shares: Number.parseInt(shares),
        price,
        type: orderType,
      })

      toast({
        title: "Order executed",
        description: `Successfully ${orderType === "buy" ? "bought" : "sold"} ${shares} shares of ${symbol} at $${price.toFixed(2)}`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Order failed",
        description: `Failed to ${orderType} shares. ${error instanceof Error ? error.message : "Please try again."}`,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalCost = Number.parseFloat(shares || "0") * price

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade {symbol}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value={orderType} className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="shares" className="text-sm font-medium">
                  Shares
                </label>
                <span className="text-sm text-muted-foreground">Market Price: ${price.toFixed(2)}</span>
              </div>
              <Input id="shares" type="text" value={shares} onChange={handleSharesChange} className="text-right" />
            </div>

            <div className="flex justify-between py-2 border-t">
              <span className="font-medium">Estimated Cost</span>
              <span className="font-medium">${totalCost.toFixed(2)}</span>
            </div>

            <Button
              className="w-full"
              onClick={handleOrder}
              disabled={isSubmitting}
              variant={orderType === "buy" ? "default" : "destructive"}
            >
              {isSubmitting ? "Processing..." : orderType === "buy" ? "Buy" : "Sell"} {shares || 0}{" "}
              {Number.parseInt(shares || "0") === 1 ? "Share" : "Shares"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


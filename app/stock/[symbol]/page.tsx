import { StockChart } from "@/components/stock-chart"
import { StockInfo } from "@/components/stock-info"
import { StockActions } from "@/components/stock-actions"
import { StockNews } from "@/components/stock-news"
import { getStockData } from "@/lib/stock-api"

export default async function StockPage({
  params,
}: {
  params: { symbol: string }
}) {
  const symbol = params.symbol.toUpperCase()
  const stockData = await getStockData(symbol)

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-2">
            {stockData.name} ({symbol})
          </h1>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold">${stockData.price.toFixed(2)}</span>
            <span className={`text-sm font-medium ${stockData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stockData.change >= 0 ? "+" : ""}
              {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
            </span>
          </div>
          <StockChart symbol={symbol} />
          <StockInfo stockData={stockData} />
        </div>
        <div>
          <StockActions symbol={symbol} price={stockData.price} />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent News</h2>
            <StockNews symbol={symbol} />
          </div>
        </div>
      </div>
    </div>
  )
}


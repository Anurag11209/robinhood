export function StockInfo({ stockData }: { stockData: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">Market Cap</div>
        <div className="font-medium">${stockData.marketCap}</div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">P/E Ratio</div>
        <div className="font-medium">{stockData.pe}</div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">52W High</div>
        <div className="font-medium">${stockData.high52w}</div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">52W Low</div>
        <div className="font-medium">${stockData.low52w}</div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">Volume</div>
        <div className="font-medium">{stockData.volume}</div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">Avg Volume</div>
        <div className="font-medium">{stockData.avgVolume}</div>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-sm text-muted-foreground">Dividend Yield</div>
        <div className="font-medium">{stockData.dividendYield}%</div>
      </div>
    </div>
  )
}


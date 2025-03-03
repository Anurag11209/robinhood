// This is a mock API service that simulates fetching stock data
// In a real application, you would replace these with actual API calls

// Mock data for popular stocks
const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.25 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 337.18, change: 0.87 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.65, change: -0.32 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.22, change: 2.15 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 177.83, change: -1.45 },
  { symbol: "META", name: "Meta Platforms, Inc.", price: 474.99, change: 3.21 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 824.18, change: 5.67 },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc.", price: 408.71, change: 0.15 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 197.45, change: -0.78 },
  { symbol: "V", name: "Visa Inc.", price: 275.96, change: 0.42 },
]

// Function to generate random stock data
function generateStockData(symbol: string) {
  const stockIndex = popularStocks.findIndex((stock) => stock.symbol === symbol)
  const baseStock =
    stockIndex >= 0
      ? popularStocks[stockIndex]
      : {
          symbol,
          name: `${symbol} Inc.`,
          price: 100 + Math.random() * 900,
          change: Math.random() * 6 - 3,
        }

  const price = baseStock.price
  const change = baseStock.change
  const changePercent = (change / price) * 100

  return {
    symbol,
    name: baseStock.name,
    price,
    change,
    changePercent,
    marketCap: formatLargeNumber(price * (1000000 + Math.random() * 9000000)),
    pe: (10 + Math.random() * 40).toFixed(2),
    high52w: (price * (1 + Math.random() * 0.3)).toFixed(2),
    low52w: (price * (1 - Math.random() * 0.3)).toFixed(2),
    volume: formatLargeNumber(Math.floor(1000000 + Math.random() * 9000000)),
    avgVolume: formatLargeNumber(Math.floor(1000000 + Math.random() * 9000000)),
    dividendYield: (Math.random() * 3).toFixed(2),
  }
}

// Helper function to format large numbers
function formatLargeNumber(num: number) {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  return num.toString()
}

// Fetch top stocks (trending, gainers, losers)
export async function fetchTopStocks() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock data
  return popularStocks
}

// Fetch stock quote for a specific symbol
export async function fetchStockQuote(symbol: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find the stock in our mock data or generate a new one
  return generateStockData(symbol)
}

// Fetch detailed stock data
export async function getStockData(symbol: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock data
  return generateStockData(symbol)
}

// Fetch stock price history
export async function fetchStockHistory(symbol: string, timeRange: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const stockData = generateStockData(symbol)
  const currentPrice = stockData.price
  const isPositive = Math.random() > 0.3 // 70% chance of positive trend

  const prices = []
  let dataPoints = 0
  let volatility = 0
  let startPrice = 0

  // Configure based on time range
  switch (timeRange) {
    case "1D":
      dataPoints = 7
      volatility = 0.005
      startPrice = currentPrice * (isPositive ? 0.99 : 1.01)
      break
    case "1W":
      dataPoints = 7
      volatility = 0.01
      startPrice = currentPrice * (isPositive ? 0.97 : 1.03)
      break
    case "1M":
      dataPoints = 30
      volatility = 0.02
      startPrice = currentPrice * (isPositive ? 0.95 : 1.05)
      break
    case "3M":
      dataPoints = 12
      volatility = 0.03
      startPrice = currentPrice * (isPositive ? 0.9 : 1.1)
      break
    case "1Y":
      dataPoints = 12
      volatility = 0.05
      startPrice = currentPrice * (isPositive ? 0.8 : 1.2)
      break
    case "5Y":
      dataPoints = 20
      volatility = 0.1
      startPrice = currentPrice * (isPositive ? 0.6 : 1.4)
      break
    default:
      dataPoints = 7
      volatility = 0.005
      startPrice = currentPrice * (isPositive ? 0.99 : 1.01)
  }

  // Generate price data
  let price = startPrice
  for (let i = 0; i < dataPoints; i++) {
    // Random walk with trend
    const change = Math.random() * volatility * 2 - volatility
    const trend = isPositive ? volatility / 2 : -volatility / 2
    price = price * (1 + change + trend)

    let timeLabel
    switch (timeRange) {
      case "1D":
        timeLabel = `${9 + Math.floor(i * (7 / dataPoints))}:00`
        break
      case "1W":
        timeLabel = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7]
        break
      case "1M":
        timeLabel = `${Math.floor(i * (30 / dataPoints) + 1)}/1`
        break
      case "3M":
        timeLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 12]
        break
      case "1Y":
        timeLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 12]
        break
      case "5Y":
        timeLabel = `${2020 + Math.floor(i / 4)}-Q${1 + (i % 4)}`
        break
      default:
        timeLabel = `${i}`
    }

    prices.push({
      time: timeLabel,
      value: price.toFixed(2),
    })
  }

  // Ensure the last price matches the current price
  prices[prices.length - 1].value = currentPrice.toFixed(2)

  return {
    prices,
    isPositive,
  }
}

// Fetch news for a specific stock
export async function fetchStockNews(symbol: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Generate mock news
  const news = [
    {
      title: `${symbol} Reports Strong Quarterly Earnings`,
      summary: `${symbol} exceeded analyst expectations with a 15% increase in revenue and 20% growth in user base.`,
      url: "#",
      source: "Market News",
      publishedAt: "2 hours ago",
    },
    {
      title: `Analysts Upgrade ${symbol} to "Buy"`,
      summary: `Several major investment firms have upgraded ${symbol} stock to a "Buy" rating, citing strong growth potential.`,
      url: "#",
      source: "Financial Times",
      publishedAt: "Yesterday",
    },
    {
      title: `${symbol} Announces New Product Line`,
      summary: `${symbol} unveiled its latest product line at a press event, showcasing innovative features that could drive future growth.`,
      url: "#",
      source: "Tech Today",
      publishedAt: "3 days ago",
    },
  ]

  return news
}

// Search for stocks
export async function searchStocks(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Filter mock data based on query
  const results = popularStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase()),
  )

  return results
}


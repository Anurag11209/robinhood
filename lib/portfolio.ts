// This is a mock portfolio service that simulates user portfolio data
// In a real application, you would replace these with actual API calls and database operations

// Mock portfolio data
const userPortfolio = {
  currentValue: 15782.43,
  cashBalance: 5000.0,
  investedValue: 10782.43,
  dayChange: 245.32,
  dayChangePercent: 1.58,
  totalReturn: 1782.43,
  totalReturnPercent: 12.75,
}

// Mock holdings data
let userHoldings = [
  {
    symbol: "AAPL",
    shares: 10,
    avgPrice: 165.32,
    currentPrice: 182.52,
    marketValue: 1825.2,
    gain: 172.0,
    gainPercent: 10.4,
  },
  {
    symbol: "MSFT",
    shares: 5,
    avgPrice: 310.45,
    currentPrice: 337.18,
    marketValue: 1685.9,
    gain: 133.65,
    gainPercent: 8.61,
  },
  {
    symbol: "GOOGL",
    shares: 8,
    avgPrice: 135.78,
    currentPrice: 142.65,
    marketValue: 1141.2,
    gain: 54.96,
    gainPercent: 5.06,
  },
  {
    symbol: "AMZN",
    shares: 12,
    avgPrice: 160.25,
    currentPrice: 178.22,
    marketValue: 2138.64,
    gain: 215.64,
    gainPercent: 11.21,
  },
  {
    symbol: "TSLA",
    shares: 15,
    avgPrice: 190.45,
    currentPrice: 177.83,
    marketValue: 2667.45,
    gain: -189.3,
    gainPercent: -6.63,
  },
  {
    symbol: "NVDA",
    shares: 2,
    avgPrice: 750.32,
    currentPrice: 824.18,
    marketValue: 1648.36,
    gain: 147.72,
    gainPercent: 9.84,
  },
]

// Mock transaction history
let transactionHistory = [
  {
    symbol: "AAPL",
    type: "buy",
    shares: 5,
    price: 170.25,
    total: 851.25,
    date: "Mar 1, 2023",
  },
  {
    symbol: "MSFT",
    type: "buy",
    shares: 3,
    price: 305.78,
    total: 917.34,
    date: "Mar 5, 2023",
  },
  {
    symbol: "GOOGL",
    type: "buy",
    shares: 8,
    price: 135.78,
    total: 1086.24,
    date: "Mar 10, 2023",
  },
  {
    symbol: "AAPL",
    type: "buy",
    shares: 5,
    price: 160.4,
    total: 802.0,
    date: "Mar 15, 2023",
  },
  {
    symbol: "MSFT",
    type: "buy",
    shares: 2,
    price: 317.45,
    total: 634.9,
    date: "Mar 20, 2023",
  },
  {
    symbol: "AMZN",
    type: "buy",
    shares: 12,
    price: 160.25,
    total: 1923.0,
    date: "Mar 25, 2023",
  },
  {
    symbol: "TSLA",
    type: "buy",
    shares: 15,
    price: 190.45,
    total: 2856.75,
    date: "Apr 1, 2023",
  },
  {
    symbol: "NVDA",
    type: "buy",
    shares: 2,
    price: 750.32,
    total: 1500.64,
    date: "Apr 5, 2023",
  },
]

// Get user portfolio data
export async function getUserPortfolio() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Add some randomness to the portfolio value
  const randomChange = Math.random() * 100 - 50
  const updatedPortfolio = {
    ...userPortfolio,
    currentValue: userPortfolio.currentValue + randomChange,
    dayChange: userPortfolio.dayChange + randomChange * 0.1,
  }

  // Update percentages
  updatedPortfolio.dayChangePercent = (updatedPortfolio.dayChange / updatedPortfolio.currentValue) * 100
  updatedPortfolio.totalReturn =
    updatedPortfolio.currentValue - (updatedPortfolio.investedValue + updatedPortfolio.cashBalance)
  updatedPortfolio.totalReturnPercent =
    (updatedPortfolio.totalReturn / (updatedPortfolio.investedValue + updatedPortfolio.cashBalance)) * 100

  return updatedPortfolio
}

// Get user holdings
export async function getUserHoldings() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Return mock data
  return userHoldings
}

// Get transaction history
export async function getTransactionHistory() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return transactionHistory
}

// Execute a buy/sell order
export async function executeOrder({
  symbol,
  shares,
  price,
  type,
}: {
  symbol: string
  shares: number
  price: number
  type: "buy" | "sell"
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const total = shares * price

  // Check if user has enough cash for buy order
  if (type === "buy" && total > userPortfolio.cashBalance) {
    throw new Error("Insufficient funds")
  }

  // Check if user has enough shares for sell order
  if (type === "sell") {
    const holding = userHoldings.find((h) => h.symbol === symbol)
    if (!holding || holding.shares < shares) {
      throw new Error("Insufficient shares")
    }
  }

  // Update portfolio
  if (type === "buy") {
    userPortfolio.cashBalance -= total
    userPortfolio.investedValue += total
  } else {
    userPortfolio.cashBalance += total
    userPortfolio.investedValue -= total
  }

  // Update holdings
  const holdingIndex = userHoldings.findIndex((h) => h.symbol === symbol)

  if (type === "buy") {
    if (holdingIndex >= 0) {
      // Update existing holding
      const holding = userHoldings[holdingIndex]
      const newShares = holding.shares + shares
      const newAvgPrice = (holding.shares * holding.avgPrice + shares * price) / newShares

      userHoldings[holdingIndex] = {
        ...holding,
        shares: newShares,
        avgPrice: newAvgPrice,
        marketValue: newShares * holding.currentPrice,
        gain: (holding.currentPrice - newAvgPrice) * newShares,
        gainPercent: ((holding.currentPrice - newAvgPrice) / newAvgPrice) * 100,
      }
    } else {
      // Add new holding
      userHoldings.push({
        symbol,
        shares,
        avgPrice: price,
        currentPrice: price,
        marketValue: shares * price,
        gain: 0,
        gainPercent: 0,
      })
    }
  } else {
    // Sell
    const holding = userHoldings[holdingIndex]
    const newShares = holding.shares - shares

    if (newShares > 0) {
      // Update existing holding
      userHoldings[holdingIndex] = {
        ...holding,
        shares: newShares,
        marketValue: newShares * holding.currentPrice,
        gain: (holding.currentPrice - holding.avgPrice) * newShares,
        gainPercent: ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100,
      }
    } else {
      // Remove holding
      userHoldings = userHoldings.filter((_, i) => i !== holdingIndex)
    }
  }

  // Add to transaction history
  const transaction = {
    symbol,
    type,
    shares,
    price,
    total,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  }

  transactionHistory = [transaction, ...transactionHistory]

  return { success: true }
}


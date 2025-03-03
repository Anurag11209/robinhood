import Link from "next/link"
import Image from "next/image"
import { StockList } from "@/components/stock-list"
import { WatchList } from "@/components/watch-list"
import { PortfolioValue } from "@/components/portfolio-value"
import { SearchStocks } from "@/components/search-stocks"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="sr-only">Robinhood</span>
            <Image src="/logo1.png" alt="Robinhood" width={150} height={32} />
            {/* <span className="hidden sm:inline">Robinhood</span> */}
          </Link>
          <SearchStocks />
          <nav className="flex items-center gap-4">
            <Link href="/portfolio" className="text-sm font-medium hover:text-primary">
              Portfolio
            </Link>
            <Link href="/account" className="text-sm font-medium hover:text-primary">
              Account
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid grid-cols-1 gap-6 py-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <PortfolioValue />
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
              <StockList />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
            <WatchList />
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Stockfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


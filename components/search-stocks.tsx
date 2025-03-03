"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { searchStocks } from "@/lib/stock-api"

export function SearchStocks() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (value: string) => {
    setQuery(value)

    if (value.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const data = await searchStocks(value)
      setResults(data)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (symbol: string) => {
    setOpen(false)
    router.push(`/stock/${symbol}`)
  }

  return (
    <>
      <div className="relative w-full max-w-sm hidden md:flex">
        <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={() => setOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          Search stocks...
        </Button>
      </div>
      <Button variant="outline" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stocks..." value={query} onValueChange={handleSearch} />
        <CommandList>
          <CommandEmpty>{loading ? "Searching..." : "No results found."}</CommandEmpty>
          <CommandGroup heading="Stocks">
            {results.map((stock) => (
              <CommandItem key={stock.symbol} onSelect={() => handleSelect(stock.symbol)}>
                <div className="flex justify-between w-full">
                  <div>
                    <span className="font-medium">{stock.symbol}</span>
                    <span className="ml-2 text-muted-foreground">{stock.name}</span>
                  </div>
                  <span>${stock.price.toFixed(2)}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}


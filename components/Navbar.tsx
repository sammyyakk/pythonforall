"use client"

import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileCode, Moon, Sun } from "lucide-react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link className="flex items-center justify-center" href="/">
          <FileCode className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">PythonForAll</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/modules">
            Modules
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/student-corner">
            Student Corner
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}
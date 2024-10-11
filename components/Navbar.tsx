"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileCode, Moon, Sun, Menu } from "lucide-react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:justify-start">
        <Link className="flex items-center justify-center" href="/">
          <FileCode className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">PythonForAll</span>
        </Link>

        {/* Mobile Menu Trigger */}
        <div className="ml-auto flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)} // Toggle isOpen state
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6">
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="fixed inset-0 z-30">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>
            <div
              className={`fixed top-16 left-0 w-3/4 h-screen bg-background p-4 md:hidden transition-transform duration-300 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <nav className="flex flex-col gap-4">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/modules"
                  onClick={() => setIsOpen(false)}
                >
                  Modules
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/student-corner"
                  onClick={() => setIsOpen(false)}
                >
                  Student Corner
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/about"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        )}

        <Button variant="ghost" size="icon" className="ml-4" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}
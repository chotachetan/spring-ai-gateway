"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/docs", label: "Docs" },
    { href: "/playground", label: "Playground" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/community", label: "Community" },
    { href: "/enterprise", label: "Enterprise" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <div className="h-6 w-6 rounded bg-primary" />
            <span className="hidden font-bold sm:inline-block">Spring AI Gateway</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Discord</span>
            </Button>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="ml-2">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="border-b border-border/40 md:hidden">
          <nav className="flex flex-col space-y-3 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </nav>
  )
}

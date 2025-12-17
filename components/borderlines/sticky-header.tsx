"use client"

import { Location01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { EVENTS } from "@/constants"
import { cn } from "@/lib/utils"
import { LiveStatusBadge } from "./live-status-badge"

export function StickyHeader() {
    // Calculate date range from events
    const dateRange = useMemo(() => {
        const dates = EVENTS.map((e) => new Date(e.date)).sort(
            (a, b) => a.getTime() - b.getTime(),
        )
        const firstDate = dates[0]
        const lastDate = dates[dates.length - 1]

        const formatDate = (date: Date) => {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })
        }

        return `${formatDate(firstDate)} - ${formatDate(lastDate)}`
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full border-b border-red-200/30 dark:border-red-900/30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-zinc-950/80">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Left Content */}
                <div className="flex-1">
                    {/* Badges Row */}
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                        <LiveStatusBadge />
                        <Badge
                            variant="outline"
                            className="border-amber-300 dark:border-amber-700/50 text-amber-700 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/30"
                        >
                            {dateRange}
                        </Badge>
                    </div>

                    {/* Title Section */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            Documenting the Border Crisis
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                            Real-time monitoring and documentation of the
                            Cambodia-Thailand border situation
                        </p>
                    </div>
                </div>

                {/* Desktop CTA - Vertically centered */}
                <Link
                    href="https://cambodia-donation-map.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "hidden md:flex items-center border-blue-300 dark:border-blue-700/50 text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                    )}
                >
                    <HugeiconsIcon
                        icon={Location01Icon}
                        className="size-4"
                    />
                    Phnom Penh Donation Map
                </Link>
            </div>
        </header>
    )
}

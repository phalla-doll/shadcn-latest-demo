"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EVENTS } from "@/constants"
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
        <header className="sticky top-0 z-50 w-full border-b border-red-900/30 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
            <div className="max-w-6xl mx-auto px-4 py-3">
                {/* Top Row: Badges and CTA */}
                <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <LiveStatusBadge />
                        <Badge
                            variant="outline"
                            className="border-amber-700/50 text-amber-200 bg-amber-950/30"
                        >
                            {dateRange}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="bg-zinc-800 text-zinc-300"
                        >
                            {EVENTS.length} events documented
                        </Badge>
                    </div>

                    {/* Desktop CTA */}
                    <Button
                        variant="outline"
                        className="hidden md:flex border-blue-700/50 text-blue-200 bg-blue-950/30 hover:bg-blue-900/40"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Phnom Penh Donation Map
                    </Button>
                </div>

                {/* Title Section */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Documenting the Border Crisis
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Real-time monitoring and documentation of the
                        Cambodia-Thailand border situation
                    </p>
                </div>
            </div>
        </header>
    )
}

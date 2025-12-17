"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EVENTS } from "@/constants"
import type { ConflictEvent, EventCategory } from "@/types"

const categoryConfig: Record<
    EventCategory,
    {
        color: string
        badge: "destructive" | "secondary" | "default" | "outline"
        icon: React.ReactNode
    }
> = {
    Military: {
        color: "bg-red-500",
        badge: "destructive",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
    },
    Civilian: {
        color: "bg-amber-500",
        badge: "secondary",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    Diplomatic: {
        color: "bg-blue-500",
        badge: "outline",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
            </svg>
        ),
    },
    Political: {
        color: "bg-purple-500",
        badge: "default",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
            </svg>
        ),
    },
    Legal: {
        color: "bg-emerald-500",
        badge: "default",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
            </svg>
        ),
    },
}

function DateSeparator({ date }: { date: string }) {
    return (
        <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                {date}
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-zinc-800 to-transparent" />
        </div>
    )
}

function EventCard({ event }: { event: ConflictEvent }) {
    const config = categoryConfig[event.category]

    // Extract time from displayDate if available
    const timeMatch = event.displayDate.match(/\d{1,2}:\d{2}/)
    const time = timeMatch ? timeMatch[0] : ""

    return (
        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        {/* Timeline dot */}
                        <div
                            className={`mt-1 w-3 h-3 rounded-full ${config.color} ring-4 ring-zinc-900 flex-shrink-0`}
                        />
                        <div>
                            <CardTitle className="text-white text-base group-hover:text-red-400 transition-colors">
                                {event.title}
                            </CardTitle>
                            <CardDescription className="text-zinc-500 text-sm">
                                {time && `${time} • `}
                                {event.location}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {event.sources.some((s) => s.url) && (
                            <Badge
                                variant="outline"
                                className="border-emerald-700/50 text-emerald-400 text-xs"
                            >
                                <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Verified
                            </Badge>
                        )}
                        <Badge
                            variant={config.badge}
                            className={
                                event.category === "Military"
                                    ? "bg-red-950 text-red-300 border-red-800/50"
                                    : event.category === "Civilian"
                                      ? "bg-amber-950 text-amber-300 border-amber-800/50"
                                      : event.category === "Diplomatic"
                                        ? "border-blue-700/50 text-blue-300"
                                        : event.category === "Political"
                                          ? "bg-purple-950 text-purple-300 border-purple-800/50"
                                          : "bg-emerald-950 text-emerald-300 border-emerald-800/50"
                            }
                        >
                            {config.icon}
                            <span className="ml-1">{event.category}</span>
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-10">
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                </p>
                {event.sources.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                        <span>Source:</span>
                        {event.sources.map((source, idx) => (
                            <span key={idx}>
                                {source.url ? (
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        {source.title}
                                    </a>
                                ) : (
                                    source.title
                                )}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

interface TimelineProps {
    locationFilter?: string
    limit?: number
}

export function Timeline({ locationFilter = "all", limit }: TimelineProps) {
    const [showAll, setShowAll] = useState(false)

    // Sort events by date (newest first) and filter
    const filteredEvents = useMemo(() => {
        let events = [...EVENTS].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )

        if (locationFilter && locationFilter !== "all") {
            events = events.filter((event) =>
                event.location
                    .toLowerCase()
                    .includes(locationFilter.toLowerCase()),
            )
        }

        return events
    }, [locationFilter])

    // Display events (limited or all)
    const displayEvents = useMemo(() => {
        if (showAll || !limit) return filteredEvents
        return filteredEvents.slice(0, limit)
    }, [filteredEvents, showAll, limit])

    // Group events by date
    const groupedEvents = useMemo(() => {
        return displayEvents.reduce(
            (acc, event) => {
                // Extract date portion from displayDate (e.g., "Dec 17, 2025")
                const dateMatch = event.displayDate.match(/[A-Za-z]+ \d+, \d+/)
                const dateKey = dateMatch ? dateMatch[0] : event.displayDate
                if (!acc[dateKey]) {
                    acc[dateKey] = []
                }
                acc[dateKey].push(event)
                return acc
            },
            {} as Record<string, ConflictEvent[]>,
        )
    }, [displayEvents])

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <h3 className="text-lg font-medium text-white">
                        Event Timeline
                    </h3>
                    <Badge
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300"
                    >
                        {filteredEvents.length} events
                    </Badge>
                </div>
            </div>

            {Object.entries(groupedEvents).map(([date, dateEvents]) => (
                <div key={date}>
                    <DateSeparator date={date} />
                    <div className="space-y-3">
                        {dateEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            ))}

            {limit && filteredEvents.length > limit && !showAll && (
                <div className="pt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                        Show all {filteredEvents.length} events →
                    </button>
                </div>
            )}
        </div>
    )
}

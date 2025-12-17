"use client"

import {
    Calendar01Icon,
    Flag01Icon,
    FlashIcon,
    JusticeScale01Icon,
    News01Icon,
    Tick02Icon,
    UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo, useState } from "react"
import { EventModal } from "@/components/borderlines/event-modal"
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
        icon: <HugeiconsIcon icon={FlashIcon} className="w-4 h-4" />,
    },
    Civilian: {
        color: "bg-amber-500",
        badge: "secondary",
        icon: <HugeiconsIcon icon={UserGroupIcon} className="w-4 h-4" />,
    },
    Diplomatic: {
        color: "bg-blue-500",
        badge: "outline",
        icon: <HugeiconsIcon icon={News01Icon} className="w-4 h-4" />,
    },
    Political: {
        color: "bg-purple-500",
        badge: "default",
        icon: <HugeiconsIcon icon={Flag01Icon} className="w-4 h-4" />,
    },
    Legal: {
        color: "bg-emerald-500",
        badge: "default",
        icon: <HugeiconsIcon icon={JusticeScale01Icon} className="w-4 h-4" />,
    },
}

function DateSeparator({ date }: { date: string }) {
    return (
        <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-linear-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
                {date}
            </span>
            <div className="flex-1 h-px bg-linear-to-l from-zinc-200 dark:from-zinc-800 to-transparent" />
        </div>
    )
}

function EventCard({
    event,
    onClick,
}: {
    event: ConflictEvent
    onClick: () => void
}) {
    const config = categoryConfig[event.category]

    // Extract time from displayDate if available
    const timeMatch = event.displayDate.match(/\d{1,2}:\d{2}/)
    const time = timeMatch ? timeMatch[0] : ""

    return (
        <Card
            className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group"
            onClick={onClick}
        >
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        {/* Timeline dot */}
                        <div
                            className={`mt-1 w-3 h-3 rounded-full ${config.color} ring-4 ring-white dark:ring-zinc-900 shrink-0`}
                        />
                        <div>
                            <CardTitle className="text-zinc-900 dark:text-white text-base group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                                {event.title}
                            </CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-500 text-sm">
                                {time && `${time} • `}
                                {event.location}
                            </CardDescription>
                        </div>
                    </div>
                    {time && (
                        <Badge
                            variant="outline"
                            className="border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-xs font-medium"
                        >
                            {time}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pl-10">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                </p>
                {event.sources.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                        <span>Source:</span>
                        {event.sources.map((source) => (
                            <span key={source.title}>
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
    const [selectedEvent, setSelectedEvent] = useState<ConflictEvent | null>(
        null,
    )

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
            <div className="relative mb-6 pb-4 pt-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-linear-to-br from-red-500/10 to-amber-500/10 dark:from-red-500/20 dark:to-amber-500/20 border border-red-200/50 dark:border-red-800/30">
                            <HugeiconsIcon
                                icon={Calendar01Icon}
                                className="w-5 h-5 text-red-500 dark:text-red-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-white tracking-tight">
                                Event Timeline
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Chronological record of documented incidents
                                from the Ministry of Defence
                            </p>
                        </div>
                    </div>
                    <Badge
                        variant="secondary"
                        className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    >
                        <HugeiconsIcon
                            icon={Tick02Icon}
                            className="size-3.5 mr-1"
                            strokeWidth={2.5}
                        />
                        {filteredEvents.length} verified events
                    </Badge>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-px bg-linear-to-r from-red-500 to-transparent" />
            </div>

            {Object.entries(groupedEvents).map(([date, dateEvents]) => (
                <div key={date}>
                    <DateSeparator date={date} />
                    <div className="space-y-3">
                        {dateEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => setSelectedEvent(event)}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {limit && filteredEvents.length > limit && !showAll && (
                <div className="pt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 text-sm font-medium transition-colors"
                    >
                        Show all {filteredEvents.length} events →
                    </button>
                </div>
            )}

            <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </div>
    )
}

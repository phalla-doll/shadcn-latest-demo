"use client"

import { MapsIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EVENTS } from "@/constants"

export function ConflictMap() {
    // Get unique locations with coordinates from events
    const locations = useMemo(() => {
        const locationMap = new Map<
            string,
            { lat: number; lng: number; count: number; name: string }
        >()

        for (const event of EVENTS) {
            if (event.coordinates) {
                const key = `${event.coordinates.lat.toFixed(2)},${event.coordinates.lng.toFixed(2)}`
                const existing = locationMap.get(key)
                if (existing) {
                    existing.count++
                } else {
                    locationMap.set(key, {
                        lat: event.coordinates.lat,
                        lng: event.coordinates.lng,
                        count: 1,
                        name: event.location.split(",")[0].trim(),
                    })
                }
            }
        }

        return Array.from(locationMap.values())
    }, [])

    // Calculate marker positions relative to map bounds
    // Border region roughly: lat 11.5-14.5, lng 102.3-105.5
    const getPosition = (lat: number, lng: number) => {
        const minLat = 11.5,
            maxLat = 14.5
        const minLng = 102.3,
            maxLng = 105.5

        const top = ((maxLat - lat) / (maxLat - minLat)) * 100
        const left = ((lng - minLng) / (maxLng - minLng)) * 100

        return {
            top: `${Math.max(5, Math.min(90, top))}%`,
            left: `${Math.max(5, Math.min(90, left))}%`,
        }
    }

    const activeZones = locations.filter((l) => l.count >= 5).length

    return (
        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                            <HugeiconsIcon
                                icon={MapsIcon}
                                className="w-5 h-5 text-red-400"
                            />
                            Conflict Map – Key Areas
                        </CardTitle>
                        <CardDescription className="text-zinc-500 dark:text-zinc-400">
                            Interactive map showing conflict zones along the
                            border ({EVENTS.length} events documented)
                        </CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className="border-red-300 dark:border-red-700/50 text-red-600 dark:text-red-300"
                    >
                        {activeZones} Active Zones
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                {/* Map Placeholder - In production, integrate Leaflet here */}
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    {/* Map Background with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-zinc-100 to-amber-100/50 dark:from-emerald-900/20 dark:via-zinc-800 dark:to-amber-900/20" />

                    {/* Grid lines for map effect */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Conflict markers */}
                    <div className="absolute inset-0 p-4">
                        <div className="relative w-full h-full">
                            {locations.slice(0, 15).map((location) => {
                                const pos = getPosition(
                                    location.lat,
                                    location.lng,
                                )
                                const isActive = location.count >= 5

                                return (
                                    <button
                                        key={`${location.lat}-${location.lng}`}
                                        type="button"
                                        className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ top: pos.top, left: pos.left }}
                                    >
                                        <span
                                            className={`relative flex ${isActive ? "h-4 w-4" : "h-3 w-3"}`}
                                        >
                                            {isActive && (
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                            )}
                                            <span
                                                className={`relative inline-flex rounded-full ${isActive ? "h-4 w-4 bg-red-500 border-2 border-red-300" : "h-3 w-3 bg-amber-500 border border-amber-300"}`}
                                            />
                                        </span>
                                        <span className="absolute left-6 top-0 hidden group-hover:block bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 border border-zinc-200 dark:border-zinc-700 shadow-md">
                                            {location.name} ({location.count}{" "}
                                            events)
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Country Labels */}
                    <div className="absolute top-4 left-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        THAILAND
                    </div>
                    <div className="absolute bottom-4 right-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        CAMBODIA
                    </div>

                    {/* Border Line Indicator */}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" aria-hidden="true">
                            <path
                                d="M 0,200 Q 150,180 200,220 T 400,200 T 600,180"
                                fill="none"
                                stroke="rgba(239,68,68,0.4)"
                                strokeWidth="2"
                                strokeDasharray="8,4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                            Active Conflict Zone (5+ events)
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                            Recent Incident
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

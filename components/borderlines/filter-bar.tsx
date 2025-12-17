"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EVENTS } from "@/constants"

interface FilterBarProps {
    locationFilter: string
    onLocationChange: (value: string) => void
    onSubmitEvent?: () => void
}

export function FilterBar({
    locationFilter,
    onLocationChange,
    onSubmitEvent,
}: FilterBarProps) {
    // Get unique locations from events
    const locations = useMemo(() => {
        const locationSet = new Set<string>()
        for (const event of EVENTS) {
            // Extract the main location (before comma)
            const mainLocation = event.location.split(",")[0].trim()
            if (
                mainLocation &&
                mainLocation !== "Multiple Locations" &&
                mainLocation !== "Border Line"
            ) {
                locationSet.add(mainLocation)
            }
        }
        return Array.from(locationSet).sort()
    }, [])

    // Count events based on filter
    const filteredCount = useMemo(() => {
        if (locationFilter === "all") return EVENTS.length
        return EVENTS.filter((e) =>
            e.location.toLowerCase().includes(locationFilter.toLowerCase()),
        ).length
    }, [locationFilter])

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-3 flex-wrap">
                {/* Location Filter */}
                <Select value={locationFilter} onValueChange={onLocationChange}>
                    <SelectTrigger className="w-52 bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 max-h-64">
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((location) => (
                            <SelectItem
                                key={location}
                                value={location.toLowerCase()}
                            >
                                {location}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Result Count */}
                <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300 border-zinc-700"
                >
                    {filteredCount} events
                </Badge>
            </div>

            {/* Submit Event Button */}
            <Button
                onClick={onSubmitEvent}
                className="bg-red-600 hover:bg-red-700 text-white"
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                Submit Event
            </Button>
        </div>
    )
}

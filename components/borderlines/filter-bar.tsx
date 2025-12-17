"use client"

import { Cancel01Icon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo } from "react"
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

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 flex-wrap">
                {/* Location Filter */}
                <div className="flex items-center gap-1.5">
                    <Select
                        value={locationFilter}
                        onValueChange={(value) =>
                            onLocationChange(value ?? "all")
                        }
                    >
                        <SelectTrigger className="w-52 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
                            <SelectValue>
                                {locationFilter === "all"
                                    ? "All Locations"
                                    : locationFilter}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent
                            className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 max-h-64 text-zinc-900 dark:text-zinc-100"
                            alignItemWithTrigger={false}
                        >
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
                    {locationFilter !== "all" && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onLocationChange("all")}
                            className="size-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                            <HugeiconsIcon
                                icon={Cancel01Icon}
                                className="size-4"
                                strokeWidth={2}
                            />
                            <span className="sr-only">Clear filter</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Submit Event Button */}
            <Button
                disabled
                onClick={onSubmitEvent}
                className="bg-red-600 hover:bg-red-700 text-white"
            >
                <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 mr-2" />
                Submit Event
            </Button>
        </div>
    )
}

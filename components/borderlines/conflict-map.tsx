"use client"

import { Location01Icon, MapsIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EVENTS } from "@/constants"
import type { ConflictEvent } from "@/types"
import type { Map as LeafletMap, Marker } from "leaflet"

function EventModal({
    event,
    onClose,
}: {
    event: ConflictEvent
    onClose: () => void
}) {
    return (
        <AlertDialog open={!!event} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent className="max-w-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                        {event.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <HugeiconsIcon
                                icon={Location01Icon}
                                className="w-4 h-4"
                            />
                            {event.location}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            {event.displayDate}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="mt-4 space-y-4">
                    <div>
                        <Badge
                            variant="outline"
                            className="mb-2 border-zinc-300 dark:border-zinc-700"
                        >
                            {event.category}
                        </Badge>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                    {event.sources.length > 0 && (
                        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                                Sources:
                            </p>
                            <ul className="space-y-1">
                                {event.sources.map((source) => (
                                    <li key={source.title} className="text-xs">
                                        {source.url ? (
                                            <a
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {source.title}
                                            </a>
                                        ) : (
                                            <span className="text-zinc-600 dark:text-zinc-400">
                                                {source.title}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function ConflictMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<LeafletMap | null>(null)
    const markersRef = useRef<Marker[]>([])
    const [selectedEvent, setSelectedEvent] = useState<ConflictEvent | null>(
        null,
    )
    const [isMapLoaded, setIsMapLoaded] = useState(false)

    // Get unique conflict locations from EVENTS with their coordinates and first event
    const conflictLocations = useMemo(() => {
        const locationsByKey = new Map<
            string,
            { label: string; lat: number; lng: number; event: ConflictEvent }
        >()

        EVENTS.forEach((event) => {
            if (event.coordinates && event.location) {
                // Use the location name as key, but create a clean label
                const key = event.location
                if (!locationsByKey.has(key)) {
                    locationsByKey.set(key, {
                        label: event.location,
                        lat: event.coordinates.lat,
                        lng: event.coordinates.lng,
                        event: event,
                    })
                }
            }
        })

        return Array.from(locationsByKey.values())
    }, [])

    // Load Leaflet dynamically
    useEffect(() => {
        let isMounted = true

        const loadLeaflet = async () => {
            try {
                const L = await import("leaflet")
                
                if (!isMounted) return

                // Set up Leaflet icon defaults to prevent 404 errors
                delete (L.Icon.Default.prototype as any)._getIconUrl
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
                    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
                    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                })

                setIsMapLoaded(true)
            } catch (error) {
                console.error("Failed to load Leaflet", error)
            }
        }

        loadLeaflet()

        return () => {
            isMounted = false
        }
    }, [])

    // Initialize Leaflet Map
    useEffect(() => {
        if (!mapContainerRef.current || !isMapLoaded) return

        const initializeMap = async () => {
            try {
                const L = await import("leaflet")
                
                if (!mapContainerRef.current) return

                // Center map on Cambodia border region
                const centerLat = 13.3
                const centerLng = 103.9
                const zoom = 7.4

                // Cleanup previous instance
                if (mapInstanceRef.current) {
                    // Remove all markers
                    markersRef.current.forEach((marker) => {
                        mapInstanceRef.current?.removeLayer(marker)
                    })
                    markersRef.current = []
                    mapInstanceRef.current.remove()
                    mapInstanceRef.current = null
                }

                const map = L.map(mapContainerRef.current).setView(
                    [centerLat, centerLng],
                    zoom,
                )
                mapInstanceRef.current = map

                // Add tile layer (light theme to match journal style)
                L.tileLayer(
                    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                        subdomains: "abcd",
                        maxZoom: 19,
                    },
                ).addTo(map)

                // Create red dot icon for conflict markers
                const redDotIcon = L.divIcon({
                    className: "custom-conflict-marker",
                    html: `<div style="background-color: #dc2626; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fee2e2; box-shadow: 0 2px 4px rgba(0,0,0,0.2); cursor: pointer;"></div>`,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6],
                })

                // Add markers for each conflict location
                conflictLocations.forEach((loc) => {
                    const marker = L.marker([loc.lat, loc.lng], {
                        icon: redDotIcon,
                    }).addTo(map)

                    // Add click handler to open EventModal inside the map
                    marker.on("click", () => {
                        setSelectedEvent(loc.event)
                    })

                    markersRef.current.push(marker)
                })

                // Force a resize to prevent gray box issues
                setTimeout(() => {
                    map.invalidateSize()
                }, 100)
            } catch (e) {
                console.error("Map initialization failed", e)
            }
        }

        initializeMap()

        return () => {
            if (mapInstanceRef.current) {
                markersRef.current.forEach((marker) => {
                    mapInstanceRef.current?.removeLayer(marker)
                })
                markersRef.current = []
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [conflictLocations, isMapLoaded])

    const activeZones = conflictLocations.length

    return (
        <>
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
                    <div className="relative w-full aspect-16/10 md:aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                        <div
                            ref={mapContainerRef}
                            className="w-full h-full"
                            role="img"
                            aria-label="Map of Cambodia showing conflict areas"
                        />
                    </div>
                    <p className="mt-3 px-3 py-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded">
                        <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                            <span>Border sites</span>
                        </span>{" "}
                        — Marker precision is limited by the available location
                        data.
                    </p>
                </CardContent>
            </Card>

            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </>
    )
}

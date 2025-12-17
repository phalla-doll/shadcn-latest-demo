"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface LiveStatusBadgeProps {
    status?: "active" | "monitoring" | "resolved"
    className?: string
}

export function LiveStatusBadge({
    status: _status = "active",
    className,
}: LiveStatusBadgeProps) {
    return (
        <Badge
            variant="destructive"
            className={cn(
                "gap-2 bg-red-950 text-red-200 border-red-800/50",
                className,
            )}
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            Cambodia-Thailand: Active Conflict Monitor
        </Badge>
    )
}

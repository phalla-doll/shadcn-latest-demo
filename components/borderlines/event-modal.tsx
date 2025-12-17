"use client"

import { Cancel01Icon, Location01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import type { ConflictEvent } from "@/types"

export function EventModal({
    event,
    onClose,
}: {
    event: ConflictEvent | null
    onClose: () => void
}) {
    if (!event) return null

    return (
        <AlertDialog open={!!event} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent className="max-w-2xl" onBackdropClick={onClose}>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Close dialog"
                >
                    <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
                </button>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl pr-8">
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


"use client"

import { Calendar01Icon, Location01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ScrollDateBadgeProps {
    currentDate?: string
}

export function ScrollDateBadge({
    currentDate = "December 17, 2024",
}: ScrollDateBadgeProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show badge when scrolled past 500px
            setIsVisible(window.scrollY > 500)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-top-4 fade-in duration-300">
            <Badge
                variant="secondary"
                className="bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-lg backdrop-blur px-4 py-2"
            >
                <HugeiconsIcon
                    icon={Calendar01Icon}
                    className="w-4 h-4 mr-2 text-red-400"
                />
                {currentDate}
            </Badge>
        </div>
    )
}

interface FloatingMobileButtonProps {
    onClick?: () => void
}

export function FloatingMobileButton({ onClick }: FloatingMobileButtonProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
            <Button
                onClick={onClick}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30 rounded-full h-14 px-5"
            >
                <HugeiconsIcon icon={Location01Icon} className="w-5 h-5 mr-2" />
                Donation Map
            </Button>
        </div>
    )
}

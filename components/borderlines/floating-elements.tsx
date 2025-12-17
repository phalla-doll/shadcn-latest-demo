"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ScrollDateBadgeProps {
    currentDate?: string
}

export function ScrollDateBadge({ currentDate = "December 17, 2024" }: ScrollDateBadgeProps) {
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
                className="bg-zinc-900/95 text-white border border-zinc-700 shadow-lg backdrop-blur px-4 py-2"
            >
                <svg
                    className="w-4 h-4 mr-2 text-red-400"
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
                <svg
                    className="w-5 h-5 mr-2"
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
                Donation Map
            </Button>
        </div>
    )
}


"use client"

import {
    FavouriteIcon,
    QuoteUpIcon,
    SecurityCheckIcon,
    ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Separator } from "@/components/ui/separator"

export function QuoteSection() {
    return (
        <section className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            {/* Flag Background - Semi-transparent Cambodia flag inspired */}
            <div className="absolute inset-0 opacity-[0.07]">
                {/* Blue stripe top */}
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-blue-600" />
                {/* Red stripe middle */}
                <div className="absolute top-1/4 left-0 right-0 h-1/2 bg-red-600" />
                {/* Blue stripe bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-blue-600" />
                {/* Angkor Wat silhouette overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-64 h-48 text-white opacity-30"
                        viewBox="0 0 200 150"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        {/* Simplified Angkor Wat silhouette */}
                        <path d="M100,20 L110,40 L115,40 L115,60 L125,60 L130,35 L140,35 L140,60 L145,60 L145,80 L155,80 L160,50 L170,50 L170,80 L180,80 L180,100 L20,100 L20,80 L30,80 L30,50 L40,50 L45,80 L55,80 L55,60 L60,60 L60,35 L70,35 L75,60 L85,60 L85,40 L90,40 Z" />
                        {/* Base */}
                        <rect x="10" y="100" width="180" height="20" />
                        <rect x="0" y="120" width="200" height="15" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 py-12 md:py-16 text-center">
                <HugeiconsIcon
                    icon={QuoteUpIcon}
                    className="w-10 h-10 mx-auto mb-6 text-zinc-300 dark:text-zinc-600"
                />

                <blockquote className="max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-zinc-900 dark:text-white leading-relaxed">
                        United for Cambodia. Standing together in times of
                        crisis,
                        <span className="text-red-500 dark:text-red-400">
                            {" "}
                            documenting truth
                        </span>
                        ,
                        <span className="text-amber-500 dark:text-amber-400">
                            {" "}
                            supporting our people
                        </span>
                        , and
                        <span className="text-blue-500 dark:text-blue-400">
                            {" "}
                            preserving our heritage
                        </span>
                        .
                    </p>
                </blockquote>

                <Separator className="bg-gradient-to-r from-transparent via-red-500/50 to-transparent h-0.5 max-w-md mx-auto mt-8" />

                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-2">
                        <HugeiconsIcon
                            icon={FavouriteIcon}
                            className="w-4 h-4 text-red-400"
                        />
                        Solidarity
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                    <span className="flex items-center gap-2">
                        <HugeiconsIcon
                            icon={ViewIcon}
                            className="w-4 h-4 text-amber-400"
                        />
                        Transparency
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                    <span className="flex items-center gap-2">
                        <HugeiconsIcon
                            icon={SecurityCheckIcon}
                            className="w-4 h-4 text-blue-400"
                        />
                        Truth
                    </span>
                </div>
            </div>
        </section>
    )
}

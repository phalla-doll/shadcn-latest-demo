"use client"

import {
    QuoteUpIcon
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Separator } from "@/components/ui/separator"

export function QuoteSection() {
    return (
        <section className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            {/* Flag Background Image */}
            <div
                className="absolute inset-0 opacity-[0.12] bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/flag_map.png')" }}
                aria-hidden="true"
            />

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

                <Separator className="bg-linear-to-r from-transparent via-red-500/50 to-transparent h-0.5 max-w-md mx-auto mt-8" />
            </div>
        </section>
    )
}

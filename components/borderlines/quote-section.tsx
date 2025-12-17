"use client"

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
                <svg
                    className="w-10 h-10 mx-auto mb-6 text-zinc-300 dark:text-zinc-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

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
                        <svg
                            className="w-4 h-4 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        Solidarity
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                    <span className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-amber-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        Transparency
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                    <span className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        Truth
                    </span>
                </div>
            </div>
        </section>
    )
}

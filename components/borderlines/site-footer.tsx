"use client"

import {
    LegalDocument01Icon,
    Moon02Icon,
    Sun03Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Project Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                                <HugeiconsIcon
                                    icon={LegalDocument01Icon}
                                    className="w-5 h-5 text-white"
                                />
                            </div>
                            <h4 className="text-zinc-900 dark:text-white font-semibold">
                                Borderlines Archive
                            </h4>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed max-w-md">
                            An independent documentation project tracking events
                            along the Cambodia-Thailand border. This project is
                            not affiliated with any government or political
                            organization. Information is gathered from verified
                            sources and eyewitness accounts.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                aria-label="Toggle theme"
                            >
                                <HugeiconsIcon
                                    icon={
                                        theme === "dark"
                                            ? Sun03Icon
                                            : Moon02Icon
                                    }
                                    className="w-5 h-5"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Links and Copyright */}
                    <div className="md:text-right">
                        <div className="space-y-2">
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                © 2024 Borderlines Archive. All rights reserved.
                            </p>
                            <p className="text-zinc-400 dark:text-zinc-500 text-xs">
                                Data sources: Government press releases,
                                International observers, Local journalists,
                                Community reports
                            </p>
                        </div>

                        <Separator className="bg-zinc-200 dark:bg-zinc-800 my-4 md:hidden" />

                        <div className="flex flex-wrap gap-4 mt-4 md:justify-end text-sm">
                            <Link
                                href="https://boycott-thailand.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 hover:text-red-400 transition-colors font-medium"
                            >
                                #BoycottThailand
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

"use client"

import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Project Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h4 className="text-white font-semibold">
                                Borderlines Archive
                            </h4>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                            An independent documentation project tracking events
                            along the Cambodia-Thailand border. This project is
                            not affiliated with any government or political
                            organization. Information is gathered from verified
                            sources and eyewitness accounts.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                                aria-label="Telegram"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Links and Copyright */}
                    <div className="md:text-right">
                        <div className="space-y-2">
                            <p className="text-zinc-400 text-sm">
                                © 2024 Borderlines Archive. All rights reserved.
                            </p>
                            <p className="text-zinc-500 text-xs">
                                Data sources: Government press releases,
                                International observers, Local journalists,
                                Community reports
                            </p>
                        </div>

                        <Separator className="bg-zinc-800 my-4 md:hidden" />

                        <div className="flex flex-wrap gap-4 mt-4 md:justify-end text-sm">
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                About
                            </button>
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                Methodology
                            </button>
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                Contact
                            </button>
                            <button
                                type="button"
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                Privacy
                            </button>
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-400 transition-colors font-medium"
                            >
                                #BoycottThailand
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

"use client"

import { useState } from "react"
import {
    ConflictMap,
    DisplacementSummary,
    FilterBar,
    FloatingMobileButton,
    QuoteSection,
    ScrollDateBadge,
    SiteFooter,
    StickyHeader,
    Timeline,
} from "@/components/borderlines"

export default function Page() {
    const [locationFilter, setLocationFilter] = useState("all")

    return (
        <div className="flex flex-col min-h-screen bg-zinc-950">
            {/* 1. Sticky Header */}
            <StickyHeader />

            {/* 2. Main Content Area */}
            <main className="flex-1">
                <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                    {/* a) Conflict Map */}
                    <section>
                        <ConflictMap />
                    </section>

                    {/* b) Displacement Summary */}
                    <section>
                        <DisplacementSummary />
                    </section>

                    {/* c) Quote Section */}
                    <section>
                        <QuoteSection />
                    </section>

                    {/* d) Filter Bar */}
                    <section>
                        <FilterBar
                            locationFilter={locationFilter}
                            onLocationChange={setLocationFilter}
                        />
                    </section>

                    {/* e) Timeline Container */}
                    <section>
                        <Timeline locationFilter={locationFilter} limit={20} />
                    </section>
                </div>
            </main>

            {/* 3. Site Footer */}
            <SiteFooter />

            {/* 4. Floating Elements */}
            <ScrollDateBadge />
            <FloatingMobileButton />
        </div>
    )
}

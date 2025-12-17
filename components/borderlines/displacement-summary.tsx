"use client"

import {
    AlertDiamondIcon,
    HeartbreakIcon,
    School01Icon,
    StudentIcon,
    TeacherIcon,
    UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { EVENTS } from "@/constants"

interface StatCardProps {
    label: string
    value: string | number
    icon: React.ReactNode
    variant?: "default" | "warning" | "danger"
}

function StatCard({ label, value, icon, variant = "default" }: StatCardProps) {
    const variantStyles = {
        default:
            "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
        warning:
            "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50",
        danger: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50",
    }

    const iconStyles = {
        default: "text-blue-400",
        warning: "text-amber-400",
        danger: "text-red-400",
    }

    return (
        <div className={`rounded-lg border p-4 ${variantStyles[variant]}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider mb-1">
                        {label}
                    </p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
                        {typeof value === "number"
                            ? value.toLocaleString()
                            : value}
                    </p>
                </div>
                <div className={iconStyles[variant]}>{icon}</div>
            </div>
        </div>
    )
}

interface ProvinceData {
    province: string
    families: number | null
    people: number
    deaths: number
    pending?: boolean
}

const provinces = [
    {
        province: "Banteay Meanchey",
        families: 53055,
        people: 178302,
        deaths: 6,
    },
    { province: "Battambang", families: 12322, people: 44246, deaths: 0 },
    { province: "Koh Kong", families: 1962, people: 7020, deaths: 0 },
    { province: "Oddar Meanchey", families: 12249, people: 41486, deaths: 4 },
    { province: "Preah Vihear", families: 10802, people: 34694, deaths: 1 },
    { province: "Pursat", families: 900, people: 3221, deaths: 0 },
    { province: "Siem Reap", families: 38646, people: 123364, deaths: 0 },
    { province: "Kampot", families: 1736, people: 6620, deaths: 0 },
]

const totalDisplaced = 447509
const totalInjuries = 77
const totalDeaths = 17

const reportedTotals = provinces.reduce(
    (acc, prov) => ({
        families: acc.families + prov.families,
        people: acc.people + prov.people,
        deaths: acc.deaths + prov.deaths,
    }),
    { families: 0, people: 0, deaths: 0 },
)

const sortedProvinces = [...provinces].sort((a, b) => b.people - a.people)

const provinceData: ProvinceData[] = [
    ...sortedProvinces,
    {
        province: "To be updated",
        families: null,
        people: Math.max(totalDisplaced - reportedTotals.people, 0),
        deaths: Math.max(totalDeaths - reportedTotals.deaths, 0),
        pending: true,
    },
]

export function DisplacementSummary() {
    // Calculate stats from real events
    const stats = useMemo(() => {
        const militaryEvents = EVENTS.filter(
            (e) => e.category === "Military",
        ).length
        const civilianEvents = EVENTS.filter(
            (e) => e.category === "Civilian",
        ).length

        // Get unique locations
        const locations = new Set(
            EVENTS.map((e) => e.location.split(",")[0].trim()),
        )

        // Get date range
        const dates = EVENTS.map((e) => new Date(e.date)).sort(
            (a, b) => a.getTime() - b.getTime(),
        )
        const firstDate = dates[0]
        const lastDate = dates[dates.length - 1]
        const daySpan =
            Math.ceil(
                (lastDate.getTime() - firstDate.getTime()) /
                    (1000 * 60 * 60 * 24),
            ) + 1

        return {
            totalEvents: EVENTS.length,
            militaryEvents,
            civilianEvents,
            locations: locations.size,
            daySpan,
        }
    }, [])

    const totalFamilies = provinceData.reduce(
        (acc, p) => acc + (p.families || 0),
        0,
    )

    return (
        <Card className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-zinc-900 dark:text-white flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-amber-500 dark:text-amber-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            Civilian Impact Situation
                        </CardTitle>
                        <CardDescription className="text-zinc-500 dark:text-zinc-400">
                            As of December 17, 2025, 12:30
                        </CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                    >
                        {stats.totalEvents} documented events over{" "}
                        {stats.daySpan} days
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
                {/* Displacement Impact Grid */}
                <div>
                    <h4 className="text-zinc-300 text-sm font-medium mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-500 rounded-full" />
                        Displacement Impact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            label="Displaced Persons"
                            value={totalDisplaced}
                            variant="danger"
                            icon={
                                <HugeiconsIcon
                                    icon={UserGroupIcon}
                                    className="w-6 h-6"
                                    strokeWidth={2}
                                />
                            }
                        />
                        <StatCard
                            label="Injuries Reported"
                            value={totalInjuries}
                            variant="warning"
                            icon={
                                <HugeiconsIcon
                                    icon={AlertDiamondIcon}
                                    className="w-6 h-6"
                                    strokeWidth={2}
                                />
                            }
                        />
                        <StatCard
                            label="Confirmed Deaths"
                            value={totalDeaths}
                            variant="danger"
                            icon={
                                <HugeiconsIcon
                                    icon={HeartbreakIcon}
                                    className="w-6 h-6"
                                    strokeWidth={2}
                                />
                            }
                        />
                    </div>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Event Statistics Grid */}
                <div>
                    <h4 className="text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-1 h-4 bg-blue-500 rounded-full" />
                        Education Impact
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                        Schools along the border across 6 provinces have been
                        temporarily closed due to the conflict.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            label="Schools Closed"
                            value={1091}
                            variant="danger"
                            icon={
                                <HugeiconsIcon
                                    icon={School01Icon}
                                    className="w-6 h-6"
                                    strokeWidth={2}
                                />
                            }
                        />
                        <StatCard
                            label="Teachers Affected"
                            value={11922}
                            variant="warning"
                            icon={
                                <HugeiconsIcon
                                    icon={TeacherIcon}
                                    className="w-6 h-6"
                                    strokeWidth={2}
                                />
                            }
                        />
                        <StatCard
                            label="Students Affected"
                            value={254480}
                            icon={
                                <HugeiconsIcon
                                    icon={StudentIcon}
                                    className="w-6 h-6"
                                    strokeWidth={2}
                                />
                            }
                        />
                    </div>
                    <p className="text-zinc-400 dark:text-zinc-500 text-xs mb-4 text-right mt-2">
                        Sources:{" "}
                        <Link
                            href="https://www.facebook.com/share/p/1D3uyDeXKp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 dark:text-zinc-400 hover:underline"
                        >
                            Ministry of Education
                        </Link>
                    </p>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                {/* Province Breakdown Table */}
                <div>
                    <h4 className="text-zinc-300 text-sm font-medium mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                        Province Breakdown
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                                    <th className="text-left py-3 px-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                        Province
                                    </th>
                                    <th className="text-right py-3 px-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                        Families
                                    </th>
                                    <th className="text-right py-3 px-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                        People
                                    </th>
                                    <th className="text-right py-3 px-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                        Deaths
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {provinceData.map((province, index) => (
                                    <tr
                                        key={province.province}
                                        className={`border-t border-zinc-200 dark:border-zinc-800 ${
                                            index % 2 === 0
                                                ? "bg-zinc-50/50 dark:bg-zinc-900/30"
                                                : ""
                                        } hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors`}
                                    >
                                        <td
                                            className={`py-3 px-4 font-medium ${province.pending ? "text-zinc-400 dark:text-zinc-500 italic" : "text-zinc-900 dark:text-white"}`}
                                        >
                                            {province.province}
                                        </td>
                                        <td className="py-3 px-4 text-right text-zinc-600 dark:text-zinc-300 tabular-nums">
                                            {province.families !== null
                                                ? province.families.toLocaleString()
                                                : "—"}
                                        </td>
                                        <td className="py-3 px-4 text-right text-zinc-300 tabular-nums">
                                            {province.people.toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="text-red-400 tabular-nums">
                                                {province.deaths}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 font-medium">
                                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                                        Total
                                    </td>
                                    <td className="py-3 px-4 text-right text-zinc-900 dark:text-white tabular-nums">
                                        {totalFamilies.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-right text-zinc-900 dark:text-white tabular-nums">
                                        {totalDisplaced.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-right text-red-400 tabular-nums">
                                        {totalDeaths}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

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

// Transform data for the chart - use shorter province names for better display
const chartData = provinceData
    .filter((p) => !p.pending)
    .map((p) => ({
        name:
            p.province.length > 12 ? p.province.slice(0, 12) + "…" : p.province,
        fullName: p.province,
        families: p.families || 0,
        people: p.people,
        deaths: p.deaths,
    }))

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        name: string
        value: number
        color: string
        dataKey: string
    }>
    label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = chartData.find((d) => d.name === label)
        return (
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl">
                <p className="text-white font-medium mb-2">
                    {data?.fullName || label}
                </p>
                {payload.map((entry) => (
                    <p
                        key={entry.dataKey}
                        className="text-sm"
                        style={{ color: entry.color }}
                    >
                        {entry.name}: {entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        )
    }
    return null
}

export function ProvinceBarChart() {
    return (
        <div className="w-full">
            <h4 className="text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                Province Breakdown (Chart View)
            </h4>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 60,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(113, 113, 122, 0.2)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#a1a1aa", fontSize: 11 }}
                            tickLine={{ stroke: "#52525b" }}
                            axisLine={{ stroke: "#52525b" }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                        />
                        <YAxis
                            tick={{ fill: "#a1a1aa", fontSize: 12 }}
                            tickLine={{ stroke: "#52525b" }}
                            axisLine={{ stroke: "#52525b" }}
                            tickFormatter={(value) =>
                                value >= 1000
                                    ? `${(value / 1000).toFixed(0)}k`
                                    : value
                            }
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "rgba(113, 113, 122, 0.1)" }}
                        />
                        <Legend
                            wrapperStyle={{
                                paddingTop: "20px",
                            }}
                            formatter={(value) => (
                                <span className="text-zinc-400 text-sm">
                                    {value}
                                </span>
                            )}
                        />
                        <Bar
                            dataKey="people"
                            name="Displaced People"
                            fill="#f59e0b"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="families"
                            name="Families"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

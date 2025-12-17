interface StatCardProps {
    label: string
    value: string | number
    subValue?: string
    icon: React.ReactNode
    variant?: "default" | "warning" | "danger"
}

export function StatCard({
    label,
    value,
    subValue,
    icon,
    variant = "default",
}: StatCardProps) {
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
                        {subValue && (
                            <span className="text-base font-medium text-zinc-500 dark:text-zinc-400 ml-1.5">
                                {subValue}
                            </span>
                        )}
                    </p>
                </div>
                <div className={iconStyles[variant]}>{icon}</div>
            </div>
        </div>
    )
}

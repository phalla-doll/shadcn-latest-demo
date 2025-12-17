export type EventCategory =
    | "Military"
    | "Diplomatic"
    | "Political"
    | "Legal"
    | "Civilian"

export interface ConflictEvent {
    id: string
    title: string
    date: string // ISO String for sorting
    displayDate: string // Human readable
    year: number
    location: string
    description: string
    category: EventCategory
    sources: {
        title: string
        url?: string
    }[]
    coordinates?: {
        lat: number
        lng: number
    }
}

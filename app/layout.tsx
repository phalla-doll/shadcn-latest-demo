import type { Metadata } from "next"
import { DM_Sans, Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://cambodiaconflict.info"),
    title: {
        default: "Borderlines - Cambodia-Thailand Active Conflict Monitor",
        template: "%s | Borderlines",
    },
    description:
        "Real-time tracking and analysis of the Cambodia-Thailand border crisis. Monitoring displacement, humanitarian impact, and events along the disputed border.",
    keywords: [
        "Cambodia Thailand border",
        "conflict monitor",
        "humanitarian crisis",
        "displacement tracking",
        "border dispute",
        "real-time monitoring",
        "Southeast Asia",
    ],
    authors: [{ name: "Borderlines Team" }],
    creator: "Borderlines",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Borderlines",
        title: "Borderlines: Active Conflict Monitor",
        description:
            "Real-time tracking and analysis of global conflicts, displacement, and humanitarian crises.",
        images: [
            {
                url: "/main-og-image.png",
                width: 1200,
                height: 630,
                alt: "Borderlines - Active Conflict Monitor",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Borderlines: Active Conflict Monitor",
        description:
            "Real-time tracking and analysis of global conflicts, displacement, and humanitarian crises.",
        images: ["/main-og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${dmSans.variable}`}
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}

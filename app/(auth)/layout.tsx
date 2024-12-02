import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { Metadata } from "next"
import '../globals.css'

export const metadata = {
    title: 'You Might Fall In Love Today',
    description: 'A platform to share and express moments of love in our daily lives'

}

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
 }) {
    return (
    <ClerkProvider>
        <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
            <div className="w-full flex justify-center items-center min-h-screen">
            {children}
            </div>
            </body>
        </html>
    </ClerkProvider>)
 }
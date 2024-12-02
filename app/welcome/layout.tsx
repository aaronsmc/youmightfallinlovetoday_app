export const metadata = {
  title: 'You Might Fall In Love Today',
  description: 'A platform to share and express moments of love in our daily lives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

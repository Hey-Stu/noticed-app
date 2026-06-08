import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://your-noticed-app.vercel.app/'),
  title: 'Noticed — a quiet place for what you notice',
  description:
    'A calm, local-first field-notes app for collecting small observations, references, quotes, colors, and ideas — then discovering the patterns in what you keep noticing.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '1024x1024' }],
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Noticed — a quiet place for what you notice',
    description:
      'A calm, local-first field-notes app for collecting small observations, references, quotes, colors, and ideas — then discovering the patterns in what you keep noticing.',
    images: [
      {
        url: '/noticed-cover.png',
        width: 1920,
        height: 1440,
        alt: 'Noticed app preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noticed — a quiet place for what you notice',
    description:
      'A calm, local-first field-notes app for collecting small observations, references, quotes, colors, and ideas — then discovering the patterns in what you keep noticing.',
    images: ['/noticed-cover.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV = [
  { title: 'Library', href: '/' },
  { title: 'Patterns', href: '/patterns' },
  { title: 'Weekly Report', href: '/report' },
  { title: 'Settings', href: '/settings' },
]

function BrandMark() {
  return (
    <span className="grid size-6 place-items-center text-foreground">
      <Eye
        className="brand-eye-open col-start-1 row-start-1 size-6 opacity-100"
        aria-hidden="true"
        strokeWidth={2}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="brand-eye-closed col-start-1 row-start-1 size-6 opacity-0"
        aria-hidden="true"
      >
        <path d="m15 18-.722-3.25" />
        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
        <path d="m20 15-1.726-2.05" />
        <path d="m4 15 1.726-2.05" />
        <path d="m9 18 .722-3.25" />
      </svg>
    </span>
  )
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-svh w-full flex-col bg-transparent">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-xl">
          <div className="relative mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 md:px-8">
            <Link
              href="/"
              className="brand-logo flex items-center gap-2.5 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BrandMark />
              <span className="font-serif text-2xl font-semibold tracking-[0.02em]">
                Noticed
              </span>
            </Link>
            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="w-full max-w-fit">
                <nav className="mx-auto flex items-center gap-1 rounded-full border border-border/80 bg-card/80 p-1 shadow-paper">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="hidden md:flex md:items-center">
              <ThemeToggle className="size-9 rounded-full border border-border/80 bg-card/80 shadow-paper hover:bg-accent" />
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[90rem] flex-1 px-4 py-6 md:px-8 md:py-10">
          {children}
        </div>
    </main>
  )
}

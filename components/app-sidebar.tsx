'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Eye,
  FileText,
  Settings as SettingsIcon,
  Sparkles,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV = [
  { title: 'Library', href: '/', icon: BookOpen, hint: 'Everything you noticed' },
  { title: 'Patterns', href: '/patterns', icon: Sparkles, hint: 'What keeps returning' },
  { title: 'Weekly Report', href: '/report', icon: FileText, hint: 'A look back' },
  { title: 'Settings', href: '/settings', icon: SettingsIcon, hint: 'Your space' },
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

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border/70">
      <SidebarHeader className="px-4 pt-5 pb-3">
        <Link
          href="/"
          aria-label="Go to Library"
          className="brand-logo flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <BrandMark />
          <div className="space-y-1">
            <span className="block font-serif text-3xl font-semibold tracking-[0.02em]">
              Noticed
            </span>
            <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Personal archive
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Browse
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.hint}
                      className="h-12 gap-3 rounded-2xl px-4 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-[18px]" />
                        <div className="flex flex-col leading-tight">
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-5">
        <div className="rounded-[1.25rem] border border-sidebar-border/70 bg-sidebar-accent/50 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Local-first
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-sm text-foreground">Stored on this device</span>
            <ThemeToggle className="size-8" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Keep references, quotes, colors, and notes without turning the
            interface into the loudest thing on the page.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

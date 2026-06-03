'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Eye,
  Sparkles,
  FileText,
  Settings as SettingsIcon,
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
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <Link
          href="/"
          aria-label="Go to Library"
          className="brand-logo flex items-center gap-2.5 rounded-md px-1 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <BrandMark />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl font-semibold tracking-tight">
              Noticed
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/80">
            Your journal
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
                      className="h-11 gap-3 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:shadow-paper"
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

      <SidebarFooter className="px-3 pb-4">
        <div className="flex items-center justify-between rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2 py-1.5">
          <span className="px-1 text-xs text-muted-foreground">
            Stored on this device
          </span>
          <ThemeToggle className="size-7" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

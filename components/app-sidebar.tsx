'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
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
import { useObservations } from '@/hooks/use-observations'

const NAV = [
  { title: 'Library', href: '/', icon: BookOpen, hint: 'Everything you noticed' },
  { title: 'Patterns', href: '/patterns', icon: Sparkles, hint: 'What keeps returning' },
  { title: 'Weekly Report', href: '/report', icon: FileText, hint: 'A look back' },
  { title: 'Settings', href: '/settings', icon: SettingsIcon, hint: 'Your space' },
]

function BrandMark() {
  return (
    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-paper">
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    </span>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { observations, hydrated } = useObservations()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <div className="flex items-center gap-2.5 px-1">
          <BrandMark />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight">
              Noticed
            </span>
            <span className="text-xs text-muted-foreground">
              {hydrated
                ? `${observations.length} ${observations.length === 1 ? 'observation' : 'observations'}`
                : 'a field journal'}
            </span>
          </div>
        </div>
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

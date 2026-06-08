'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
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

const NAV = [
  { title: 'Library', href: '/', icon: BookOpen, hint: 'Everything you noticed' },
  { title: 'Patterns', href: '/patterns', icon: Sparkles, hint: 'What keeps returning' },
  { title: 'Weekly Report', href: '/report', icon: FileText, hint: 'A look back' },
  { title: 'Settings', href: '/settings', icon: SettingsIcon, hint: 'Your space' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border/70">
      <SidebarHeader className="px-4 pt-5 pb-1" />

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
          <div className="mt-2">
            <span className="text-sm text-foreground">Stored on this device</span>
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

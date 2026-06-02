import type { ReactNode } from 'react'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md md:hidden">
          <SidebarTrigger className="-ml-1" />
          <span className="font-serif text-base font-semibold">Noticed</span>
        </header>
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

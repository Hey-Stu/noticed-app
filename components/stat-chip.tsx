import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StatChip({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon?: LucideIcon
  label: string
  value: string | number
  hint?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-4 shadow-paper',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        {Icon ? <Icon className="size-4" /> : null}
        <span className="text-xs font-medium">
          {label}
        </span>
      </div>
      <p className="mt-2 font-serif text-3xl font-semibold leading-none">
        {value}
      </p>
      {hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

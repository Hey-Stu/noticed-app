import { cn } from '@/lib/utils'
import { getTypeConfig } from '@/lib/observation-types'
import type { ObservationType } from '@/lib/types'

export function TypeBadge({
  type,
  className,
  showLabel = true,
}: {
  type: ObservationType
  className?: string
  showLabel?: boolean
}) {
  const config = getTypeConfig(type)
  const Icon = config.icon
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]',
        config.tintClass,
        config.colorClass,
        className,
      )}
    >
      <Icon className="size-3" />
      {showLabel ? config.label : null}
    </span>
  )
}

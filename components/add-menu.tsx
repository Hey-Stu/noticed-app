'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, ClipboardEvent, DragEvent } from 'react'
import { Import, LayoutGrid, Plus, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { useObservations } from '@/hooks/use-observations'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

function fileStem(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
}

function readImageData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(new Error('Unable to read file.'))
    reader.readAsDataURL(file)
  })
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(new Error('Unable to read file.'))
    reader.readAsText(file)
  })
}

function getImageFile(files: FileList | null): File | undefined {
  if (!files) return undefined
  return Array.from(files).find((file) => file.type.startsWith('image/'))
}

function getTextOrJsonFile(files: FileList | null): File | undefined {
  if (!files) return undefined
  return Array.from(files).find((file) =>
    file.type === 'application/json' ||
    file.name.toLowerCase().endsWith('.json') ||
    file.type.startsWith('text/'),
  )
}

function UploadDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { addObservation } = useObservations()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) setIsDragging(false)
  }, [open])

  async function handleFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('That does not look like an image.')
      return
    }

    if (file.size > 1.5 * 1024 * 1024) {
      toast.error('Image is a bit large', {
        description: 'Try one under 1.5MB, or paste an image instead.',
      })
      return
    }

    try {
      const imageData = await readImageData(file)
      addObservation({
        type: 'image',
        body: '',
        title: fileStem(file.name) || undefined,
        imageData,
      })
      toast.success('Image added.', {
        description: 'Dropped safely into your library.',
      })
      onOpenChange(false)
    } catch {
      toast.error('Could not read that file.')
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLDivElement>) {
    const file = getImageFile(e.clipboardData.files)
    if (!file) return
    e.preventDefault()
    void handleFile(file)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    const hasImage = Array.from(e.dataTransfer.items).some((item) =>
      item.type.startsWith('image/'),
    )
    if (!hasImage) return
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDragging(false)
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    const file = getImageFile(e.dataTransfer.files)
    if (!file) return
    e.preventDefault()
    setIsDragging(false)
    void handleFile(file)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = getImageFile(e.target.files)
    e.currentTarget.value = ''
    void handleFile(file)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          '!fixed !inset-0 !top-0 !left-0 !h-[100dvh] !w-[100dvw] !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-0 !bg-black !p-0 !shadow-none',
          isDragging && 'bg-zinc-950',
        )}
      >
        <div
          className={cn(
            'relative flex h-full w-full flex-col justify-between px-6 py-6 text-white md:px-10 md:py-8',
            isDragging && 'bg-white/5',
          )}
          onPaste={handlePaste}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 size-9 rounded-full border-0 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 md:right-8 md:top-8"
            aria-label="Close upload dialog"
            title="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>

          <DialogHeader className="sr-only">
            <DialogTitle>Upload image</DialogTitle>
            <DialogDescription>
              Drop or paste an image, or select one from your device.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/45">
                Upload
              </p>
              <h2 className="mt-6 text-balance text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                Drop or paste in your image.
              </h2>
              <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/68 md:text-lg">
                Paste from your clipboard, drag a file onto this view, or choose
                one from your device.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pb-2">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-white/10 px-5 text-sm font-medium text-white shadow-none hover:bg-white/15 hover:text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              Select from device
            </Button>
            <p className="text-sm text-white/45">
              or paste an image from your clipboard
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleInputChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ImportDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { importData } = useObservations()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) setIsDragging(false)
  }, [open])

  function finishImport(text: string) {
    try {
      const { added, skipped } = importData(text)
      if (added === 0) {
        toast('Nothing new to import', {
          description:
            skipped > 0
              ? 'Every note in that file is already in your library.'
              : 'No observations were found in that file.',
        })
      } else {
        toast.success(`Imported ${added} ${added === 1 ? 'note' : 'notes'}`, {
          description:
            skipped > 0
              ? `${skipped} duplicate ${skipped === 1 ? 'note was' : 'notes were'} skipped.`
              : 'Your observations were merged into the library.',
        })
      }
      onOpenChange(false)
    } catch (err) {
      toast.error('Import failed', {
        description:
          err instanceof Error ? err.message : 'That file could not be read.',
      })
    }
  }

  async function handleFile(file: File | undefined) {
    if (!file) return
    try {
      const text = await readTextFile(file)
      finishImport(text)
    } catch {
      toast.error('Could not read that file.')
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLDivElement>) {
    const file = getTextOrJsonFile(e.clipboardData.files)
    if (file) {
      e.preventDefault()
      void handleFile(file)
      return
    }

    const text = e.clipboardData.getData('text/plain')
    if (!text.trim()) return
    e.preventDefault()
    finishImport(text)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    const hasJson = Array.from(e.dataTransfer.items).some((item) =>
      item.type === 'application/json' || item.type.startsWith('text/'),
    )
    if (!hasJson) return
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDragging(false)
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    const file = getTextOrJsonFile(e.dataTransfer.files)
    if (!file) return
    e.preventDefault()
    setIsDragging(false)
    void handleFile(file)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = getTextOrJsonFile(e.target.files)
    e.currentTarget.value = ''
    void handleFile(file)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          '!fixed !inset-0 !top-0 !left-0 !h-[100dvh] !w-[100dvw] !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-0 !bg-black !p-0 !shadow-none',
          isDragging && 'bg-zinc-950',
        )}
      >
        <div
          className={cn(
            'relative flex h-full w-full flex-col justify-between px-6 py-6 text-white md:px-10 md:py-8',
            isDragging && 'bg-white/5',
          )}
          onPaste={handlePaste}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 size-9 rounded-full border-0 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 md:right-8 md:top-8"
            aria-label="Close import dialog"
            title="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>

          <DialogHeader className="sr-only">
            <DialogTitle>Import backup</DialogTitle>
            <DialogDescription>
              Drop, paste, or select a JSON backup file.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/45">
                Import
              </p>
              <h2 className="mt-6 text-balance text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                Drop or paste your backup here.
              </h2>
              <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/68 md:text-lg">
                Bring in a JSON backup from Noticed by dragging it here, pasting
                it, or choosing a file from your device.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pb-2">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-white/10 px-5 text-sm font-medium text-white shadow-none hover:bg-white/15 hover:text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              Select from device
            </Button>
            <p className="text-sm text-white/45">
              or paste the JSON content directly
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json,text/plain"
            className="sr-only"
            onChange={handleInputChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LayoutControlsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { settings, updateSettings } = useObservations()
  const [size, setSize] = useState(settings.libraryCardSize)
  const [spacing, setSpacing] = useState(settings.libraryCardPadding)

  useEffect(() => {
    if (!open) return
    setSize(settings.libraryCardSize)
    setSpacing(settings.libraryCardPadding)
  }, [open, settings.libraryCardPadding, settings.libraryCardSize])

  function updateSize(value: number) {
    setSize(value)
    updateSettings({ libraryCardSize: value })
  }

  function updateSpacing(value: number) {
    setSpacing(value)
    updateSettings({ libraryCardPadding: value })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          '!fixed !left-1/2 !top-4 !h-[clamp(320px,40vh,430px)] !w-[calc(100vw-2rem)] !max-w-[1800px] !translate-x-[-50%] !translate-y-0 !rounded-[2rem] !border-0 !bg-black !p-0 !shadow-[0_30px_80px_rgba(0,0,0,0.45)]',
        )}
      >
        <div className="relative flex h-full w-full flex-col px-6 py-6 text-white md:px-10 md:py-8">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 size-9 rounded-full border-0 bg-transparent shadow-none hover:bg-white/10 focus-visible:ring-0 focus-visible:ring-offset-0 md:right-8 md:top-8"
            aria-label="Close layout controls"
            title="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>

          <DialogHeader className="sr-only">
            <DialogTitle>Saved item layout</DialogTitle>
            <DialogDescription>
              Adjust the size and spacing of saved items.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-1 items-center justify-center">
            <div className="grid w-full max-w-5xl gap-16 md:grid-cols-2 md:gap-24">
              <div className="space-y-6 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-medium text-white/90 md:text-3xl">
                    Size
                  </p>
                  <p className="text-sm text-white/45">Card width</p>
                </div>
                <Slider
                  value={[size]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => updateSize(value[0] ?? 50)}
                  className={cn(
                    'mx-auto w-full max-w-md',
                    '[&_[data-slot=slider-track]]:bg-white/25',
                    '[&_[data-slot=slider-range]]:bg-white',
                    '[&_[data-slot=slider-thumb]]:border-white',
                    '[&_[data-slot=slider-thumb]]:bg-black',
                  )}
                />
              </div>

              <div className="space-y-6 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-medium text-white/90 md:text-3xl">
                    Spacing
                  </p>
                  <p className="text-sm text-white/45">Space between cards</p>
                </div>
                <Slider
                  value={[spacing]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => updateSpacing(value[0] ?? 50)}
                  className={cn(
                    'mx-auto w-full max-w-md',
                    '[&_[data-slot=slider-track]]:bg-white/25',
                    '[&_[data-slot=slider-range]]:bg-white',
                    '[&_[data-slot=slider-thumb]]:border-white',
                    '[&_[data-slot=slider-thumb]]:bg-black',
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ITEMS = [
  { label: 'Upload', icon: Upload },
  { label: 'Import', icon: Import },
]

export function LayoutControlsButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          'size-9 rounded-full border-0 bg-transparent shadow-none hover:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0',
          className,
        )}
        aria-label="Card size and spacing controls"
        title="Card size and spacing controls"
        onClick={() => setOpen(true)}
      >
        <LayoutGrid className="size-4" />
      </Button>
      <LayoutControlsDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

export function AddMenu() {
  const [uploadOpen, setUploadOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full border-0 bg-transparent shadow-none hover:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Add"
          title="Add"
        >
            <Plus className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          {ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <DropdownMenuItem
                key={item.label}
                className="cursor-pointer gap-2"
                onSelect={() => {
                  if (item.label === 'Upload') {
                    setUploadOpen(true)
                    return
                  }

                  setImportOpen(true)
                }}
              >
                <Icon className="size-4" />
                {item.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <ImportDialog open={importOpen} onOpenChange={setImportOpen} />
    </>
  )
}

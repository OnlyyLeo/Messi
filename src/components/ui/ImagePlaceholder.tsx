import { ImageIcon } from 'lucide-react'

type Props = {
  /** Describes the photo that belongs here; used as alt text once swapped. */
  alt: string
  /** Optional real image path. When set, the placeholder is replaced by the image. */
  src?: string
  label?: string
  className?: string
}

/**
 * A clearly marked slot for a photo you can add later. Set `src` (e.g. in
 * src/data/messi.ts) to swap in a real, licensed image.
 */
export function ImagePlaceholder({ alt, src, label = 'Image placeholder', className = '' }: Props) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-panel-2 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 25% 20%, rgba(117,170,219,.35), transparent 55%), radial-gradient(circle at 80% 85%, rgba(232,184,74,.25), transparent 50%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 2px, transparent 2px 14px)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/25 bg-ink/50 px-4 py-3 text-center backdrop-blur-sm">
        <ImageIcon className="h-5 w-5 text-sky" aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{label}</span>
      </div>
    </div>
  )
}

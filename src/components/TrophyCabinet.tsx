import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Crown, Footprints, Globe, Medal, Shield, Star, Trophy as TrophyIcon, type LucideIcon } from 'lucide-react'
import { trophies, type Trophy, type TrophyCategory } from '../data/messi'
import { SectionHeading } from './ui/SectionHeading'

const icons: Record<Trophy['icon'], LucideIcon> = {
  trophy: TrophyIcon,
  globe: Globe,
  star: Star,
  medal: Medal,
  crown: Crown,
  shield: Shield,
  boot: Footprints,
  award: Award,
}

type Filter = 'All' | TrophyCategory
const filters: Filter[] = ['All', 'Club', 'International', 'Individual']

export function TrophyCabinet() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? trophies : trophies.filter((t) => t.category === filter)),
    [filter],
  )
  const teamTotal = trophies.filter((t) => t.category !== 'Individual').reduce((n, t) => n + t.count, 0)
  const visibleTotal = visible.reduce((n, t) => n + t.count, 0)

  return (
    <section aria-labelledby="trophies-title" className="relative bg-panel/40 py-24 md:py-32">
      <span id="trophies" className="absolute -top-16" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="trophies-title"
          eyebrow="Silverware"
          title="Trophy cabinet"
          intro={`${teamTotal} team trophies with club and country — more than any player in history — plus a shelf of individual awards.`}
        />

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter trophies" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                  filter === f
                    ? 'border-gold bg-gold text-ink'
                    : 'border-line text-muted hover:border-sky hover:text-text'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            Showing <span className="font-semibold text-text">{visibleTotal}</span>{' '}
            {filter === 'Individual' ? 'awards' : filter === 'All' ? 'titles & awards' : 'titles'}
          </p>
        </div>

        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((t) => (
              <TrophyCard key={t.name} trophy={t} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}

function TrophyCard({ trophy }: { trophy: Trophy }) {
  const Icon = icons[trophy.icon]
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-gold/60"
    >
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold/25"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-sky/10 text-gold">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="font-display text-6xl leading-none text-text">
          ×{trophy.count}
        </span>
      </div>
      <h3 className="relative mt-5 text-lg font-semibold leading-snug text-text">{trophy.name}</h3>
      <p className="relative mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
        {trophy.team ?? 'Individual'}
      </p>
      <p className="relative mt-4 text-sm leading-relaxed text-muted">{trophy.years.join(' · ')}</p>
    </motion.li>
  )
}

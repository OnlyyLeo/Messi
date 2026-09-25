import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { timeline, type TimelineStage } from '../data/messi'
import { SectionHeading } from './ui/SectionHeading'

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [openId, setOpenId] = useState<string | null>(timeline[0]?.id ?? null)

  return (
    <section aria-labelledby="timeline-title" className="relative py-24 md:py-32">
      <span id="timeline" className="absolute -top-16" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="timeline-title"
          eyebrow="The journey"
          title="Career timeline"
          intro="From a boy in Rosario to the most decorated footballer in history. Open each chapter for its key moments."
        />

        <div className="relative">
          {/* Track + scroll-linked fill */}
          <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-sky via-sky to-gold md:left-1/2"
            style={{ scaleY: fill }}
          />

          <ol ref={listRef} className="relative space-y-8 md:space-y-12">
            {timeline.map((stage, i) => (
              <TimelineItem
                key={stage.id}
                stage={stage}
                index={i}
                open={openId === stage.id}
                onToggle={() => setOpenId((cur) => (cur === stage.id ? null : stage.id))}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

type ItemProps = {
  stage: TimelineStage
  index: number
  open: boolean
  onToggle: () => void
}

function TimelineItem({ stage, index, open, onToggle }: ItemProps) {
  const right = index % 2 === 1
  const panelId = `timeline-panel-${stage.id}`

  return (
    <li className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
      {/* Node */}
      <span
        aria-hidden="true"
        className={`absolute left-4 top-7 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 md:left-1/2 ${
          open ? 'border-gold bg-gold shadow-[0_0_24px_rgba(232,184,74,.7)]' : 'border-sky bg-ink'
        } transition-all duration-300`}
      />

      <motion.div
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}
      >
        <article
          className={`group rounded-2xl border bg-panel/80 p-6 transition-colors duration-300 ${
            open ? 'border-gold/50' : 'border-line hover:border-sky/50'
          }`}
        >
          <p className="font-display text-2xl text-gold">{stage.period}</p>
          <h3 className="mt-1 font-display text-4xl text-text sm:text-5xl">{stage.title}</h3>
          <p className={`mt-2 flex items-center gap-1.5 text-sm text-sky ${right ? '' : 'md:justify-end'}`}>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {stage.place}
          </p>
          <p className="mt-4 leading-relaxed text-muted">{stage.summary}</p>

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text transition-colors hover:border-gold hover:text-gold"
          >
            {open ? 'Hide' : 'Key'} moments
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                id={panelId}
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden text-left"
              >
                {stage.moments.map((m) => (
                  <li key={m.year + m.text} className="mt-4 flex gap-4 border-t border-line pt-4 first:mt-6">
                    <span className="w-12 shrink-0 font-display text-2xl text-sky">{m.year}</span>
                    <span className="text-sm leading-relaxed text-text/90">{m.text}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </article>
      </motion.div>
    </li>
  )
}

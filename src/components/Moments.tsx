import { useCallback, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { moments } from '../data/messi'
import { ImagePlaceholder } from './ui/ImagePlaceholder'
import { SectionHeading } from './ui/SectionHeading'

export function Moments() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const reduce = useReducedMotion()
  const count = moments.length
  const moment = moments[index]

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + count) % count, delta]),
    [count],
  )
  const goTo = (i: number) => setState(([cur]) => [i, i > cur ? 1 : -1])

  // Arrow-key support when the carousel has focus.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const offset = reduce ? 0 : 60

  return (
    <section aria-labelledby="moments-title" className="relative py-24 md:py-32">
      <span id="moments" className="absolute -top-16" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="moments-title"
          eyebrow="Unforgettable"
          title="Greatest moments"
          intro="The nights and the goals that people will still be describing to their grandchildren."
        />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Greatest moments"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative overflow-hidden rounded-3xl border border-line bg-panel"
        >
          <div className="grid min-h-[520px] md:grid-cols-5">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${moment.title}`}
                initial={{ opacity: 0, x: direction * offset }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * offset }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="contents"
              >
                <div className="relative h-64 md:col-span-3 md:h-auto">
                  <ImagePlaceholder
                    src={moment.image}
                    alt={moment.imageAlt}
                    label={`Photo placeholder · ${moment.year}`}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 left-4 font-display text-8xl text-white/10 md:text-9xl"
                  >
                    {moment.year}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10 md:col-span-2">
                  <p className="font-display text-3xl text-gold">{moment.year}</p>
                  <h3 className="mt-2 font-display text-5xl text-text sm:text-6xl">{moment.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{moment.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-4 sm:px-6">
            <div className="flex flex-wrap gap-1.5">
              {moments.map((m, i) => (
                <button
                  key={m.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${m.title}`}
                  aria-current={i === index}
                  className="flex h-6 items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-gold' : 'w-3 bg-line hover:bg-sky'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous moment"
                className="rounded-full border border-line p-3 text-text transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next moment"
                className="rounded-full border border-line p-3 text-text transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

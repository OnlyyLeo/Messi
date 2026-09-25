import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { hero } from '../data/messi'
import { CountUp } from './ui/CountUp'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const reduce = useReducedMotion()
  // Parallax layers are switched off entirely for prefers-reduced-motion.
  const yBack = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const yNumber = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh items-center overflow-hidden pt-16"
    >
      {/* Background: abstract stripes in Argentina's colours + glows */}
      <motion.div aria-hidden="true" className="absolute inset-0" style={reduce ? undefined : { y: yBack }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(117,170,219,.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(232,184,74,.16),transparent_55%)]" />
        <div className="absolute -right-1/4 top-0 h-full w-[120%] rotate-[-12deg] opacity-[0.07]">
          <div className="h-1/5 bg-sky" />
          <div className="h-1/5" />
          <div className="h-1/5 bg-sky" />
          <div className="h-1/5" />
          <div className="h-1/5 bg-sky" />
        </div>
      </motion.div>
      <div aria-hidden="true" className="grain absolute inset-0" />

      {/* Giant "10" watermark */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: yNumber }}
        className="pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[55vw] leading-none text-white/[0.03] md:text-[38vw]"
      >
        10
      </motion.div>

      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-sky sm:text-sm"
        >
          <span className="h-px w-12 bg-gold" aria-hidden="true" />
          A tribute · 2004 – today
        </motion.p>

        <h1 id="hero-title" className="font-display text-text">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="block text-[22vw] sm:text-[16vw] lg:text-[13rem]"
          >
            {hero.firstName}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="text-gradient-gold -mt-[2vw] block text-[32vw] sm:text-[24vw] lg:-mt-6 lg:text-[18rem]"
          >
            {hero.lastName}
          </motion.span>
        </h1>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="max-w-md text-lg leading-relaxed text-muted sm:text-xl"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="rounded-2xl border border-line bg-panel/70 px-6 py-5 backdrop-blur-md"
          >
            <CountUp value={hero.careerGoals} duration={2.6} className="block font-display text-7xl text-gold sm:text-8xl" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              {hero.careerGoalsLabel}
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#timeline"
        aria-label="Scroll to career timeline"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full p-2 text-muted hover:text-gold"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown aria-hidden="true" />
      </motion.a>
    </section>
  )
}

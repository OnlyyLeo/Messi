import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Moments } from './components/Moments'
import { Nav } from './components/Nav'
import { Records } from './components/Records'
import { Timeline } from './components/Timeline'
import { TrophyCabinet } from './components/TrophyCabinet'

// Recharts is the heaviest dependency, so the dashboard loads as its own chunk.
const StatsDashboard = lazy(() =>
  import('./components/StatsDashboard').then((m) => ({ default: m.StatsDashboard })),
)

export default function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Timeline />
        <TrophyCabinet />
        <Suspense fallback={<div id="stats" className="min-h-[900px]" aria-busy="true" />}>
          <StatsDashboard />
        </Suspense>
        <Records />
        <Moments />
      </main>
      <Footer />
    </MotionConfig>
  )
}

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'
import { careerTotals, clubSplits, seasons, type Season } from '../data/messi'
import { CountUp } from './ui/CountUp'
import { SectionHeading } from './ui/SectionHeading'

/*
 * Chart colours are deeper steps of the brand sky/gold, validated for lightness,
 * colour-blind separation and contrast against the dark panel surface.
 */
const SERIES = {
  goals: { label: 'Goals', color: '#B8841F' },
  assists: { label: 'Assists', color: '#4F95E3' },
} as const
type Metric = keyof typeof SERIES
type View = Metric | 'both'

const GRID = '#1f2940'
const AXIS_TEXT = '#a3afc4'

export function StatsDashboard() {
  const [view, setView] = useState<View>('both')
  const reduce = useReducedMotion()
  const shown: Metric[] = view === 'both' ? ['goals', 'assists'] : [view]
  const maxClubGoals = Math.max(...clubSplits.map((c) => c.goals))
  const totalGoals = clubSplits.reduce((n, c) => n + c.goals, 0)
  const totalApps = clubSplits.reduce((n, c) => n + c.apps, 0)

  return (
    <section aria-labelledby="stats-title" className="relative py-24 md:py-32">
      <span id="stats" className="absolute -top-16" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="stats-title"
          eyebrow="By the numbers"
          title="Stats dashboard"
          intro="Two decades of output across club and country, season by season."
        />

        {/* Big number cards */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {careerTotals.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-line bg-panel p-4 sm:p-6"
            >
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="block font-display text-5xl text-text sm:text-6xl lg:text-7xl"
              />
              <p className="mt-2 text-sm font-semibold text-text/90">{s.label}</p>
              {s.note && <p className="mt-0.5 text-xs text-muted">{s.note}</p>}
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Season chart */}
          <figure className="rounded-2xl border border-line bg-panel p-4 sm:p-6 lg:col-span-2">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <figcaption>
                <h3 className="font-display text-3xl text-text">Goals &amp; assists per season</h3>
                <p className="mt-1 text-sm text-muted">Club football, all competitions. * = season in progress.</p>
              </figcaption>
              <div role="group" aria-label="Choose metric" className="flex shrink-0 gap-1 self-start rounded-full border border-line p-1">
                {(['both', 'goals', 'assists'] as View[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                      view === v ? 'bg-text text-ink' : 'text-muted hover:text-text'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {shown.length > 1 && (
              <ul className="mb-4 flex gap-5 text-sm text-muted" aria-label="Legend">
                {shown.map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm" style={{ background: SERIES[m].color }} aria-hidden="true" />
                    {SERIES[m].label}
                  </li>
                ))}
              </ul>
            )}

            <div className="h-72 sm:h-80" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasons} margin={{ top: 8, right: 4, left: -20, bottom: 0 }} barGap={2} barCategoryGap="18%">
                  <CartesianGrid vertical={false} stroke={GRID} />
                  <XAxis
                    dataKey="season"
                    tick={{ fill: AXIS_TEXT, fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: GRID }}
                    interval="preserveStartEnd"
                    minTickGap={12}
                  />
                  <YAxis tick={{ fill: AXIS_TEXT, fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={SeasonTooltip} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  {shown.map((m) => (
                    <Bar
                      key={m}
                      dataKey={m}
                      name={SERIES[m].label}
                      fill={SERIES[m].color}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={22}
                      isAnimationActive={!reduce}
                      animationDuration={900}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <details className="mt-4 text-sm text-muted">
              <summary className="cursor-pointer select-none font-semibold text-text hover:text-gold">
                View as table
              </summary>
              <div className="mt-3 max-h-72 overflow-auto rounded-lg border border-line">
                <table className="w-full text-left">
                  <caption className="sr-only">Goals and assists per season, club football</caption>
                  <thead className="sticky top-0 bg-panel-2 text-xs uppercase tracking-wider text-text">
                    <tr>
                      <th scope="col" className="px-3 py-2">Season</th>
                      <th scope="col" className="px-3 py-2">Club</th>
                      <th scope="col" className="px-3 py-2 text-right">Goals</th>
                      <th scope="col" className="px-3 py-2 text-right">Assists</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons.map((s) => (
                      <tr key={s.season} className="border-t border-line">
                        <th scope="row" className="px-3 py-1.5 font-medium text-text">{s.season}</th>
                        <td className="px-3 py-1.5">{s.club}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums">{s.goals}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums">{s.assists}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </figure>

          {/* Goals by team */}
          <figure className="rounded-2xl border border-line bg-panel p-4 sm:p-6">
            <figcaption>
              <h3 className="font-display text-3xl text-text">Goals by team</h3>
              <p className="mt-1 text-sm text-muted">Official matches, all competitions.</p>
            </figcaption>
            <ul className="mt-8 space-y-6">
              {clubSplits.map((c, i) => (
                <li key={c.name}>
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-text">{c.name}</span>
                    <span className="text-sm text-muted">
                      <span className="font-display text-2xl text-text">{c.goals}</span> in {c.apps} apps
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-panel-2">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-deep to-sky"
                      initial={{ width: reduce ? `${(c.goals / maxClubGoals) * 100}%` : 0 }}
                      whileInView={{ width: `${(c.goals / maxClubGoals) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              Goals per game across his career: <span className="font-semibold text-text">{(totalGoals / totalApps).toFixed(2)}</span>. Assist counts vary
              between data providers; see the notes in <code className="text-sky">src/data/messi.ts</code>.
            </p>
          </figure>
        </div>
      </div>
    </section>
  )
}

function SeasonTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  const s = payload[0].payload as Season
  return (
    <div className="rounded-lg border border-line bg-ink/95 px-3 py-2 text-sm shadow-xl">
      <p className="font-semibold text-text">
        {s.season} · <span className="text-muted">{s.club}</span>
      </p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className="mt-1 flex items-center gap-2 text-muted">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} aria-hidden="true" />
          {p.name}: <span className="font-semibold text-text tabular-nums">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

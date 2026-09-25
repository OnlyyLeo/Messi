import { motion } from 'framer-motion'
import { records } from '../data/messi'
import { SectionHeading } from './ui/SectionHeading'

export function Records() {
  return (
    <section aria-labelledby="records-title" className="relative overflow-hidden bg-panel/40 py-24 md:py-32">
      <span id="records" className="absolute -top-16" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-sky/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="records-title"
          eyebrow="Rewriting history"
          title="Records"
          intro="A selection of the marks he holds — some of which may never be broken."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {records.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-sky/60"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-sky to-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="text-gradient-gold font-display text-7xl">{r.value}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-text">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.detail}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

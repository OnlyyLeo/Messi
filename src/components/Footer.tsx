import { motion } from 'framer-motion'
import { LAST_UPDATED, sources, tribute } from '../data/messi'

const formatted = new Date(`${LAST_UPDATED}T12:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(117,170,219,.18),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span aria-hidden="true" className="font-display text-8xl leading-none text-gold/60">“</span>
          <blockquote className="-mt-6 font-display text-4xl leading-tight text-text sm:text-5xl md:text-6xl">
            {tribute.quote}
          </blockquote>
          <figcaption className="mt-6 text-sm uppercase tracking-[0.3em] text-sky">— {tribute.attribution}</figcaption>
        </motion.figure>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="max-w-md space-y-2">
            <p className="font-display text-3xl text-text">
              LM<span className="text-gold">10</span>
            </p>
            <p>
              An unofficial fan tribute. Not affiliated with Lionel Messi, any club, federation or brand. No
              copyrighted photos or logos are used.
            </p>
            <p>
              Stats last updated: <time dateTime={LAST_UPDATED} className="font-semibold text-text">{formatted}</time>
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-text">Data sources</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col">
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-gold hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-text">Credits</p>
            <p>Built with React, Vite, Tailwind CSS, Framer Motion &amp; Recharts.</p>
            <p>Icons by Lucide. Fonts: Bebas Neue &amp; Inter.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

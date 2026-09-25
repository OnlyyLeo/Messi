import { motion } from 'framer-motion'

type Props = {
  id: string
  eyebrow: string
  title: string
  intro?: string
}

export function SectionHeading({ id, eyebrow, title, intro }: Props) {
  return (
    <motion.header
      className="mb-12 max-w-3xl md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky">
        <span className="h-px w-10 bg-gold" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-5xl text-text sm:text-6xl md:text-7xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </motion.header>
  )
}

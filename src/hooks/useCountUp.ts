import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/** Counts from 0 to `target` the first time the element scrolls into view. */
export function useCountUp<T extends Element>(target: number, duration = 2) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, target, duration])

  // With reduced motion, skip the animation and show the final number straight away.
  return { ref, value: reduceMotion ? target : value }
}

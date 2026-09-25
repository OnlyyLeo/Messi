import { useCountUp } from '../../hooks/useCountUp'

type Props = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ value, suffix = '', duration, className }: Props) {
  const { ref, value: current } = useCountUp<HTMLSpanElement>(value, duration)
  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final number, not every intermediate frame. */}
      <span aria-hidden="true">
        {current.toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  )
}

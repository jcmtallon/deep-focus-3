import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

const Timer = styled.div`
  font-size: 60px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`

function padTime(time: number) {
  return time.toString().padStart(2, '0')
}

// TODO: Support only one format
interface TimerDisplayProps extends HTMLAttributes<HTMLDivElement> {
  time?: { days?: number; hours: number; minutes: number; seconds: number }
  formattedTime?: string
}

function TimerDisplay(props: TimerDisplayProps) {
  const { formattedTime, time = { days: 0, hours: 0, minutes: 0, seconds: 0 }, ...otherProps } = props

  return (
    <Timer {...otherProps}>
      {formattedTime ?? `${padTime(time.hours)}:${padTime(time.minutes)}:${padTime(time.seconds)}`}
    </Timer>
  )
}

export { TimerDisplay }
export type { TimerDisplayProps }

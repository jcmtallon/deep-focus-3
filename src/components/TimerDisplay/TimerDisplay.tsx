import React, { HTMLAttributes, useMemo } from 'react'
import styled from 'styled-components'

const Timer = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  user-select: none;
`

function padTime(time: number) {
  return time.toString().padStart(2, '0')
}

interface TimerDisplayProps extends HTMLAttributes<HTMLDivElement> {
  time?: { days?: number; hours: number; minutes: number; seconds: number }
  formattedTime?: string
}

function TimerDisplay(props: TimerDisplayProps) {
  const {
    formattedTime: propsFormattedTime,
    time = { days: 0, hours: 0, minutes: 0, seconds: 0 },
    ...otherProps
  } = props

  const formattedTime = useMemo(() => {
    if (time.hours > 0) {
      return `${padTime(time.hours)}:${padTime(time.minutes)}:${padTime(time.seconds)}`
    }
    return `${padTime(time.minutes)}:${padTime(time.seconds)}`
  }, [time])

  return <Timer {...otherProps}>{propsFormattedTime ?? formattedTime}</Timer>
}

export { TimerDisplay }
export type { TimerDisplayProps }

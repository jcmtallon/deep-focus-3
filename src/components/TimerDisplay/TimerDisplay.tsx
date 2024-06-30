import { Duration } from 'luxon'
import React, { HTMLAttributes } from 'react'
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
  time?: { days?: number; hours: number; minutes: number; seconds: number } | string | Duration
}

function TimerDisplay(props: TimerDisplayProps) {
  const { time = { days: 0, hours: 0, minutes: 0, seconds: 0 }, ...otherProps } = props

  if (typeof time === 'string') {
    return <Timer {...otherProps}>{time}</Timer>
  }

  if (time instanceof Duration) {
    const { hours } = time.shiftTo('hours')
    return <Timer {...otherProps}>{hours > 0 ? time.toFormat('h:mm:ss') : time.toFormat('mm:ss')}</Timer>
  }

  const formattedTime = (() => {
    if (time.hours > 0) {
      return `${padTime(time.hours)}:${padTime(time.minutes)}:${padTime(time.seconds)}`
    }
    return `${padTime(time.minutes)}:${padTime(time.seconds)}`
  })()

  return <Timer {...otherProps}>{formattedTime}</Timer>
}

export { TimerDisplay }
export type { TimerDisplayProps }

import React from 'react'
import styled from 'styled-components'

const Timer = styled.div`
  font-size: 60px;
  font-weight: 700;
  line-height: 1;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`

function padTime(time: number) {
  return time.toString().padStart(2, '0')
}

// TODO: Support only one format
interface TimerDisplayProps {
  time?: { days?: number; hours: number; minutes: number; seconds: number }
  formattedTime?: string
}

function TimerDisplay(props: TimerDisplayProps) {
  const { formattedTime, time = { days: 0, hours: 0, minutes: 0, seconds: 0 } } = props

  return (
    <Timer>
      {formattedTime ?? `${padTime(time.hours)}:${padTime(time.minutes)}:${padTime(time.seconds)}`}
    </Timer>
  )
}

export { TimerDisplay }
export type { TimerDisplayProps }

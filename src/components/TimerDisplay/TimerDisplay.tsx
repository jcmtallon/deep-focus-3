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

interface TimerDisplayProps {
  time: { days?: number; hours: number; minutes: number; seconds: number }
}

function TimerDisplay(props: TimerDisplayProps) {
  const { hours, minutes, seconds } = props.time

  return <Timer>{`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`}</Timer>
}

export { TimerDisplay }
export type { TimerDisplayProps }

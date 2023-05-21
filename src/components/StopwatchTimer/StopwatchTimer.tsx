import React from 'react'
import { TimerDisplay } from 'components/TimerDisplay/TimerDisplay'
import { useStopwatch } from './useStopwatch'

interface StopwatchTimerProps {
  startTimestamp: number
}

function StopwatchTimer(props: StopwatchTimerProps) {
  const time = useStopwatch(props.startTimestamp)
  return <TimerDisplay time={time} />
}

export { StopwatchTimer }
export type { StopwatchTimerProps }

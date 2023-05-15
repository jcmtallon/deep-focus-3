import React from 'react'
import { TimerDisplay } from 'components/TimerDisplay/TimerDisplay'
import { useStopwatch } from './useStopwatch'

interface StopwatchTimerProps {
  startDateIso: string
}

function StopwatchTimer(props: StopwatchTimerProps) {
  const time = useStopwatch(props.startDateIso)
  return <TimerDisplay time={time} />
}

export { StopwatchTimer }
export type { StopwatchTimerProps }

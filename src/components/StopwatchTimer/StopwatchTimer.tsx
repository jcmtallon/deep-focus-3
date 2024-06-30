import React, { HTMLAttributes } from 'react'
import { TimerDisplay } from 'components'
import { useStopwatch } from './useStopwatch'

interface StopwatchTimerProps extends HTMLAttributes<HTMLDivElement> {
  startTimestamp: number
}

/**
 * Displays a timer that starts from a given timestamp.
 */
function StopwatchTimer(props: StopwatchTimerProps) {
  const { startTimestamp, ...otherProps } = props
  const time = useStopwatch(startTimestamp)
  return <TimerDisplay time={time} {...otherProps} />
}

export { StopwatchTimer }
export type { StopwatchTimerProps }

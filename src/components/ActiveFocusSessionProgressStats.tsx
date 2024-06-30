import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ActiveFocusSession, FocusSession } from 'types'
import {
  countFocusSessionImpacts,
  getActiveFocusSessionActualTimeProgress,
  getActiveFocusSessionCountableTimeProgress,
  getActiveFocusSessionElapsedDuration,
  getFocusSessionPenaltyDuration,
  getFocusSessionsTotalTime,
} from 'utils'
import { CircularProgress } from './CircularProgress'
import { StopwatchTimer } from './StopwatchTimer/StopwatchTimer'
import { DurationToAstroLabel } from './DurationToAstroLabel'

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface ActiveFocusSessionProgressStatsProps {
  activeFocusSession: ActiveFocusSession
  focusSessions: FocusSession[]
}

function ActiveFocusSessionProgressStats(props: ActiveFocusSessionProgressStatsProps) {
  // TODO: Make it stylable (otherProps)
  const { activeFocusSession, focusSessions, ...otherProps } = props

  const [actualTimeProgress, setActualTimeProgress] = useState<number>(0)
  const [countableTimeProgress, setCountableTimeProgress] = useState<number>(0)
  const [totalSeconds, setTotalSeconds] = useState<number>(0)

  const focusSessionsSeconds = useMemo(
    () => getFocusSessionsTotalTime(focusSessions).shiftTo('seconds').seconds,
    [focusSessions],
  )

  // Progress bar and counter updates
  useEffect(() => {
    const updateProgress = () => {
      const elapsedSeconds =
        getActiveFocusSessionElapsedDuration(activeFocusSession).shiftTo('seconds').seconds
      const impactCount = countFocusSessionImpacts(activeFocusSession.impacts)
      const penaltySeconds = getFocusSessionPenaltyDuration(impactCount).shiftTo('seconds').seconds
      const actualTimeProgress = getActiveFocusSessionActualTimeProgress(elapsedSeconds)
      const countableTimeProgress = getActiveFocusSessionCountableTimeProgress(elapsedSeconds, penaltySeconds)
      const totalSeconds = focusSessionsSeconds + elapsedSeconds
      setActualTimeProgress(actualTimeProgress)
      setCountableTimeProgress(countableTimeProgress)
      setTotalSeconds(totalSeconds)
    }
    updateProgress()
    const interval = setInterval(() => updateProgress(), 1000)
    return () => clearInterval(interval)
  }, [activeFocusSession, focusSessionsSeconds])

  return (
    <CircularProgress mainProgress={countableTimeProgress} dangerProgress={actualTimeProgress}>
      <TimerContainer>
        <StopwatchTimer startTimestamp={activeFocusSession.startDate} />
        <DurationToAstroLabel totalSeconds={totalSeconds} />
      </TimerContainer>
    </CircularProgress>
  )
}

export { ActiveFocusSessionProgressStats }
export type { ActiveFocusSessionProgressStatsProps }

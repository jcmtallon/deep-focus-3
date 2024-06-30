import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ActiveFocusSession, AstroName, FocusSession } from 'types'
import { Duration } from 'luxon'
import {
  countFocusSessionImpacts,
  getActiveFocusSessionActualTimeProgress,
  getActiveFocusSessionCountableTimeProgress,
  getActiveFocusSessionElapsedDuration,
  getAstroLabel,
  getFocusSessionPenaltyDuration,
  getFocusSessionsTotalTime,
  getNextAchievableAstroName,
  remainingDurationToAstro,
} from 'utils'
import { CircularProgress } from './CircularProgress'
import { StopwatchTimer } from './StopwatchTimer/StopwatchTimer'

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AstroGoalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  font-size: 14px;
  color: #9596b6;
  white-space: nowrap;
  flex-wrap: nowrap;
  user-select: none;
`

const AstroLabel = styled.div`
  color: #a09780;
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
  const [nextAstroName, setNextAstroName] = useState<AstroName | undefined | null>(undefined)
  const [durationToNextAstro, setDurationToNextAstro] = useState<Duration | undefined | null>(undefined)

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
      const nextAstroName = getNextAchievableAstroName(totalSeconds)
      const durationToNextAstro = nextAstroName ? remainingDurationToAstro(totalSeconds, nextAstroName) : null
      setActualTimeProgress(actualTimeProgress)
      setCountableTimeProgress(countableTimeProgress)
      setNextAstroName(nextAstroName)
      setDurationToNextAstro(durationToNextAstro)
    }
    updateProgress()
    const interval = setInterval(() => updateProgress(), 1000)
    return () => clearInterval(interval)
  }, [activeFocusSession, focusSessionsSeconds])

  return (
    <CircularProgress mainProgress={countableTimeProgress} dangerProgress={actualTimeProgress}>
      <TimerContainer>
        <StopwatchTimer startTimestamp={activeFocusSession.startDate} />
        {nextAstroName && durationToNextAstro && (
          <AstroGoalWrapper>
            <div>{`${durationToNextAstro.toFormat("h'h' m'm'")} to`}</div>
            <AstroLabel>{getAstroLabel(nextAstroName)}</AstroLabel>
          </AstroGoalWrapper>
        )}
      </TimerContainer>
    </CircularProgress>
  )
}

export { ActiveFocusSessionProgressStats }
export type { ActiveFocusSessionProgressStatsProps }

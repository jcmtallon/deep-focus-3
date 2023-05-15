import { StopwatchTimer, TimerDisplay } from 'components'
import React from 'react'
import styled from 'styled-components'

interface FocusModeStatsProps {
  focusModeActive?: boolean
  impactCount?: number
  taskCount?: number
  sessionCount?: number
  sessionStartDateIso?: string
}

const Wrapper = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-items: center;
`

const Date = styled.div`
  font-size: 14px;
`

const StatsWrapper = styled.div<{ endAlign: boolean }>`
  display: flex;
  justify-content: ${props => (props.endAlign ? 'end' : 'space-between')};
  flex: 1;
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  column-gap: 12px;
`

const Sessions = styled.div`
  color: #e8bb3f;
  white-space: nowrap;
`

const Quests = styled.div`
  color: #2dbe90;
  white-space: nowrap;
`

const Impacts = styled.div`
  color: #e05022;
  white-space: nowrap;
`

function FocusModesStats(props: FocusModeStatsProps) {
  const {
    focusModeActive = false,
    impactCount = 0,
    taskCount = 0,
    sessionCount = 0,
    sessionStartDateIso,
  } = props

  return (
    <Wrapper>
      {/* TODO: Calculate session number */}
      <Date>{focusModeActive ? 'Session 1' : '02/05/2023'}</Date>
      {focusModeActive && sessionStartDateIso ? (
        <StopwatchTimer startDateIso={sessionStartDateIso} />
      ) : (
        <TimerDisplay time={{ minutes: 0, hours: 0, seconds: 0 }} />
      )}
      <StatsWrapper endAlign={focusModeActive}>
        {!focusModeActive && <Sessions>{`${sessionCount} sessions`}</Sessions>}
        <Quests>{`${taskCount} quests`}</Quests>
        <Impacts>{`${impactCount} impacts`}</Impacts>
      </StatsWrapper>
    </Wrapper>
  )
}

export { FocusModesStats }
export type { FocusModeStatsProps }

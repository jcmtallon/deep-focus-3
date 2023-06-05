import { StopwatchTimer, TimerDisplay } from 'components'
import { DateTime, Duration, DurationLike } from 'luxon'
import React from 'react'
import styled from 'styled-components'
import { FocusSession } from 'types'
import { FocusModeStatsProgressBar } from './FocusModeStatsProgressBar'

interface FocusModeStatsProps {
  activeFocusSession: FocusSession | null
  completedSessions?: FocusSession[]
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
  const { completedSessions = [], activeFocusSession } = props

  const sessionCount = completedSessions.length
  const questsCount = completedSessions.flatMap(s => s.tasks.map(t => t.status === 'COMPLETED')).length
  const impactCount = completedSessions.reduce((acc, session) => acc + session.stats.impacts, 0)

  if (!activeFocusSession) {
    const today = DateTime.now()
    const totalSessionTime = completedSessions.reduce((acc: DurationLike, session: FocusSession) => {
      const start = DateTime.fromMillis(session.startDate)
      const end = DateTime.fromMillis(session.endDate!) // TODO: Dangerous
      const diff = end.diff(start)
      return diff.plus(acc)
    }, Duration.fromObject({ seconds: 0 }))

    return (
      <Wrapper>
        <Date>{today.toLocaleString()}</Date>
        <TimerDisplay formattedTime={totalSessionTime.toFormat('hh:mm:ss')} />
        <StatsWrapper endAlign={false}>
          <Sessions>{`${sessionCount} sessions`}</Sessions>
          <Quests>{`${questsCount} quests`}</Quests>
          <Impacts>{`${impactCount} impacts`}</Impacts>
        </StatsWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Date>{`Session ${sessionCount + 1}`}</Date>
      <StopwatchTimer startTimestamp={activeFocusSession.startDate} />
      <StatsWrapper endAlign>
        <Quests>{`${activeFocusSession?.tasks.filter(t => t.status === 'COMPLETED').length} quests`}</Quests>
        <Impacts>{`${activeFocusSession.stats.impacts} impacts`}</Impacts>
      </StatsWrapper>
      <FocusModeStatsProgressBar startDate={activeFocusSession.startDate} />
    </Wrapper>
  )
}

export { FocusModesStats }
export type { FocusModeStatsProps }

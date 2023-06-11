import React from 'react'
import { FocusSession } from 'types'
import { DateTime, Duration, DurationLike } from 'luxon'
import { TimerDisplay } from 'components'
import * as S from './MissionControlStats.styles'

interface MissionControlStatsProps {
  focusSessions: FocusSession[]
}

function MissionControlStats(props: MissionControlStatsProps) {
  const { focusSessions } = props

  const sessionCount = focusSessions.length
  const tasksCount = focusSessions.flatMap(s => s.tasks.map(t => t.status === 'COMPLETED')).length
  const impactCount = focusSessions.reduce((acc, session) => acc + session.stats.impacts, 0)

  // This code is also used in the FocusModeStats component. Possibly it can be abstracted.
  const today = DateTime.now()
  const totalSessionTime = focusSessions.reduce((acc: DurationLike, session: FocusSession) => {
    const start = DateTime.fromMillis(session.startDate)
    const end = DateTime.fromMillis(session.endDate!) // TODO: Dangerous
    const diff = end.diff(start)
    return diff.plus(acc)
  }, Duration.fromObject({ seconds: 0 }))

  return (
    <S.Wrapper>
      <S.Date>{today.toLocaleString()}</S.Date>
      <TimerDisplay formattedTime={totalSessionTime.toFormat('hh:mm:ss')} />
      <S.StatsWrapper endAlign={false}>
        <S.Sessions>{`${sessionCount} sessions`}</S.Sessions>
        <S.Quests>{`${tasksCount} quests`}</S.Quests>
        <S.Impacts>{`${impactCount} impacts`}</S.Impacts>
      </S.StatsWrapper>
      <S.BarWrapper>
        <S.BarContainer>
          <S.TimeBar style={{ width: `${Math.min(totalSessionTime.toMillis() / 200_000, 100)}%` }} />
        </S.BarContainer>
        <S.BarContainer>
          <S.SessionsBar style={{ width: `${(sessionCount * 100) / 10}%` }} />
        </S.BarContainer>
        <S.BarContainer>
          <S.TasksBar style={{ width: `${(tasksCount * 100) / 20}%` }} />
        </S.BarContainer>
        <S.BarContainer>
          <S.ImpactsBar style={{ width: `${(impactCount * 100) / 5}%` }} />
        </S.BarContainer>
      </S.BarWrapper>
    </S.Wrapper>
  )
}

export { MissionControlStats }

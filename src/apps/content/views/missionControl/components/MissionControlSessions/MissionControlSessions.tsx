import { DateTime } from 'luxon'
import React from 'react'
import { FocusSession } from 'types'
import { countFocusSessionImpacts } from 'utils'
import * as S from './MissionControlSessions.styles'

interface MissionControlSessionsProps {
  focusSessions: FocusSession[]
}

function MissionControlSessions(props: MissionControlSessionsProps) {
  const { focusSessions = [] } = props

  const getDuration = (startDate: number | undefined, endDate: number | undefined): string | number => {
    // Temp implementation
    if (!startDate || !endDate) return 0
    const start = DateTime.fromMillis(startDate)
    const end = DateTime.fromMillis(endDate!) // TODO: Dangerous
    const diff = end.diff(start)
    return diff.toFormat('hh:mm:ss')
  }

  return (
    <>
      <S.List>
        {focusSessions.map(focusSession => (
          <S.ListItem key={focusSession.sessionId}>
            <S.Duration>{getDuration(focusSession.startDate, focusSession.endDate)}</S.Duration>
            <S.Awards>0 Pulsars</S.Awards>
            <S.Quests>{`${focusSession.tasks.length} quests`}</S.Quests>
            <S.Impacts>{`${countFocusSessionImpacts(focusSession.impacts)} impacts`}</S.Impacts>
          </S.ListItem>
        ))}
      </S.List>
      <S.Counter>{focusSessions.length} sessions</S.Counter>
    </>
  )
}

export { MissionControlSessions }

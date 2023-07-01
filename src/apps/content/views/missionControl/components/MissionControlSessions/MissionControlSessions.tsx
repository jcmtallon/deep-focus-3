import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { FocusSession } from 'types'
import { countFocusSessionImpacts, getStarCountByFocusSessionTotalPoints } from 'utils'
import * as S from './MissionControlSessions.styles'
import { MissionControlSessionsTimeline } from './MissionControlSessionsTimeline'

interface MissionControlSessionsProps {
  focusSessions: FocusSession[]
}

function MissionControlSessions(props: MissionControlSessionsProps) {
  const { focusSessions = [] } = props

  const [view, setView] = useState<'timeline' | 'table'>('timeline')

  const getDuration = (startDate: number | undefined, endDate: number | undefined): string | number => {
    // Temp implementation
    if (!startDate || !endDate) return 0
    const start = DateTime.fromMillis(startDate)
    const end = DateTime.fromMillis(endDate!) // TODO: Dangerous
    const diff = end.diff(start)
    return diff.toFormat('hh:mm:ss')
  }

  // FIXME: Rebuild table view

  if (view === 'table') {
    return (
      <>
        <S.List>
          {focusSessions.map(focusSession => {
            const starCount = getStarCountByFocusSessionTotalPoints(focusSession.points ?? 0)
            return (
              <S.ListItem key={focusSession.sessionId}>
                <S.Duration>{getDuration(focusSession.startDate, focusSession.endDate)}</S.Duration>
                <span>{focusSession.points ?? 0} pts</span>
                <S.Awards>
                  <S.Star style={{ fill: starCount > 0 ? '#E8BB3F' : undefined }} />
                  <S.Star style={{ fill: starCount > 1 ? '#E8BB3F' : undefined }} />
                  <S.Star style={{ fill: starCount > 2 ? '#E8BB3F' : undefined }} />
                </S.Awards>
                <S.Quests>{`${focusSession.tasks.length} quests`}</S.Quests>
                <S.Impacts>{`${countFocusSessionImpacts(focusSession.impacts)} impacts`}</S.Impacts>
              </S.ListItem>
            )
          })}
        </S.List>
        <S.Counter>{focusSessions.length} sessions</S.Counter>
      </>
    )
  }

  return <MissionControlSessionsTimeline focusSessions={focusSessions} />
}

export { MissionControlSessions }

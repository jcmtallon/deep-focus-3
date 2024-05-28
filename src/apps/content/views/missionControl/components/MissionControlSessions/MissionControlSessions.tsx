import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { FocusSession } from 'types'
import {
  countFocusSessionImpacts,
  getFocusSessionDuration,
  getStarCountByFocusSessionTotalPoints,
} from 'utils'
import * as S from './MissionControlSessions.styles'
import { MissionControlSessionsTimeline } from './MissionControlSessionsTimeline'

interface MissionControlSessionsProps {
  focusSessions: FocusSession[]
}

function MissionControlSessions(props: MissionControlSessionsProps) {
  const { focusSessions = [] } = props

  const [view, setView] = useState<'timeline' | 'table'>('table')

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
        <S.Counter>{focusSessions.length} sessions</S.Counter>
        <S.List>
          {focusSessions.map(focusSession => {
            const starCount = getStarCountByFocusSessionTotalPoints(focusSession.points ?? 0)
            const impactCount = countFocusSessionImpacts(focusSession.impacts)
            const impactArray = Array.from(Array(impactCount).keys())

            return (
              <S.ListItem key={focusSession.sessionId}>
                <S.Awards>
                  <S.Star style={{ fill: starCount > 0 ? '#E8BB3F' : undefined }} />
                  <S.Star style={{ fill: starCount > 1 ? '#E8BB3F' : undefined }} />
                  <S.Star style={{ fill: starCount > 2 ? '#E8BB3F' : undefined }} />
                </S.Awards>
                <S.Impacts>
                  {impactArray.map(() => (
                    <S.Impact />
                  ))}
                </S.Impacts>
                <S.Duration>{`${getFocusSessionDuration(focusSession).toFormat('m')} mins`}</S.Duration>
                {/* <span>{focusSession.points ?? 0} pts</span> */}
                {/* <S.Quests>{`${focusSession.tasks.length} quests`}</S.Quests> */}
              </S.ListItem>
            )
          })}
        </S.List>
      </>
    )
  }

  return <MissionControlSessionsTimeline focusSessions={focusSessions} />
}

export { MissionControlSessions }

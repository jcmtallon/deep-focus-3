import React, { useState } from 'react'
import { Category, FocusSession } from 'types'
import {
  countFocusSessionImpacts,
  getFocusSessionDuration,
  getStarCountByFocusSessionTotalPoints,
} from 'utils'
import { listCategories } from 'services/categories'
import * as S from './MissionControlSessions.styles'
import { MissionControlSessionsTimeline } from './MissionControlSessionsTimeline'

interface MissionControlSessionsProps {
  focusSessions: FocusSession[]
  categories: Category[]
}

function MissionControlSessions(props: MissionControlSessionsProps) {
  const { categories = [], focusSessions = [] } = props

  const [view, setView] = useState<'timeline' | 'table'>('table')

  // const getDuration = (startDate: number | undefined, endDate: number | undefined): string | number => {
  //   // Temp implementation
  //   if (!startDate || !endDate) return 0
  //   const start = DateTime.fromMillis(startDate)
  //   const end = DateTime.fromMillis(endDate!) // TODO: Dangerous
  //   const diff = end.diff(start)
  //   return diff.toFormat('hh:mm:ss')
  // }

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

            const category = categories.find(category => category.id === focusSession.categoryId)

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
                {category && (
                  <div style={{ backgroundColor: category.color, whiteSpace: 'nowrap' }}>{category.name}</div>
                )}
                <S.Duration>{`${getFocusSessionDuration(focusSession).toFormat('m')} mins`}</S.Duration>
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

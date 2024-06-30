import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { FocusSession } from 'types'
import { DateTime } from 'luxon'
import {
  countFocusSessionImpacts,
  getFocusSessionDuration,
  getStarCountByFocusSessionTotalPoints,
} from 'utils'
import * as S from './MissionControlSessionsTimelineSession.styles'

interface MissionControlSessionsTimelineSessionProps extends HTMLAttributes<HTMLDivElement> {
  session: FocusSession
}

function MissionControlSessionsTimelineSession(props: MissionControlSessionsTimelineSessionProps) {
  const { session, ...otherProps } = props

  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeight(ref.current?.clientHeight ?? 0)
  }, [])

  const starCount = getStarCountByFocusSessionTotalPoints(session.points ?? 0)
  const impactCount = countFocusSessionImpacts(session.impacts)
  const impactArray = Array.from(Array(impactCount).keys())

  return (
    <S.Wrapper ref={ref} {...otherProps}>
      <S.TimeColumn>
        <S.Time>{DateTime.fromMillis(session.startDate).toFormat('h:mm')}</S.Time>
        <S.TimeSeparator />
        <S.Time>{DateTime.fromMillis(session.endDate ?? 0).toFormat('h:mm')}</S.Time>
      </S.TimeColumn>
      <S.PerformanceColumn>
        <S.StarContainer>
          <S.Star style={{ fill: starCount > 0 ? '#E8BB3F' : '#2d1b6c' }} />
          <S.Star style={{ fill: starCount > 1 ? '#E8BB3F' : '#2d1b6c' }} />
          <S.Star style={{ fill: starCount > 2 ? '#E8BB3F' : '#2d1b6c' }} />
        </S.StarContainer>
        <S.TasksWrapper>
          {session.tasks?.map(task => (
            <S.TaskContainer>
              <S.TaskLabel>{task.title}</S.TaskLabel>
              <S.Checked />
            </S.TaskContainer>
          ))}
        </S.TasksWrapper>
        <S.ImpactContainer>
          {impactArray.map(_ => (
            <S.Impact />
          ))}
        </S.ImpactContainer>
      </S.PerformanceColumn>
      <S.Duration style={{ top: height / 2 - 7 }}>
        {`${getFocusSessionDuration(session).toFormat('m')} mins`}
      </S.Duration>
    </S.Wrapper>
  )
}

export { MissionControlSessionsTimelineSession }
export type { MissionControlSessionsTimelineSessionProps }

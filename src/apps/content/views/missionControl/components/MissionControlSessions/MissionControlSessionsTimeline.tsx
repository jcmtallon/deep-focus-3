import React from 'react'
import { FocusSession } from 'types'
import * as S from './MissionControlSessionsTimeline.styles'
import { MissionControlSessionsTimelineSession } from './MissionControlSessionsTimelineSession'

interface MissionControlSessionsTimelineProps {
  focusSessions: FocusSession[]
}

function MissionControlSessionsTimeline(props: MissionControlSessionsTimelineProps) {
  const { focusSessions } = props

  // FIXME: No sessions message

  return (
    <S.Wrapper>
      {focusSessions.map((session, index) => (
        <>
          {index > 0 && <S.SessionSeparator key={`${session.sessionId}_separator`} />}
          <MissionControlSessionsTimelineSession key={session.sessionId} session={session} />
        </>
      ))}
    </S.Wrapper>
  )
}

export { MissionControlSessionsTimeline }
export type { MissionControlSessionsTimelineProps }

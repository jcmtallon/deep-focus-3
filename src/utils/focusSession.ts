import { DateTime, Duration, DurationLike } from 'luxon'
import { FocusSession } from 'types'
import { TIME_PENALTY } from './constants'

function countFocusSessionImpacts(impacts: FocusSession['impacts']): number {
  if (!impacts) return 0

  return Object.keys(impacts)
    .map(k => (impacts ? impacts[k] : 0))
    .reduce((partialSum, a) => partialSum + a, 0)
}

function getFocusSessionDuration(focusSession: FocusSession): Duration {
  const start = DateTime.fromMillis(focusSession.startDate)
  const end = focusSession.endDate ? DateTime.fromMillis(focusSession.endDate) : DateTime.now()
  const diff = end.diff(start)
  return diff
}

function getFocusSessionsTotalTime(focusSessions: FocusSession[]): Duration {
  return focusSessions.reduce((acc: DurationLike, session: FocusSession) => {
    if (!session.endDate) return Duration.fromObject({ seconds: 0 })
    const start = DateTime.fromMillis(session.startDate)
    const end = DateTime.fromMillis(session.endDate)
    const diff = end.diff(start)
    return diff.plus(acc)
  }, Duration.fromObject({ seconds: 0 }))
}

/**
 *
 * In seconds
 */
function getFocusSessionsPenaltyTime(impactCount: number = 0): number {
  return impactCount * TIME_PENALTY * impactCount
}

export {
  countFocusSessionImpacts,
  getFocusSessionsTotalTime,
  getFocusSessionDuration,
  getFocusSessionsPenaltyTime,
}

import { DateTime, Duration, DurationLike } from 'luxon'
import { FocusSession } from 'types'
import { FocusSessionPointBreakdown, IMPACT_POINTS, MAX_FOCUS_SESSION_POINTS } from './focusSession.types'

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

const MAX_PROGRESS = 100

const ONE_STAR_CRITERIA = 1 / 4
const TWO_STAR_CRITERIA = 5 / 8
const THREE_STAR_CRITERIA = 1 / 1

/**
 * Number of award stars to receive for a given progress amount.
 * @param progress 0 to 100 number
 */
function getStarCountByFocusSessionProgress(progress: number): number {
  if (progress < ONE_STAR_CRITERIA * MAX_PROGRESS) return 0
  if (progress < TWO_STAR_CRITERIA * MAX_PROGRESS) return 1
  if (progress < THREE_STAR_CRITERIA * MAX_PROGRESS) return 2
  return 3
}

// FIXME: Early abstraction. Maybe moving it to where it is used.
function calculateStarLeftPosition(totalWidth: number) {
  return {
    '1': totalWidth * ONE_STAR_CRITERIA,
    '2': totalWidth * TWO_STAR_CRITERIA,
    '3': totalWidth * THREE_STAR_CRITERIA,
  }
}

const POINTS_BY_MILLISECOND = 0.001

function calculateFocusSessionPoints(focusSession: FocusSession): FocusSessionPointBreakdown {
  const sessionDuration = getFocusSessionDuration(focusSession)
  const pointsByTime = Math.floor(POINTS_BY_MILLISECOND * sessionDuration.toMillis())

  const impactCount = countFocusSessionImpacts(focusSession.impacts)
  const pointsByImpacts = -impactCount * IMPACT_POINTS * impactCount
  const totalPoints = pointsByTime + pointsByImpacts

  return {
    pointsByTime,
    pointsByImpacts,
    totalPoints,
  }
}

const ONE_STAR_POINTS = MAX_FOCUS_SESSION_POINTS * ONE_STAR_CRITERIA
const TWO_STAR_POINTS = MAX_FOCUS_SESSION_POINTS * TWO_STAR_CRITERIA
const THREE_STAR_POINTS = MAX_FOCUS_SESSION_POINTS * THREE_STAR_CRITERIA

function getStarCountByFocusSessionTotalPoints(points: number): number {
  if (points < ONE_STAR_POINTS) return 0
  if (points < TWO_STAR_POINTS) return 1
  if (points < THREE_STAR_POINTS) return 2
  return 3
}

export {
  calculateFocusSessionPoints,
  calculateStarLeftPosition,
  countFocusSessionImpacts,
  getFocusSessionsTotalTime,
  getFocusSessionDuration,
  getStarCountByFocusSessionProgress,
  getStarCountByFocusSessionTotalPoints,
}

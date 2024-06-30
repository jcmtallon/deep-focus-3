import { Duration } from 'luxon'
import { FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS, MAX_FOCUS_SESSION_POINTS } from './constants'

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

const ONE_STAR_POINTS = MAX_FOCUS_SESSION_POINTS * ONE_STAR_CRITERIA
const TWO_STAR_POINTS = MAX_FOCUS_SESSION_POINTS * TWO_STAR_CRITERIA
const THREE_STAR_POINTS = MAX_FOCUS_SESSION_POINTS * THREE_STAR_CRITERIA

function getStarCountByFocusSessionTotalPoints(points: number): number {
  if (points < ONE_STAR_POINTS) return 0
  if (points < TWO_STAR_POINTS) return 1
  if (points < THREE_STAR_POINTS) return 2
  return 3
}

/** Amount of time required to obtain the first star of a focus session */
const ONE_STAR_TIME_CRITERIA = FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS * ONE_STAR_CRITERIA

/** Amount of time required to obtain the second star of a focus session */
const TWO_STAR_TIME_CRITERIA = FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS * TWO_STAR_CRITERIA

/** Amount of time required to obtain the third star of a focus session */
const THREE_STAR_TIME_CRITERIA = FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS * THREE_STAR_CRITERIA

const criteria = { '1': ONE_STAR_TIME_CRITERIA, '2': TWO_STAR_TIME_CRITERIA, '3': THREE_STAR_TIME_CRITERIA }

/**
 *
 */
function durationToStar(currentDuration: Duration, targetStar: '1' | '2' | '3'): Duration {
  const targetDuration = Duration.fromObject({ seconds: criteria[targetStar] })
  const diff = targetDuration.minus(currentDuration)
  return diff.as('milliseconds') < 0 ? Duration.fromMillis(0) : diff
}

export {
  calculateStarLeftPosition,
  getStarCountByFocusSessionProgress,
  getStarCountByFocusSessionTotalPoints,
  durationToStar,
}

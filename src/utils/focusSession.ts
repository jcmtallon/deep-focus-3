import { DateTime, Duration, DurationLike } from 'luxon'
import { ActiveFocusSession, FocusSession } from 'types'
import { FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS, SECOND_PENALTY_FACTOR } from './constants'

/**
 * Counts total number of impacts in a focus session.
 *
 * @returns number
 */
function countFocusSessionImpacts(impacts?: FocusSession['impacts'] | ActiveFocusSession['impacts']): number {
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

/**
 * Calculates the total time spent on focus sessions,
 * without counting any penalty time.
 */
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
 * Calculates the total time passed since an active session started until now.
 *
 * @returns Duration
 */
function getActiveFocusSessionElapsedDuration(activeFocusSession: ActiveFocusSession): Duration {
  return Duration.fromMillis(new Date().getTime() - new Date(activeFocusSession.startDate).getTime())
}

/**
 * Calculates the progress value of the active focus session.
 * Can be used to display a progress bar of the session.
 *
 * The value does not take into consideration existing penalty time.
 *
 * @returns Number from 0 to 100
 */
function getActiveFocusSessionActualTimeProgress(elapsedSeconds: number) {
  const progress = (Math.max(elapsedSeconds, 0) / FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS) * 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  return clampedProgress
}

/**
 * Calculates the penalty duration based on a number of impacts.
 *
 * @returns Duration
 */
function getFocusSessionPenaltyDuration(impactCount: number): Duration {
  return Duration.fromObject({ seconds: impactCount * SECOND_PENALTY_FACTOR * impactCount })
}

/**
 * Calculates the progress value of the active focus session resting any existing penalty time.
 * Can be used to display a progress bar of the session.
 *
 * @returns Number from 0 to 100
 */
function getActiveFocusSessionCountableTimeProgress(elapsedSeconds: number, penaltySeconds: number) {
  const progress = (Math.max(elapsedSeconds - penaltySeconds, 0) / FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS) * 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  return clampedProgress
}

/**
 *
 * In seconds
 */
function getFocusSessionsPenaltyTime(impactCount: number = 0): number {
  return impactCount * SECOND_PENALTY_FACTOR * impactCount
}

export {
  countFocusSessionImpacts,
  getActiveFocusSessionActualTimeProgress,
  getActiveFocusSessionCountableTimeProgress,
  getActiveFocusSessionElapsedDuration,
  getFocusSessionDuration,
  getFocusSessionPenaltyDuration,
  getFocusSessionsPenaltyTime,
  getFocusSessionsTotalTime,
}

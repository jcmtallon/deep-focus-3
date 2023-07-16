import { MAX_FOCUS_SESSION_POINTS } from './focusSession.types'

/**
 * @returns Number from 0 to 100 representing the progress of the focus session after
 * deducting the penalty points.
 */
function getFocusSessionProgressWithPenalty(points: number, penaltyPoints: number): number {
  const totalPoints = Math.max(Math.max(points, 0) - Math.max(penaltyPoints, 0), 0)
  const progress = (totalPoints / MAX_FOCUS_SESSION_POINTS) * 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  return clampedProgress
}

/**
 * @returns Number from 0 to 100
 */
function getFocusSessionProgress(points: number): number {
  const progress = (Math.max(points, 0) / MAX_FOCUS_SESSION_POINTS) * 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  return clampedProgress
}

export { getFocusSessionProgressWithPenalty, getFocusSessionProgress }

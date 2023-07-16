import { FocusSessionPointBreakdown, MAX_FOCUS_SESSION_POINTS } from './focusSession.types'

function calculateFocusSessionProgressBreakdown(points: FocusSessionPointBreakdown) {
  // points.pointsByImpacts is negative, so we need to invert it.
  const pointsByTime = Math.max(points.pointsByTime, 0)
  const pointsByImpact = Math.max(-points.pointsByImpacts, 0)
  const finalPoints = Math.max(points.pointsByTime - pointsByImpact, 0)

  const timeProgress = (pointsByTime / MAX_FOCUS_SESSION_POINTS) * 100
  const impactProgress = (pointsByImpact / MAX_FOCUS_SESSION_POINTS) * 100
  const finalProgress = (finalPoints / MAX_FOCUS_SESSION_POINTS) * 100

  const clampedTimeProgress = Math.min(Math.max(timeProgress, 0), 100)
  const clampedImpactProgress = Math.min(Math.max(impactProgress, 0), 100)
  const clampedProgress = Math.min(Math.max(finalProgress, 0), 100)

  // Total time progress - lost progress by impacts
  const time = clampedProgress

  // Progress lost by impacts (decreases so the sum of time and impact never exceeds 100)
  const impact = clampedProgress + clampedImpactProgress > 100 ? 100 - clampedProgress : clampedImpactProgress

  return {
    time,
    // So progress lost by impacts is never bigger than achieved progress by time, we need to clamp it.
    impact: pointsByImpact > pointsByTime ? clampedTimeProgress : impact,
  }
}

export { calculateFocusSessionProgressBreakdown }

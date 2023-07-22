import { FocusSession } from 'types'
import { IMPACT_POINTS, POINTS_BY_MILLISECOND } from './constants'
import { countFocusSessionImpacts, getFocusSessionDuration } from './focusSession'

function getFocusSessionPointsByTime(focusSession: FocusSession): number {
  const sessionDuration = getFocusSessionDuration(focusSession)
  return Math.floor(POINTS_BY_MILLISECOND * sessionDuration.toMillis())
}

function getPenaltyPointsByImpactCount(impactCount: number = 0): number {
  return impactCount * IMPACT_POINTS * impactCount
}

function getFocusSessionPointsBreakdown(focusSession: FocusSession): {
  gained: number
  penalty: number
  total: number
} {
  const impactCount = countFocusSessionImpacts(focusSession.impacts)
  const pointsByTime = getFocusSessionPointsByTime(focusSession)
  const penaltyPoints = getPenaltyPointsByImpactCount(impactCount)

  return { gained: pointsByTime, penalty: penaltyPoints, total: pointsByTime - penaltyPoints }
}

function getFocusSessionsPointsBreakdown(focusSessions: FocusSession[]): {
  gained: number
  penalty: number
  total: number
} {
  return focusSessions.reduce(
    (acc, focusSession) => {
      const sessionPoints = getFocusSessionPointsBreakdown(focusSession)
      return {
        gained: acc.gained + sessionPoints.gained,
        penalty: acc.penalty + sessionPoints.penalty,
        total: acc.total + sessionPoints.total,
      }
    },
    { gained: 0, penalty: 0, total: 0 },
  )
}

export { getFocusSessionsPointsBreakdown, getFocusSessionPointsBreakdown }

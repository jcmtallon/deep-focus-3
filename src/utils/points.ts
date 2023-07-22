import { FocusSession, AstroName } from 'types'
import { BLACK_HOLE, MAX_POINTS, NEUTRON_STAR, RED_GIANT, SUPER_NOVA, WHITE_DWARF } from './points.types'
import { IMPACT_POINTS, POINTS_BY_MILLISECOND } from './focusSession.types'
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

function calculateDayProgress(points: number): number {
  return Math.min((points / MAX_POINTS) * 100, 100)
}

function calculateAstroRightPosition(width: number) {
  return {
    WHITE_DWARF: ((MAX_POINTS - WHITE_DWARF) * width) / MAX_POINTS,
    RED_GIANT: ((MAX_POINTS - RED_GIANT) * width) / MAX_POINTS,
    SUPER_NOVA: ((MAX_POINTS - SUPER_NOVA) * width) / MAX_POINTS,
    NEUTRON_STAR: ((MAX_POINTS - NEUTRON_STAR) * width) / MAX_POINTS,
    BLACK_HOLE: ((MAX_POINTS - BLACK_HOLE) * width) / MAX_POINTS,
  }
}

function calculateAchievedAstro(points: number) {
  return {
    WHITE_DWARF: points >= WHITE_DWARF,
    RED_GIANT: points >= RED_GIANT,
    SUPER_NOVA: points >= SUPER_NOVA,
    NEUTRON_STAR: points >= NEUTRON_STAR,
    BLACK_HOLE: points >= BLACK_HOLE,
  }
}

function getAstroByPoints(points: number): AstroName | null {
  if (points >= BLACK_HOLE) return 'BLACK_HOLE'
  if (points >= NEUTRON_STAR) return 'NEUTRON_STAR'
  if (points >= SUPER_NOVA) return 'SUPER_NOVA'
  if (points >= RED_GIANT) return 'RED_GIANT'
  if (points >= WHITE_DWARF) return 'WHITE_DWARF'
  return null
}

function getAstroLabel(astro: AstroName): string {
  switch (astro) {
    case 'WHITE_DWARF':
      return 'White Dwarf'
    case 'RED_GIANT':
      return 'Red Giant'
    case 'SUPER_NOVA':
      return 'Super Nova'
    case 'NEUTRON_STAR':
      return 'Neutron Star'
    case 'BLACK_HOLE':
      return 'Black Hole'
    default:
      return ''
  }
}

function checkNewlyAchievedAstro(points: number, newPoints: number): AstroName | null {
  const astro = getAstroByPoints(points)
  const newAstro = getAstroByPoints(newPoints)

  if (newAstro === null) return null
  if (astro === null) return newAstro
  return newAstro !== astro ? newAstro : null
}

function getFocusSessionsTotalPoints(focusSessions: FocusSession[]): number {
  return focusSessions.reduce((acc, focusSession) => {
    return acc + (focusSession?.points || 0)
  }, 0)
}

export {
  getFocusSessionsPointsBreakdown,
  calculateAchievedAstro,
  calculateAstroRightPosition,
  calculateDayProgress,
  checkNewlyAchievedAstro,
  getAstroLabel,
  getFocusSessionPointsBreakdown,
  getFocusSessionsTotalPoints,
}

import { AstroName } from 'types'
import { Duration } from 'luxon'
import { BLACK_HOLE, MAX_DAY_POINTS, NEUTRON_STAR, RED_GIANT, SUPER_NOVA, WHITE_DWARF } from './constants'

function calculateAstroRightPosition(width: number) {
  return {
    WHITE_DWARF: ((MAX_DAY_POINTS - WHITE_DWARF) * width) / MAX_DAY_POINTS,
    RED_GIANT: ((MAX_DAY_POINTS - RED_GIANT) * width) / MAX_DAY_POINTS,
    SUPER_NOVA: ((MAX_DAY_POINTS - SUPER_NOVA) * width) / MAX_DAY_POINTS,
    NEUTRON_STAR: ((MAX_DAY_POINTS - NEUTRON_STAR) * width) / MAX_DAY_POINTS,
    BLACK_HOLE: ((MAX_DAY_POINTS - BLACK_HOLE) * width) / MAX_DAY_POINTS,
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

const astroDurationCriteria: Record<AstroName, number> = {
  WHITE_DWARF,
  RED_GIANT,
  SUPER_NOVA,
  NEUTRON_STAR,
  BLACK_HOLE,
}

/**
 *
 */
function durationToAstro(currentDuration: Duration, targetAstro: AstroName): Duration {
  const targetDuration = Duration.fromObject({ seconds: astroDurationCriteria[targetAstro] })
  const diff = targetDuration.minus(currentDuration)
  return diff.as('milliseconds') < 0 ? Duration.fromMillis(0) : diff
}

export {
  calculateAchievedAstro,
  calculateAstroRightPosition,
  checkNewlyAchievedAstro,
  durationToAstro,
  getAstroLabel,
}

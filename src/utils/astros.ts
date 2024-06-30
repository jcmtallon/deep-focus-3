import { AstroName } from 'types'
import { Duration } from 'luxon'
import {
  SECONDS_TO_ASTRO,
  BLACK_HOLE,
  MAX_DAY_POINTS,
  NEUTRON_STAR,
  RED_GIANT,
  SUPER_NOVA,
  WHITE_DWARF,
} from './constants'

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
 * Get the next astro name in line based on the number of seconds elapsed in the current day.
 *
 * @param elapsedSeconds The number of seconds elapsed in the current day.
 * @returns AstroName. Null represents that all the astros have been achieved.
 */
function getNextAchievableAstroName(elapsedSeconds: number): AstroName | null {
  if (SECONDS_TO_ASTRO.WHITE_DWARF > elapsedSeconds) return 'WHITE_DWARF'
  if (SECONDS_TO_ASTRO.RED_GIANT > elapsedSeconds) return 'RED_GIANT'
  if (SECONDS_TO_ASTRO.SUPER_NOVA > elapsedSeconds) return 'SUPER_NOVA'
  if (SECONDS_TO_ASTRO.NEUTRON_STAR > elapsedSeconds) return 'NEUTRON_STAR'
  if (SECONDS_TO_ASTRO.BLACK_HOLE > elapsedSeconds) return 'BLACK_HOLE'
  return null
}

/**
 * Get the remaining duration necessary to achieve a given Astro.
 *
 * @returns Duration.
 */
function remainingDurationToAstro(elapsedSeconds: number, targetAstroName: AstroName): Duration {
  const targetDuration = Duration.fromObject({ seconds: astroDurationCriteria[targetAstroName] })
  const diff = targetDuration.minus(Duration.fromObject({ seconds: elapsedSeconds }))
  return diff.as('milliseconds') < 0 ? Duration.fromMillis(0) : diff
}

export {
  calculateAchievedAstro,
  calculateAstroRightPosition,
  checkNewlyAchievedAstro,
  remainingDurationToAstro,
  getAstroLabel,
  getNextAchievableAstroName,
}

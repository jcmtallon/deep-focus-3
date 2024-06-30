import { AstroName } from 'types'

/**
 * Once a focus session reaches this duration,
 * the focus session is considered 100% completed.
 */
const FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS = 7200

/**
 * Once all the focus sessions in a day reach this duration,
 * the day is considered 100% completed.
 */
const MAX_ACCOUNTABLE_SECONDS_IN_A_DAY = 36000

/**
 * Coefficient to calculate the number of seconds to penalize,
 * usually based on the number of impacts received in a session.
 */
const SECOND_PENALTY_FACTOR = 60

/**
 * Number of seconds necessary in one day (combining all the focus sessions)
 * to reach each astro.
 */
const SECONDS_TO_ASTRO: Record<AstroName, number> = {
  WHITE_DWARF: 10800,
  RED_GIANT: 18000,
  SUPER_NOVA: 24000,
  NEUTRON_STAR: 30000,
  BLACK_HOLE: MAX_ACCOUNTABLE_SECONDS_IN_A_DAY,
}

// TODO: Consider deprecating
const MAX_FOCUS_SESSION_POINTS = FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS
const IMPACT_POINTS = 60
const POINTS_BY_MILLISECOND = 0.001
const MAX_DAY_POINTS = 36000
const WHITE_DWARF = 10800
const RED_GIANT = 18000
const SUPER_NOVA = 24000
const NEUTRON_STAR = 30000
const BLACK_HOLE = MAX_DAY_POINTS

export {
  BLACK_HOLE,
  FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS,
  IMPACT_POINTS,
  MAX_DAY_POINTS,
  MAX_FOCUS_SESSION_POINTS,
  NEUTRON_STAR,
  POINTS_BY_MILLISECOND,
  RED_GIANT,
  SECOND_PENALTY_FACTOR,
  SECONDS_TO_ASTRO,
  SUPER_NOVA,
  WHITE_DWARF,
}

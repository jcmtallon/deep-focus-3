const MAX_POINTS = 36000

const WHITE_DWARF = 10800
const RED_GIANT = 18000
const SUPER_NOVA = 24000
const NEUTRON_STAR = 30000
const BLACK_HOLE = MAX_POINTS

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

export { calculateDayProgress, calculateAchievedAstro, calculateAstroRightPosition }

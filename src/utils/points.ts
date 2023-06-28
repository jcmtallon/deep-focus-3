const STAR = 10800
const RED_GIANT = 18000
const SUPER_NOVA = 25200
const NEUTRON_STAR = 28800
const BLACK_HOLE = 36000

function calculateDayPointProgress(points: number): number {
  return Math.min((points / BLACK_HOLE) * 100, 100)
}

export { calculateDayPointProgress }

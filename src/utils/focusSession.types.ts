type FocusSessionPointBreakdown = {
  pointsByTime: number
  pointsByImpacts: number
  totalPoints: number
}

const FOCUS_SESSION_MAX_ACCOUNTED_TIME = 72000

const MAX_FOCUS_SESSION_POINTS = FOCUS_SESSION_MAX_ACCOUNTED_TIME * 0.1

const IMPACT_POINTS = 72

const POINTS_BY_MILLISECOND = 0.001

export { MAX_FOCUS_SESSION_POINTS, FOCUS_SESSION_MAX_ACCOUNTED_TIME, IMPACT_POINTS, POINTS_BY_MILLISECOND }
export type { FocusSessionPointBreakdown }

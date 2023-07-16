import { calculateFocusSessionProgressBreakdown } from './focusSessionProgress'
import { MAX_FOCUS_SESSION_POINTS, IMPACT_POINTS } from './focusSession.types'

const mockPoints = {
  pointsByImpacts: 0,
  pointsByTime: 0,
  totalPoints: 0, // Not used in this method
}

describe('calculateFocusSessionProgressBreakdown', () => {
  test('all points, no impacts', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: 0,
      pointsByTime: MAX_FOCUS_SESSION_POINTS,
    })

    expect(result).toStrictEqual({ impact: 0, time: 100 })
  })

  test('half the points, no impacts', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: 0,
      pointsByTime: MAX_FOCUS_SESSION_POINTS / 2,
    })

    expect(result).toStrictEqual({ impact: 0, time: 50 })
  })

  test('no points, no impacts', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: 0,
      pointsByTime: 0,
    })

    expect(result).toStrictEqual({ impact: 0, time: 0 })
  })

  test('no points, all impacts', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -MAX_FOCUS_SESSION_POINTS,
      pointsByTime: 0,
    })

    expect(result).toStrictEqual({ impact: 0, time: 0 })
  })

  test('no points, half the impacts', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -MAX_FOCUS_SESSION_POINTS / 2,
      pointsByTime: 0,
    })

    expect(result).toStrictEqual({ impact: 0, time: 0 })
  })

  test('impact points are deducted from time points', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -IMPACT_POINTS,
      pointsByTime: MAX_FOCUS_SESSION_POINTS / 4,
    })

    expect(result).toStrictEqual({ impact: 1, time: 24 })
  })

  test('impact progress cut to 0 to fit 100 total progress', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -IMPACT_POINTS * 5 * 5,
      pointsByTime: (MAX_FOCUS_SESSION_POINTS / 4) * 5,
    })

    expect(result).toStrictEqual({ impact: 0, time: 100 })
  })

  test('impact progress cut to fit 100 total progress', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -IMPACT_POINTS * 6 * 6,
      pointsByTime: (MAX_FOCUS_SESSION_POINTS / 4) * 5,
    })

    expect(result).toStrictEqual({ impact: 11, time: 89 })
  })

  test('sum of impact progress and time progress cannot be higher than time progress without penalties', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -IMPACT_POINTS * 6 * 6,
      pointsByTime: MAX_FOCUS_SESSION_POINTS / 4,
    })

    expect(result).toStrictEqual({ impact: 25, time: 0 })
  })

  test('progress by impacts can never be bigger than progress by time', () => {
    const result = calculateFocusSessionProgressBreakdown({
      ...mockPoints,
      pointsByImpacts: -IMPACT_POINTS * 2 * 2,
      pointsByTime: IMPACT_POINTS,
    })

    expect(result).toStrictEqual({ impact: 1, time: 0 })
  })
})

import { getFocusSessionProgressWithPenalty, getFocusSessionProgress } from './focusSessionProgress'
import { MAX_FOCUS_SESSION_POINTS, IMPACT_POINTS } from './focusSession.types'

describe('getFocusSessionProgressWithPenalty', () => {
  test('0 progress when 0 points and no penalty', () => {
    const result = getFocusSessionProgressWithPenalty(0, 0)
    expect(result).toBe(0)
  })

  test('100 progress when all points and no penalty', () => {
    const result = getFocusSessionProgressWithPenalty(MAX_FOCUS_SESSION_POINTS, 0)
    expect(result).toBe(100)
  })

  test('50 progress when half points and no penalty', () => {
    const result = getFocusSessionProgressWithPenalty(MAX_FOCUS_SESSION_POINTS / 2, 0)
    expect(result).toBe(50)
  })

  test('0 progress when no points and some penalty', () => {
    const result = getFocusSessionProgressWithPenalty(0, IMPACT_POINTS * 3)
    expect(result).toBe(0)
  })

  test('positive progress when less penalty points than points', () => {
    const result = getFocusSessionProgressWithPenalty(IMPACT_POINTS * 3, IMPACT_POINTS * 2)
    expect(result).toBe(1)
  })

  test('0 progress when less points than penalty points', () => {
    const result = getFocusSessionProgressWithPenalty(IMPACT_POINTS * 1, IMPACT_POINTS * 2)
    expect(result).toBe(0)
  })
})

describe('getFocusSessionProgress', () => {
  test('0 progress when 0 points', () => {
    const result = getFocusSessionProgress(0)
    expect(result).toBe(0)
  })

  test('100 progress when all points', () => {
    const result = getFocusSessionProgress(MAX_FOCUS_SESSION_POINTS)
    expect(result).toBe(100)
  })

  test('500 progress when all points', () => {
    const result = getFocusSessionProgress(MAX_FOCUS_SESSION_POINTS / 2)
    expect(result).toBe(50)
  })

  test('cannot exceed 100 progress', () => {
    const result = getFocusSessionProgress(MAX_FOCUS_SESSION_POINTS * 2)
    expect(result).toBe(100)
  })

  test('cannot be less than 0 progress', () => {
    const result = getFocusSessionProgress(-MAX_FOCUS_SESSION_POINTS)
    expect(result).toBe(0)
  })
})

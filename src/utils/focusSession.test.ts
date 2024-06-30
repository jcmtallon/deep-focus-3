import { FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS } from './constants'
import {
  getActiveFocusSessionActualTimeProgress,
  getActiveFocusSessionCountableTimeProgress,
} from './focusSession'

describe('getActiveFocusSessionActualTimeProgress', () => {
  test('0 elapsed time returns a 0 progress value', () => {
    const result = getActiveFocusSessionActualTimeProgress(0)
    expect(result).toBe(0)
  })

  test('negative elapsed time returns a 0 progress value', () => {
    const result = getActiveFocusSessionActualTimeProgress(-60)
    expect(result).toBe(0)
  })

  test('elapsed time equal to max accounted active session time returns a 100 progress value', () => {
    const result = getActiveFocusSessionActualTimeProgress(FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS)
    expect(result).toBe(100)
  })

  test('elapsed time bigger than max accounted active session time returns a 100 progress value', () => {
    const result = getActiveFocusSessionActualTimeProgress(FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS + 60)
    expect(result).toBe(100)
  })

  test('elapsed time half the max accounted active session time returns a 50 progress value', () => {
    const result = getActiveFocusSessionActualTimeProgress(FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS / 2)
    expect(result).toBe(50)
  })
})

describe('getActiveFocusSessionCountableTimeProgress', () => {
  test('0 elapsed time & 0 penalty returns a 0 progress value', () => {
    const result = getActiveFocusSessionCountableTimeProgress(0, 0)
    expect(result).toBe(0)
  })

  test('negative elapsed time returns a 0 progress value', () => {
    const result = getActiveFocusSessionCountableTimeProgress(20, 60)
    expect(result).toBe(0)
  })

  test('penalty time is rested from elapsed time when calculating progress value', () => {
    const result = getActiveFocusSessionCountableTimeProgress(FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS, 720)
    expect(result).toBe(90)
  })

  test('penalty impact can prevent the progress value to reach 100% even when actual time surpass it', () => {
    const result = getActiveFocusSessionCountableTimeProgress(FOCUS_SESSION_MAX_ACCOUNTABLE_SECONDS + 720, 720 * 2)
    expect(result).toBe(100)
  })
})

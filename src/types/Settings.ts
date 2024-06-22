interface Settings {
  /**
   * Minutes value representing the total time
   * the user should focus depending on the day of the week.
   *
   * This value is later used in the application to:
   * - Measure the efficiency of the focus sessions during a day.
   * - Evaluate if the user has completed a day in the calendar diary view.
   * - Etc.
   *
   * - 0: Monday
   * - 1: Tuesday
   * - 2: Wednesday
   * - 3: Thursday
   * - 4: Friday
   * - 5: Saturday
   * - 6: Sunday
   */
  targetFocusDurationPerDay: Record<number, number | null>
}

export type { Settings }

interface ActiveFocusSession {
  /**
   * Start date time of the session in milliseconds.
   */
  startDate: number

  /**
   * A Record of blockedSiteIds and number of impacts received on each site.
   */
  impacts?: Record<string, number>

  /**
   * Id of the category selected for this session.
   * One session can only have one category.
   */
  categoryId?: number
}

export type { ActiveFocusSession }

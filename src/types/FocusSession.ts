import { Task } from './Task'

interface FocusSession {
  /**
   * Session's unique identifier.
   */
  sessionId: string

  /**
   * Start date time of the session in milliseconds.
   */
  startDate: number

  /**
   * End date time of the session in milliseconds.
   */
  endDate: number

  /**
   * A Record of blockedSiteIds and number of impacts received on each site.
   */
  impacts: Record<string, number>

  /**
   * Id of the category selected for this session.
   * One session can only have one category.
   */
  categoryId?: number

  /**
   * @deprecated TODO: Remove this property.
   */
  points?: number

  /**
   * @deprecated TODO: Remove this property.
   */
  tasks?: Task[]
}

export type { FocusSession }

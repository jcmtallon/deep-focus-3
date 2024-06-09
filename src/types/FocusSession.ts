import { Task } from './Task'

interface FocusSession {
  sessionId?: string
  startDate: number
  endDate?: number
  /**
   * A Record of siteIds and number of impacts received on each site.
   */
  impacts?: Record<string, number>

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
  tasks: Task[]
}

export type { FocusSession }

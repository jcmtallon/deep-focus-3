import { Task } from './Task'

interface FocusSession {
  sessionId?: string
  startDate: number
  endDate?: number
  tasks: Task[]
  impacts?: Record<string, number>
}

export type { FocusSession }

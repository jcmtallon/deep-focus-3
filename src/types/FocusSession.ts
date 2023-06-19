import { Task } from './Task'

interface FocusSession {
  sessionId?: string
  startDate: number
  endDate?: number
  tasks: Task[]
  impacts?: Record<string, number>
  points?: number
}

export type { FocusSession }

import { Task } from './Task'

interface FocusSession {
  sessionId?: string
  startDate: number
  endDate?: number
  tasks: Task[]
  stats: { impacts: number }
}

export type { FocusSession }

import { Task } from './Task'

interface Session {
  sessionId?: string
  startDateIso: string
  endDateIso?: string
  tasks: Task[]
  stats: { impacts: number }
}

export type { Session }

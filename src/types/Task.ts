const TaskStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const

type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

interface Task {
  id: string
  title: string
  status: TaskStatus
}

export { TaskStatus }
export type { Task }

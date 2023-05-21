import React from 'react'
import { Task } from 'types'

interface FocusModeTasksProps {
  tasks?: Task[]
  onChange: (tasks: Task[]) => void
}

function FocusModeTasks(props: FocusModeTasksProps) {
  const { tasks = [], onChange } = props

  const handleTaskChange = (task: Task) => {
    onChange?.(
      tasks.map(t =>
        t.id === task.id ? { ...t, status: t.status === 'PENDING' ? 'COMPLETED' : 'PENDING' } : t,
      ),
    )
  }

  return (
    <div>
      {tasks.map(t => (
        <div key={t.id}>
          <input
            type="checkbox"
            id={t.id}
            checked={t.status === 'COMPLETED'}
            onChange={() => handleTaskChange(t)}
          />
          <label htmlFor={t.id}>{t.title}</label>
        </div>
      ))}
    </div>
  )
}

export { FocusModeTasks }
export type { FocusModeTasksProps }

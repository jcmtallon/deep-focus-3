import React, { useMemo } from 'react'
import { FocusSession, Task } from 'types'
import * as S from './MissionControlTasks.styles'

interface MissionControlTasksProps {
  focusSessions: FocusSession[]
}

function MissionControlTasks(props: MissionControlTasksProps) {
  const { focusSessions } = props

  const tasks: Task[] = useMemo(
    () => focusSessions.flatMap(focusSession => focusSession.tasks.map(t => t)),
    [focusSessions],
  )

  return (
    <>
      <S.List>
        {tasks.map(task => (
          <S.ListItem key={task.id}>
            <input type="checkbox" id={task.id} checked />
            <label htmlFor={task.id}>{task.title}</label>
          </S.ListItem>
        ))}
      </S.List>
      <S.Counter>{tasks.length} tasks</S.Counter>
    </>
  )
}

export { MissionControlTasks }

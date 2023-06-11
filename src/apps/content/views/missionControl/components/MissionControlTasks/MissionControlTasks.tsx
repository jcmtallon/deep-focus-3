import React from 'react'
import { FocusSession } from 'types'
import * as S from './MissionControlTasks.styles'

interface MissionControlTasksProps {
  focusSessions: FocusSession[]
}

function MissionControlTasks(props: MissionControlTasksProps) {
  const { focusSessions } = props
  return (
    <S.List>
      {focusSessions.flatMap(focusSession =>
        focusSession.tasks.map(task => (
          <S.ListItem key={task.id}>
            <input type="checkbox" id={task.id} checked />
            <label htmlFor={task.id}>{task.title}</label>
          </S.ListItem>
        )),
      )}
    </S.List>
  )
}

export { MissionControlTasks }

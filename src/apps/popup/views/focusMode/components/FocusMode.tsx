import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { FocusSession, Task } from 'types'
import { getActiveFocusSession, getFocusSessionsByDay } from 'services/focusSessions'
import { DateTime } from 'luxon'
import { FocusModeLayout } from './FocusModeLayout'
import { FocusModesStats } from './FocusModeStats/FocusModeStats'
import { FocusModeActions } from './FocusModeActions/FocusModeActions'
import { FocusModeTasks } from './FocusModeTasks/FocusModeTasks'

// TODO: Try to use FocusSession instead of Session or FocusMode

function FocusMode() {
  const [activeFocusSession, setActiveFocusSession] = useState<FocusSession | null | undefined>(undefined)
  const [completedSessions, setCompletedSessions] = useState<FocusSession[]>([])

  const isFocusSessionOn = Boolean(activeFocusSession)
  const isFirstLoadCompleted = activeFocusSession !== undefined

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const activeFocusSession = await getActiveFocusSession()
      const completedSessions = await getFocusSessionsByDay(DateTime.now())
      setCompletedSessions(completedSessions)
      setActiveFocusSession(activeFocusSession ?? null)
    }
    getFocusModeStatus()
  }, [])

  const handleStartSession = async (taskTitle: string) => {
    const response = await sendMessage('startFocusMode', { taskTitle })
    if (!response) return // TODO: handle possible error
    setActiveFocusSession(response as FocusSession)
  }

  const handleAbortSession = async () => {
    sendMessage('stopFocusMode')
    setActiveFocusSession(null)
  }

  const handleExtendSession = async (taskTitle: string) => {
    const response = await sendMessage('extendFocusSession', { taskTitle })
    if (!response) return // TODO: handle possible error
    setActiveFocusSession(response as FocusSession)
  }

  const handleFinishSession = async (finishedSession: FocusSession) => {
    await sendMessage('finishFocusSession', { session: finishedSession })
    const completedSessions = await getFocusSessionsByDay(DateTime.now())
    setCompletedSessions(completedSessions)
    setActiveFocusSession(null)
  }

  const handleTaskStatusChange = async (tasks: Task[]) => {
    const response = await sendMessage('updateTasks', { tasks })
    if (!response) return // TODO: handle possible error
    setActiveFocusSession(prev => (prev ? { ...prev, tasks } : prev))
  }

  return (
    <PageLayout
      header={<Header />}
      footer={
        <FooterNav activeElement="focusMode" asteroidButtonProps={{ disabled: isFocusSessionOn === true }} />
      }>
      {isFirstLoadCompleted && (
        <FocusModeLayout
          topSlot={
            <FocusModesStats activeFocusSession={activeFocusSession} completedSessions={completedSessions} />
          }
          centerSlot={<FocusModeTasks tasks={activeFocusSession?.tasks} onChange={handleTaskStatusChange} />}
          bottomSlot={
            <FocusModeActions
              session={activeFocusSession ?? undefined}
              onStartSession={handleStartSession}
              onAbortSession={handleAbortSession}
              onExtendSession={handleExtendSession}
              onFinishSession={handleFinishSession}
            />
          }
        />
      )}
    </PageLayout>
  )
}

export { FocusMode }

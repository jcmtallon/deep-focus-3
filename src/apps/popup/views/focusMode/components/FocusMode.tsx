import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { getFocusModeDetails } from 'services/localStorage'
import { FocusSession, Task } from 'types'
import { addFocusSession } from 'services/focusSessions'
import { FocusModeLayout } from './FocusModeLayout'
import { FocusModesStats } from './FocusModeStats/FocusModeStats'
import { FocusModeActions } from './FocusModeActions/FocusModeActions'
import { FocusModeTasks } from './FocusModeTasks/FocusModeTasks'

// TODO: Try to use FocusSession instead of Session or FocusMode

function FocusMode() {
  const [focusSession, setFocusSession] = useState<FocusSession | null>(null)
  const [isFocusModeOn, setIsFocusModeOn] = useState<boolean | null>(null)

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const session = await getFocusModeDetails()
      const focusModeOn = session !== undefined
      setIsFocusModeOn(focusModeOn)
      if (focusModeOn) setFocusSession(session as FocusSession)
    }
    getFocusModeStatus()
  }, [])

  const handleStartSession = async (taskTitle: string) => {
    const response = await sendMessage('startFocusMode', { taskTitle })
    if (!response) return // TODO: handle possible error
    setIsFocusModeOn(true)
    setFocusSession(response as FocusSession)
  }

  const handleAbortSession = async () => {
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
    setFocusSession(null)
  }

  const handleExtendSession = async (taskTitle: string) => {
    const response = await sendMessage('extendFocusSession', { taskTitle })
    if (!response) return // TODO: handle possible error
    setFocusSession(response as FocusSession)
  }

  const handleFinishSession = async () => {
    // TODO: Everything that is creating, must be delegated to the BE.
    // TODO: Consuming can be done via Store
    addFocusSession(focusSession!)
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
    setFocusSession(null)
    // Stop focus mode.
    // Store info in database.
  }

  const handleTaskStatusChange = async (tasks: Task[]) => {
    const response = await sendMessage('updateTasks', { tasks })
    if (!response) return // TODO: handle possible error
    setFocusSession(prev => (prev ? { ...prev, tasks } : prev))
  }

  return (
    <PageLayout
      header={<Header />}
      footer={
        <FooterNav activeElement="focusMode" asteroidButtonProps={{ disabled: isFocusModeOn === true }} />
      }>
      {isFocusModeOn !== null && (
        <FocusModeLayout
          topSlot={
            <FocusModesStats
              taskCount={focusSession?.tasks.filter(t => t.status === 'COMPLETED').length}
              focusModeActive={isFocusModeOn}
              sessionStart={focusSession?.startDate ?? undefined}
            />
          }
          centerSlot={<FocusModeTasks tasks={focusSession?.tasks} onChange={handleTaskStatusChange} />}
          bottomSlot={
            <FocusModeActions
              session={focusSession ?? undefined}
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

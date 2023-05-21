import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { getFocusModeDetails } from 'services/store'
import { Session, Task } from 'types'
import { addSession } from 'services/sessions'
import { FocusModeLayout } from './FocusModeLayout'
import { FocusModesStats } from './FocusModeStats/FocusModeStats'
import { FocusModeActions } from './FocusModeActions/FocusModeActions'
import { FocusModeTasks } from './FocusModeTasks/FocusModeTasks'

// TODO: Try to use FocusSession instead of Session or FocusMode

function FocusMode() {
  const [activeSession, setActiveSession] = useState<Session | null>(null)
  const [isFocusModeOn, setIsFocusModeOn] = useState<boolean | null>(null)

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const session = await getFocusModeDetails()
      const focusModeOn = session !== undefined
      setIsFocusModeOn(focusModeOn)
      if (focusModeOn) setActiveSession(session as Session)
    }
    getFocusModeStatus()
  }, [])

  const handleStartSession = async (taskTitle: string) => {
    const response = await sendMessage('startFocusMode', { taskTitle })
    if (!response) return // TODO: handle possible error
    setIsFocusModeOn(true)
    setActiveSession(response as Session)
  }

  const handleAbortSession = async () => {
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
    setActiveSession(null)
  }

  const handleExtendSession = async (taskTitle: string) => {
    const response = await sendMessage('extendFocusSession', { taskTitle })
    if (!response) return // TODO: handle possible error
    setActiveSession(response as Session)
  }

  const handleFinishSession = async () => {
    // Temp
    addSession(activeSession!)
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
    setActiveSession(null)
    // Stop focus mode.
    // Store info in database.
  }

  const handleTaskStatusChange = async (tasks: Task[]) => {
    const response = await sendMessage('updateTasks', { tasks })
    if (!response) return // TODO: handle possible error
    setActiveSession(prev => (prev ? { ...prev, tasks } : prev))
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
              taskCount={activeSession?.tasks.filter(t => t.status === 'COMPLETED').length}
              focusModeActive={isFocusModeOn}
              sessionStartDateIso={activeSession?.startDateIso ?? undefined}
            />
          }
          centerSlot={<FocusModeTasks tasks={activeSession?.tasks} onChange={handleTaskStatusChange} />}
          bottomSlot={
            <FocusModeActions
              session={activeSession ?? undefined}
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

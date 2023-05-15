import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { getFocusModeDetails } from 'services/store'
import { FocusModeLayout } from './FocusModeLayout'
import { FocusModesStats } from './FocusModeStats/FocusModeStats'
import { FocusModeActions } from './FocusModeActions/FocusModeActions'
import { FocusModeTasks } from './FocusModeTasks/FocusModeTasks'

// TODO: Decide where common types should go
interface Task {
  id: string
  title: string
  status: 'PENDING' | 'COMPLETED'
}

function FocusMode() {
  const [isFocusModeOn, setIsFocusModeOn] = useState<boolean | null>(null)
  const [startDateIso, setStartDateIso] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const focusModeDetails = await getFocusModeDetails()
      setIsFocusModeOn(focusModeDetails !== undefined)
    }
    getFocusModeStatus()
  }, [])

  const handleStartFocusClick = async (taskTitle: string) => {
    // TODO: Properly type sendMessage response
    const response: any = await sendMessage('startFocusMode', { taskTitle })
    if (!response) return
    setIsFocusModeOn(true)
    setStartDateIso(response.startDateIso)
    setTasks(response.tasks as Task[])
  }

  const handleEndFocusClick = () => {
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
    setStartDateIso(null)
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
              taskCount={tasks.length}
              focusModeActive={isFocusModeOn}
              sessionStartDateIso={startDateIso ?? undefined}
            />
          }
          centerSlot={<FocusModeTasks tasks={tasks} onChange={tasks => setTasks(tasks)} />}
          bottomSlot={
            <FocusModeActions
              focusModeActive={isFocusModeOn}
              onAbortFocusMode={handleEndFocusClick}
              onFocusModeStart={handleStartFocusClick}
            />
          }
        />
      )}
    </PageLayout>
  )
}

export { FocusMode }

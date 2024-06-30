import React, { useCallback, useEffect, useState } from 'react'
import { ActiveFocusSession, FocusSession } from 'types'
import { sendMessage } from 'services/actions'
import { getActiveFocusSession, getFocusSessionsByDay } from 'services/focusSessions'
import { DateTime } from 'luxon'
import { FocusControlsActiveSession } from './FocusControlsActiveSession'
import { FocusControlsIdle } from './FocusControlsIdle'
import { FocusControlsSkeleton } from './FocusControlsSkeleton'

function FocusControls() {
  /**
   * Undefined: initial state. Haven't checked if there is an ongoing focus session.
   * Null: No ongoing focus session. Confirmed by the store.
   * ActiveFocusSession: Ongoing focus session. Present in the local store, but not in the indexed database.
   */
  const [activeFocusSession, setActiveFocusSession] = useState<ActiveFocusSession | null | undefined>(
    undefined,
  )

  /**
   * Completed focus session in the current day
   */
  const [focusSessions, setFocusSessions] = useState<FocusSession[] | undefined>(undefined)

  /**
   * Undefined: No data fetched yet, or no category selected in the store.
   */
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined)

  /**
   * Starts a new focus session and stores it in the local store,
   * so we can close the popup and keep the session running.
   */
  const handleStartSession = async () => {
    // TODO: Type response
    const response = await sendMessage('startFocusMode', { categoryId: selectedCategoryId })
    if (!response) return // TODO: handle possible error
    // handlePlayBackgroundAudio()
    setActiveFocusSession(response as ActiveFocusSession)
  }

  /**
   * Starts a new focus session and stores it in the local store.
   */
  const handleFinishSession = async (session: ActiveFocusSession) => {
    // TODO: This is an incomplete implementation. We need to calculate the points.
    const finishedSession: Omit<FocusSession, 'sessionId'> = {
      ...session,
      impacts: session.impacts ?? {},
      endDate: new Date().getTime(),
    }
    await sendMessage('finishFocusSession', {
      session: { ...finishedSession, points: 0 },
    })

    setActiveFocusSession(null)
  }

  /**
   * Updates the category of the active focus session.
   * @param categoryId
   */
  const handleMidSessionCategoryIdChange = useCallback(async (categoryId: number | undefined) => {
    setSelectedCategoryId(categoryId)
    const res = await sendMessage('updateActiveFocusSessionCategory', { categoryId })
    if (!res) return // TODO: handle possible error
    setActiveFocusSession(res as ActiveFocusSession)
    setSelectedCategoryId(categoryId)
  }, [])

  const fetchFocusSessions = useCallback(async () => {
    const completedSessions = await getFocusSessionsByDay(DateTime.now())
    setFocusSessions(completedSessions)
  }, [])

  const fetchActiveFocusSession = useCallback(async () => {
    const activeFocusSession = await getActiveFocusSession()
    setActiveFocusSession(activeFocusSession ?? null)
  }, [])

  // Fetch initial data
  useEffect(() => {
    fetchActiveFocusSession()
    fetchFocusSessions()
  }, [fetchActiveFocusSession, fetchFocusSessions])

  if (!focusSessions) {
    return <FocusControlsSkeleton />
  }

  return activeFocusSession ? (
    <FocusControlsActiveSession
      categoryId={selectedCategoryId}
      focusSessions={focusSessions}
      onCategoryIdChange={handleMidSessionCategoryIdChange}
      onFinishSessionClick={handleFinishSession}
      activeFocusSession={activeFocusSession}
    />
  ) : (
    <FocusControlsIdle
      categoryId={selectedCategoryId}
      focusSessions={focusSessions}
      onCategoryIdChange={id => setSelectedCategoryId(id)}
      onStartSessionClick={handleStartSession}
    />
  )
}

export { FocusControls }

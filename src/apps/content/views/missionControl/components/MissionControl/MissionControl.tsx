import React, { useCallback, useEffect, useState } from 'react'
import { getActiveFocusSession as storeGetActiveFocusSession } from 'services/store'
import { Category, FocusSession } from 'types'
import { listCategories } from 'services/categories'
import { MissionControlFocusMode } from './MissionControlFocusMode'
import { MissionControlDashboard } from './MissionControlDashboard'

function MissionControl() {
  const [activeFocusSession, setActiveFocusSession] = useState<FocusSession | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const isFocusSessionOn = Boolean(activeFocusSession)

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }
    fetchCategoryData()
  }, [])

  const getActiveFocusSession = useCallback(async () => {
    const session = await storeGetActiveFocusSession()
    setActiveFocusSession(session ?? null)
  }, [])

  useEffect(() => {
    getActiveFocusSession()
  }, [getActiveFocusSession])

  // FIXME: The switch between both modes is too abrupt. We should add a transition.

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
      if (request.message === 'focusModeOn') {
        const session = await storeGetActiveFocusSession()
        setActiveFocusSession(session ?? null)
      }
      if (request.message === 'focusModeOff') setActiveFocusSession(null)
    })
  }, [setActiveFocusSession])

  // FIXME: Add loading state display

  if (isFocusSessionOn && activeFocusSession) {
    return <MissionControlFocusMode activeFocusSession={activeFocusSession} />
  }

  return <MissionControlDashboard categories={categories} />
}

export { MissionControl }

import { indexedDb } from 'services/indexedDb'
import { LOCAL_STORAGE_KEY, readLocalStorage, removeStorage, setLocalStorage } from 'services/localStorage'
import { FocusSession } from 'types'

const { ACTIVE_FOCUS_SESSION } = LOCAL_STORAGE_KEY

async function getActiveFocusSession(): Promise<FocusSession | undefined> {
  const activeFocusSession = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  return activeFocusSession !== undefined ? JSON.parse(activeFocusSession as string) : undefined
}

async function addFocusSession(session: FocusSession): Promise<FocusSession> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.add({ ...session, endDate: new Date().getTime() })
  return response
}

async function addImpactToActiveFocusSessions(): Promise<FocusSession> {
  const response = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  if (!response) throw new Error('No active focus session found')
  const existingSession = JSON.parse(response as string) as FocusSession
  const payload: FocusSession = {
    ...existingSession,
    stats: { impacts: existingSession.stats.impacts + 1 },
  }
  await setLocalStorage({ [ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function listFocusSessions(): Promise<FocusSession[]> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.list()
  return response
}

async function getFocusSessionsByDay(date: Date): Promise<FocusSession[]> {
  const start = new Date(date.getTime())
  start.setUTCHours(0, 0, 0, 0)

  const end = new Date(date.getTime())
  end.setUTCHours(23, 59, 59, 999)

  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.query(start.getTime(), end.getTime())
  return response
}

async function finishFocusSession(): Promise<boolean> {
  try {
    await removeStorage(LOCAL_STORAGE_KEY.ACTIVE_FOCUS_SESSION)
    return true
  } catch (_) {
    throw new Error('Failed to remove active focus session from local storage')
  }
}

export {
  addImpactToActiveFocusSessions,
  addFocusSession,
  finishFocusSession,
  getActiveFocusSession,
  getFocusSessionsByDay,
  listFocusSessions,
}

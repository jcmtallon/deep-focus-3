import { indexedDb } from 'services/indexedDb'
import { LOCAL_STORAGE_KEY, readLocalStorage, removeStorage } from 'services/localStorage'
import { FocusSession } from 'types'

const { ACTIVE_FOCUS_SESSION } = LOCAL_STORAGE_KEY

async function getActiveFocusSession(): Promise<FocusSession | undefined> {
  const focusMode = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  return focusMode !== undefined ? JSON.parse(focusMode as string) : undefined
}

async function addFocusSession(session: FocusSession): Promise<FocusSession> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.add({ ...session, endDate: new Date().getTime() })
  return response
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
  addFocusSession,
  finishFocusSession,
  getActiveFocusSession,
  getFocusSessionsByDay,
  listFocusSessions,
}

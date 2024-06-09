import { indexedDb } from 'services/indexedDb'
import { LOCAL_STORAGE_KEY, readLocalStorage, removeStorage, setLocalStorage } from 'services/localStorage'
import { Category, FocusSession, Task } from 'types'
import { DateTime } from 'luxon'

const { ACTIVE_FOCUS_SESSION } = LOCAL_STORAGE_KEY

async function startActiveFocusSessions(props: { category: Category | undefined }): Promise<FocusSession> {
  const payload: FocusSession = {
    startDate: new Date().getTime(),
    categoryId: props.category?.id,
    // FIXME: deprecate tasks
    tasks: [],
  }

  await setLocalStorage({ [ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function getActiveFocusSession(): Promise<FocusSession | undefined> {
  const activeFocusSession = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  return activeFocusSession !== undefined ? JSON.parse(activeFocusSession as string) : undefined
}

async function updateActiveFocusSessionTasks(props: { tasks: Task[] }) {
  const response = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  if (!response) throw new Error('No active focus session found')
  const existingSession = JSON.parse(response as string) as FocusSession
  const payload: FocusSession = {
    ...existingSession,
    tasks: props.tasks,
  }
  await setLocalStorage({ [ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function addTaskToActiveFocusSessions(props: { taskTitle: string }) {
  const response = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  if (!response) throw new Error('No active focus session found')
  const existingSession = JSON.parse(response as string) as FocusSession
  const payload: FocusSession = {
    ...existingSession,
    tasks: [...existingSession.tasks, { id: crypto.randomUUID(), title: props.taskTitle, status: 'PENDING' }],
  }

  await setLocalStorage({ [ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function addImpactToActiveFocusSessions(siteId: string): Promise<FocusSession> {
  const response = await readLocalStorage(ACTIVE_FOCUS_SESSION)
  if (!response) throw new Error('No active focus session found')
  const existingSession = JSON.parse(response as string) as FocusSession
  const payload: FocusSession = {
    ...existingSession,
    impacts: { ...existingSession.impacts, [siteId]: (existingSession.impacts?.[siteId] || 0) + 1 },
  }
  await setLocalStorage({ [ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function finishActiveFocusSession(): Promise<boolean> {
  try {
    await removeStorage(LOCAL_STORAGE_KEY.ACTIVE_FOCUS_SESSION)
    return true
  } catch (_) {
    throw new Error('Failed to remove active focus session from local storage')
  }
}

// ---------------------------------------------------------------------------------------------

async function addFocusSession(session: FocusSession): Promise<FocusSession> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.add(session)
  return response
}

async function listFocusSessions(): Promise<FocusSession[]> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.list()
  return response
}

async function getFocusSessionsByDay(date: DateTime): Promise<FocusSession[]> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.query(
    date.startOf('day').toMillis(),
    date.endOf('day').toMillis(),
  )
  return response
}

async function getFocusSessionsByDateRange(startDate: DateTime, endDate: DateTime): Promise<FocusSession[]> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.query(
    startDate.startOf('day').toMillis(),
    endDate.endOf('day').toMillis(),
  )
  return response
}

export {
  addFocusSession,
  addImpactToActiveFocusSessions,
  addTaskToActiveFocusSessions,
  finishActiveFocusSession,
  getActiveFocusSession,
  getFocusSessionsByDateRange,
  getFocusSessionsByDay,
  listFocusSessions,
  startActiveFocusSessions,
  updateActiveFocusSessionTasks,
}

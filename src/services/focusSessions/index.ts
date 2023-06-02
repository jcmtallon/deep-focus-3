import { indexedDb } from 'services/indexedDb'
import { LOCAL_STORAGE_KEY, readLocalStorage, removeStorage, setLocalStorage } from 'services/localStorage'
import { FocusSession, Task } from 'types'
import { uniqueId } from 'lodash'

const { ACTIVE_FOCUS_SESSION } = LOCAL_STORAGE_KEY

async function startActiveFocusSessions(props: { taskTitle: string }): Promise<FocusSession> {
  const payload: FocusSession = {
    startDate: new Date().getTime(),
    tasks: [{ id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
    stats: { impacts: 0 },
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
    tasks: [...existingSession.tasks, { id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
  }

  await setLocalStorage({ [ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
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

export {
  addFocusSession,
  addImpactToActiveFocusSessions,
  addTaskToActiveFocusSessions,
  finishActiveFocusSession,
  getActiveFocusSession,
  getFocusSessionsByDay,
  listFocusSessions,
  updateActiveFocusSessionTasks,
  startActiveFocusSessions,
}

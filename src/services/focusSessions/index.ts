import { indexedDb } from 'services/store'
import { FocusSession } from 'types'

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

export { addFocusSession, listFocusSessions, getFocusSessionsByDay }

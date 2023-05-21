import { indexedDb } from 'services/store'
import { FocusSession } from 'types'

async function addSession(session: FocusSession): Promise<FocusSession> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.add(session)
  return response
}

async function ListSessions(): Promise<FocusSession[]> {
  const database = await indexedDb.getInstance()
  const response = await database.focusSessions.list()
  return response
}

export { addSession, ListSessions }

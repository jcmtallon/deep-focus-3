import { indexedDb } from 'services/store'
import { Session } from 'types'

async function addSession(session: Session): Promise<Session> {
  const database = await indexedDb.getInstance()
  const sessions = await database.sessions.add(session)
  return sessions
}

async function ListSessions(): Promise<Session[]> {
  const database = await indexedDb.getInstance()
  const sessions = await database.sessions.list()
  return sessions
}

export { addSession, ListSessions }

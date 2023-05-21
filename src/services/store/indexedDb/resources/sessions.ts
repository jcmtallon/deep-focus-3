import { Session } from 'types'
import { COLLECTION_NAME } from '../constants'

const { SESSIONS } = COLLECTION_NAME

const addSession =
  (db: IDBDatabase) =>
  (session: Session): Promise<Session> => {
    const request = db.transaction(SESSIONS, 'readwrite').objectStore(SESSIONS).add(session)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve({
          ...session,
          sessionId: request.result.toString(),
        })
      }
      request.onerror = e => {
        reject(e)
      }
    })
  }

const listSessions = (db: IDBDatabase) => (): Promise<Session[]> => {
  const request = db.transaction(SESSIONS, 'readonly').objectStore(SESSIONS).getAll()

  return new Promise((resolve, reject) => {
    request.onsuccess = event => {
      if (!(event.target instanceof IDBRequest)) {
        reject(request.error)
        return
      }
      resolve(event.target.result)
    }
    request.onerror = e => {
      reject(e)
    }
  })
}

interface SessionEndpoints {
  add: (session: Session) => Promise<Session>
  list: () => Promise<Session[]>
}

export { addSession, listSessions }
export type { SessionEndpoints }

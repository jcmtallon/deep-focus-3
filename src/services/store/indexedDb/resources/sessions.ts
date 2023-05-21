import { FocusSession } from 'types'
import { COLLECTION_NAME } from '../constants'

const { FOCUS_SESSIONS } = COLLECTION_NAME

const addFocusSession =
  (db: IDBDatabase) =>
  (focusSession: FocusSession): Promise<FocusSession> => {
    const request = db.transaction(FOCUS_SESSIONS, 'readwrite').objectStore(FOCUS_SESSIONS).add(focusSession)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve({
          ...focusSession,
          sessionId: request.result.toString(),
        })
      }
      request.onerror = e => {
        reject(e)
      }
    })
  }

const listFocusSessions = (db: IDBDatabase) => (): Promise<FocusSession[]> => {
  const request = db.transaction(FOCUS_SESSIONS, 'readonly').objectStore(FOCUS_SESSIONS).getAll()

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

// const querySessions = (db: IDBDatabase) => (fromDateIso: string, toDateIso: string): Promise<Session[]> => {
//   const objectStore = db.transaction(SESSIONS, 'readonly').objectStore(SESSIONS)
//   const index = store.index("created");

// }

interface SessionEndpoints {
  add: (focusSession: FocusSession) => Promise<FocusSession>
  list: () => Promise<FocusSession[]>
}

export { addFocusSession, listFocusSessions }
export type { SessionEndpoints }

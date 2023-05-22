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

const queryFocusSessions =
  (db: IDBDatabase) =>
  (fromDate: number, toDate: number): Promise<FocusSession[]> => {
    const objectStore = db.transaction(FOCUS_SESSIONS, 'readonly').objectStore(FOCUS_SESSIONS)
    const index = objectStore.index('startDate')
    const range = IDBKeyRange.bound(fromDate, toDate)

    return new Promise((resolve, reject) => {
      const sessions: FocusSession[] = []

      index.openCursor(range).onsuccess = event => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          sessions.push(cursor.value)
          cursor.continue()
        } else {
          resolve(sessions)
        }
      }

      index.openCursor(range).onerror = e => {
        reject(e)
      }
    })
  }

interface SessionEndpoints {
  add: (focusSession: FocusSession) => Promise<FocusSession>
  list: () => Promise<FocusSession[]>
  query: (fromDate: number, toDate: number) => Promise<FocusSession[]>
}

export { addFocusSession, listFocusSessions, queryFocusSessions }
export type { SessionEndpoints }

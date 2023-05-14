import { addBlockedSite } from './blockedSites'
import { COLLECTION_NAME, DATABASE_NAME } from './constants'
import { DatabaseError } from './utils'

function database() {
  let db: IDBDatabase | null = null

  const createDatabase = () => {
    const request = indexedDB.open(DATABASE_NAME)

    request.onerror = event => {
      throw new DatabaseError(event)
    }

    request.onupgradeneeded = event => {
      if (!(event.target instanceof IDBOpenDBRequest)) return
      db = event.target.result
      const objectStore = db.createObjectStore(COLLECTION_NAME.BLOCKED_SITES, {
        keyPath: 'id',
        autoIncrement: true,
      })
      objectStore.transaction.oncomplete = event => {
        if (!(event.target instanceof IDBOpenDBRequest)) return
        db = event.target.result
      }
    }

    request.onsuccess = event => {
      if (!(event.target instanceof IDBOpenDBRequest)) return
      db = event.target.result
      db.onerror = event => {
        throw new DatabaseError(event)
      }
    }
  }

  return {
    init: () => {
      createDatabase()
    },

    blockedSites: {
      add: addBlockedSite(db!),
      list: () => {},
      delete: () => {},
      update: () => {},
    },
  }
}

export { database }

import {
  BlockedSiteEndpoints,
  addBlockedSite,
  deleteBlockedSite,
  listBlockedSites,
} from './resources/blockedSites'
import { addSession, listSessions, SessionEndpoints } from './resources/sessions'
import { COLLECTION_NAME, DATABASE_NAME } from './constants'

interface IndexedDbInstance {
  blockedSites: BlockedSiteEndpoints
  sessions: SessionEndpoints
}

interface IndexedDb {
  getInstance: () => Promise<IndexedDbInstance>
}

const indexedDb = (function (): IndexedDb {
  let instance: IndexedDbInstance | null = null

  async function init(): Promise<IndexedDbInstance> {
    let db: IDBDatabase | null = null

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, 2)

      request.onerror = event => {
        reject(event)
      }

      request.onupgradeneeded = event => {
        console.log('onupgradeneeded', event)

        if (!(event.target instanceof IDBOpenDBRequest)) return
        db = event.target.result

        if (!db.objectStoreNames.contains(COLLECTION_NAME.BLOCKED_SITES)) {
          db.createObjectStore(COLLECTION_NAME.BLOCKED_SITES, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }

        console.log('session exists', db.objectStoreNames.contains(COLLECTION_NAME.SESSIONS))
        if (!db.objectStoreNames.contains(COLLECTION_NAME.SESSIONS)) {
          console.log('creating session')
          db.createObjectStore(COLLECTION_NAME.SESSIONS, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
      }

      request.onsuccess = event => {
        if (!(event.target instanceof IDBOpenDBRequest)) return
        db = event.target.result

        resolve({
          blockedSites: {
            add: addBlockedSite(db),
            list: listBlockedSites(db),
            delete: deleteBlockedSite(db),
          },
          sessions: {
            add: addSession(db),
            list: listSessions(db),
          },
        })
      }
    })
  }

  return {
    getInstance: async () => {
      if (instance === null) {
        instance = await init()
      }
      return instance
    },
  }
})()

export { indexedDb }

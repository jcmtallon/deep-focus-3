import {
  BlockedSiteEndpoints,
  addBlockedSite,
  deleteBlockedSite,
  listBlockedSites,
  addImpactToBlockedSite,
  addImpactsToBlockedSitesInBulk,
} from './resources/blockedSites'
import {
  addFocusSession,
  listFocusSessions,
  queryFocusSessions,
  SessionEndpoints,
} from './resources/focusSessions'
import { COLLECTION_NAME, DATABASE_NAME } from './constants'

const { BLOCKED_SITES, FOCUS_SESSIONS } = COLLECTION_NAME

interface IndexedDbInstance {
  blockedSites: BlockedSiteEndpoints
  focusSessions: SessionEndpoints
}

interface IndexedDb {
  getInstance: () => Promise<IndexedDbInstance>
}

const indexedDb = (function (): IndexedDb {
  let instance: IndexedDbInstance | null = null

  async function init(): Promise<IndexedDbInstance> {
    let db: IDBDatabase | null = null

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, 1)

      request.onerror = event => {
        reject(event)
      }

      request.onupgradeneeded = event => {
        if (!(event.target instanceof IDBOpenDBRequest)) return
        db = event.target.result

        if (!db.objectStoreNames.contains(BLOCKED_SITES)) {
          db.createObjectStore(BLOCKED_SITES, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }

        if (!db.objectStoreNames.contains(FOCUS_SESSIONS)) {
          const sessionStore = db.createObjectStore(FOCUS_SESSIONS, {
            keyPath: 'id',
            autoIncrement: true,
          })
          sessionStore.createIndex('startDate', 'startDate', { unique: false })
        }
      }

      request.onsuccess = event => {
        if (!(event.target instanceof IDBOpenDBRequest)) return
        db = event.target.result

        resolve({
          blockedSites: {
            add: addBlockedSite(db),
            addImpact: addImpactToBlockedSite(db),
            addImpactsInBulk: addImpactsToBlockedSitesInBulk(db),
            list: listBlockedSites(db),
            delete: deleteBlockedSite(db),
          },
          focusSessions: {
            add: addFocusSession(db),
            list: listFocusSessions(db),
            query: queryFocusSessions(db),
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

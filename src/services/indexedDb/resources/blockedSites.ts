import { BlockedSite } from 'types'
import { COLLECTION_NAME } from '../constants'

const { BLOCKED_SITES } = COLLECTION_NAME

const addBlockedSite = (db: IDBDatabase) => (urlFilter: string) => {
  const transaction = db.transaction(BLOCKED_SITES, 'readwrite')
  const objectStore = transaction.objectStore(BLOCKED_SITES)

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve(true)
    }

    transaction.onerror = e => {
      reject(e)
    }

    objectStore.add({ url: urlFilter })
  })
}

const listBlockedSites = (db: IDBDatabase) => (): Promise<BlockedSite[]> => {
  const transaction = db.transaction(BLOCKED_SITES, 'readonly')
  const objectStore = transaction.objectStore(BLOCKED_SITES)

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {}
    transaction.onerror = e => {
      reject(e)
    }

    const request = objectStore.getAll()
    request.onsuccess = function (event) {
      if (!(event.target instanceof IDBRequest)) return
      resolve(event.target.result)
    }
  })
}

const deleteBlockedSite = (db: IDBDatabase) => (id: number) => {
  const request = db.transaction(BLOCKED_SITES, 'readwrite').objectStore(BLOCKED_SITES).delete(id)
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(true)
    }
    request.onerror = e => {
      reject(e)
    }
  })
}

const addImpactToBlockedSite =
  (db: IDBDatabase) =>
  (blockedSiteId: number): Promise<void> => {
    const objectStore = db.transaction(BLOCKED_SITES, 'readwrite').objectStore(BLOCKED_SITES)
    const request = objectStore.get(blockedSiteId)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const blockedSite = request.result
        blockedSite.impactCount = blockedSite.impactCount ? blockedSite.impactCount + 1 : 1

        const updateRequest = objectStore.put(blockedSite)
        updateRequest.onsuccess = () => {
          resolve()
        }
      }

      // Error handling
    })
  }

const addImpactsToBlockedSitesInBulk = (db: IDBDatabase) => (impacts: Record<string, number>) => {
  const objectStore = db.transaction(BLOCKED_SITES, 'readwrite').objectStore(BLOCKED_SITES)

  const putImpact = (blockedSiteId: number, impactCount: number): Promise<void> => {
    const request = objectStore.get(blockedSiteId)

    return new Promise((resolve, _) => {
      request.onsuccess = () => {
        const blockedSite = request.result
        blockedSite.impactCount = blockedSite.impactCount
          ? blockedSite.impactCount + impactCount
          : impactCount

        const updateRequest = objectStore.put(blockedSite)
        updateRequest.onsuccess = () => {
          resolve()
        }
      }
    })
  }

  return Promise.all([Object.keys(impacts).map(k => putImpact(Number(k), impacts[k]))])
}

// TODO: Reuse types
interface BlockedSiteEndpoints {
  add: (urlFilter: string) => Promise<unknown>
  addImpact: (blockedSiteId: number) => Promise<void>
  addImpactsInBulk: (impacts: Record<string, number>) => Promise<[Promise<void>[]]>
  list: () => Promise<BlockedSite[]>
  delete: (id: number) => Promise<unknown>
}

export type { BlockedSiteEndpoints }
export {
  addBlockedSite,
  listBlockedSites,
  deleteBlockedSite,
  addImpactToBlockedSite,
  addImpactsToBlockedSitesInBulk,
}

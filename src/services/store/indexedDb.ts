// indexedDb: asynchronously, object type, no special permission needed.
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

let db: IDBDatabase | null = null
const databaseName = 'deepFocusChromeExtensionDb'

function createDatabase() {
  const request = indexedDB.open(databaseName)

  request.onerror = event => {
    // eslint-disable-next-line no-console -- Necessary for debugging
    console.log('IndexedDb: Problem opening DB :', event)
  }

  request.onupgradeneeded = event => {
    if (!(event.target instanceof IDBOpenDBRequest)) return // TODO: Error handling?
    db = event.target.result

    const objectStore = db.createObjectStore('blockedSites', {
      keyPath: 'id',
      autoIncrement: true,
    })

    objectStore.transaction.oncomplete = event => {
      if (!(event.target instanceof IDBOpenDBRequest)) return // TODO: Error handling?
      db = event.target.result
    }
  }

  request.onsuccess = event => {
    if (!(event.target instanceof IDBOpenDBRequest)) return // TODO: Error handling?
    db = event.target.result

    // eslint-disable-next-line no-console -- Necessary for debugging
    console.log(`IndexedDb: Database successfully opened.`)

    db.onerror = event => {
      // eslint-disable-next-line no-console -- Necessary for debugging
      console.error(`IndexedDb: Database error: ${event.target}`)
    }
  }
}

function addBlockedSite(urlFilter: string) {
  if (!db)
    return new Promise((resolve, reject) => {
      reject(new Error('Bla')) // TODO: Error handling?
    })

  const transaction = db.transaction('blockedSites', 'readwrite')
  const objectStore = transaction.objectStore('blockedSites')

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log('IndexedDb: AddBlockedSite completed.')
      resolve(true)
    }

    transaction.onerror = () => {
      reject()
    }

    objectStore.add({ url: urlFilter })
  })
}

function listBlockedSites(): Promise<{ url: string; id: number }[]> {
  if (!db)
    return new Promise((resolve, reject) => {
      reject(new Error('Bla')) // TODO: Error handling?
    })

  const transaction = db.transaction('blockedSites', 'readonly')
  const objectStore = transaction.objectStore('blockedSites')

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log('IndexedDb: listBlockedSites completed.')
    }

    transaction.onerror = () => {
      reject()
    }

    const request = objectStore.getAll()
    request.onsuccess = function (event) {
      if (!(event.target instanceof IDBRequest)) return // TODO: Error handling?
      console.log('IndexedDb: listBlockedSites success')
      resolve(event.target.result)
    }
  })
}

async function debugDatabase() {
  const results = await listBlockedSites()
  // eslint-disable-next-line no-console -- Necessary for debugging
  console.log('IndexedDb: Debugger listBlockedSites: ', results)
}

function deleteBlockedSite(id: number) {
  if (!db)
    return new Promise((resolve, reject) => {
      reject(new Error('Bla')) // TODO: Error handling?
    })

  const request = db.transaction('blockedSites', 'readwrite').objectStore('blockedSites').delete(id)

  return new Promise((resolve, reject) => {
    request.onsuccess = event => {
      resolve(true)
    }
  })
}

export { createDatabase, addBlockedSite, listBlockedSites, debugDatabase, deleteBlockedSite }

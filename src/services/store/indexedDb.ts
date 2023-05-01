// indexedDb: asynchronously, object type, no special permission needed.
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

let db: IDBDatabase | null = null
const databaseName = 'deepFocusChromeExtensionDb'

function createDatabase() {
  const request = indexedDB.open(databaseName)

  request.onerror = event => {
    // eslint-disable-next-line no-console -- Necessary for debugging
    console.log('Problem opening DB.', event)
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
    console.log(`Database successfully opened`)

    db.onerror = event => {
      // eslint-disable-next-line no-console -- Necessary for debugging
      console.error(`Database error: ${event.target}`)
    }
  }
}

function addBlockedSite(urlFilter: string) {
  console.log('db')
  if (!db)
    return new Promise((resolve, reject) => {
      reject(new Error('Bla')) // TODO: Error handling?
    })

  console.log('db is defined')

  const transaction = db.transaction('blockedSites', 'readwrite')
  const objectStore = transaction.objectStore('blockedSites')

  console.log('object store')

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log('completed')
      resolve(true)
    }

    transaction.onerror = () => {
      reject()
    }

    objectStore.add({ url: urlFilter })
  })
}

export { createDatabase, addBlockedSite }

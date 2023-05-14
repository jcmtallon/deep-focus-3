const addBlockedSite = (db: IDBDatabase) => (urlFilter: string) => {
  const transaction = db.transaction('blockedSites', 'readwrite')
  const objectStore = transaction.objectStore('blockedSites')

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve(true)
    }

    transaction.onerror = () => {
      reject()
    }

    objectStore.add({ url: urlFilter })
  })
}

export { addBlockedSite }

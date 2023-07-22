import { DateTime } from 'luxon'
import { AstroName, Astro } from 'types'
import { COLLECTION_NAME } from '../constants'

const { ASTROS } = COLLECTION_NAME

const addAstro =
  (db: IDBDatabase) =>
  (astroName: AstroName): Promise<void> => {
    const today = DateTime.now()
    const astroId = parseInt(today.toFormat('yyyyLLdd'), 10)

    const objectStore = db.transaction(ASTROS, 'readwrite').objectStore(ASTROS)

    const addRequest = objectStore.get(astroId)

    // eslint-disable-next-line no-debugger
    debugger

    return new Promise((resolve, _) => {
      addRequest.onsuccess = () => {
        const storedObject = addRequest.result

        if (!storedObject) {
          const addRequest = objectStore.add({ name: astroName, astroId, date: today.toMillis() })
          addRequest.onsuccess = () => {
            resolve()
          }
        } else {
          storedObject.name = astroName
          const updateRequest = objectStore.put(storedObject)
          updateRequest.onsuccess = () => {
            resolve()
          }
        }
      }
    })
  }

const listAstros = (db: IDBDatabase) => (): Promise<Astro[]> => {
  const transaction = db.transaction(ASTROS, 'readonly')
  const objectStore = transaction.objectStore(ASTROS)

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

// TODO: Reuse types
interface AstrosEndpoints {
  add: (astro: AstroName) => Promise<void>
  list: () => Promise<Astro[]>
}

export type { AstrosEndpoints }
export { addAstro, listAstros }

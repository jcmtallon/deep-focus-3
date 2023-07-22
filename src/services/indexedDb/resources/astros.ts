import { DateTime } from 'luxon'
import { Astro, ObtainedAstro } from 'types'
import { COLLECTION_NAME } from '../constants'

const { ASTROS } = COLLECTION_NAME

const addAstro =
  (db: IDBDatabase) =>
  (astro: Astro): Promise<void> => {
    const astroId = parseInt(DateTime.now().toFormat('yyyyLLdd'), 10)

    const objectStore = db.transaction(ASTROS, 'readwrite').objectStore(ASTROS)

    const addRequest = objectStore.get(astroId)

    // eslint-disable-next-line no-debugger
    debugger

    return new Promise((resolve, _) => {
      addRequest.onsuccess = () => {
        const storedObject = addRequest.result

        if (!storedObject) {
          const addRequest = objectStore.add({ astro, astroId })
          addRequest.onsuccess = () => {
            resolve()
          }
        } else {
          storedObject.astro = astro
          const updateRequest = objectStore.put(storedObject)
          updateRequest.onsuccess = () => {
            resolve()
          }
        }
      }
    })
  }

const listAstros = (db: IDBDatabase) => (): Promise<ObtainedAstro[]> => {
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
  add: (astro: Astro) => Promise<void>
  list: () => Promise<ObtainedAstro[]>
}

export type { AstrosEndpoints }
export { addAstro, listAstros }

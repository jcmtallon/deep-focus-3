import { Category } from 'types'
import { COLLECTION_NAME } from '../constants'

const { CATEGORIES } = COLLECTION_NAME

const addCategory = (db: IDBDatabase) => (args: { name: string; color: string }) => {
  const transaction = db.transaction(CATEGORIES, 'readwrite')
  const objectStore = transaction.objectStore(CATEGORIES)

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve(true)
    }

    transaction.onerror = e => {
      reject(e)
    }

    objectStore.add(args)
  })
}

const listCategories = (db: IDBDatabase) => (): Promise<Category[]> => {
  const transaction = db.transaction(CATEGORIES, 'readonly')
  const objectStore = transaction.objectStore(CATEGORIES)

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

const deleteCategory = (db: IDBDatabase) => (id: number) => {
  const request = db.transaction(CATEGORIES, 'readwrite').objectStore(CATEGORIES).delete(id)
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(true)
    }
    request.onerror = e => {
      reject(e)
    }
  })
}

// TODO: Reuse types
interface CategoryEndpoints {
  add: (args: { name: string; color: string }) => Promise<unknown>
  list: () => Promise<Category[]>
  delete: (id: number) => Promise<unknown>
}

export type { CategoryEndpoints }
export { addCategory, listCategories, deleteCategory }

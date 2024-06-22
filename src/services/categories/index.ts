// Reference: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-setExtensionActionOptions

import { indexedDb } from 'services/indexedDb'
import { LOCAL_STORAGE_KEY, readLocalStorage, setLocalStorage } from 'services/localStorage'
import { Category } from 'types'

async function listCategories(): Promise<Category[]> {
  const database = await indexedDb.getInstance()
  const categories = await database.categories.list()
  return categories
}

async function deleteCategory(categoryId: Category['id']) {
  const database = await indexedDb.getInstance()
  await database.categories.delete(categoryId)
}

async function addCategory(args: { name: string; color: string }) {
  const database = await indexedDb.getInstance()
  await database.categories.add(args)
}

async function updateCategory(category: Category) {
  const database = await indexedDb.getInstance()
  await database.categories.put(category)
}

async function getStoredSelectedCategoryId(): Promise<number | undefined> {
  const stringValue = await readLocalStorage(LOCAL_STORAGE_KEY.SELECTED_CATEGORY_ID)
  return typeof stringValue === 'number' ? stringValue : undefined
}

async function storeSelectedCategoryId(categoryId: number | undefined): Promise<void> {
  await setLocalStorage({ [LOCAL_STORAGE_KEY.SELECTED_CATEGORY_ID]: categoryId })
}

export {
  addCategory,
  deleteCategory,
  getStoredSelectedCategoryId,
  listCategories,
  storeSelectedCategoryId,
  updateCategory,
}

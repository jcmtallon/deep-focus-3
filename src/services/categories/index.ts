// Reference: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-setExtensionActionOptions

import { indexedDb } from 'services/indexedDb'
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

export { listCategories, deleteCategory, addCategory }

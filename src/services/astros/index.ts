import { indexedDb } from 'services/indexedDb'
import { Astro } from 'types'

async function addAstro(astro: Astro): Promise<void> {
  const database = await indexedDb.getInstance()
  await database.astros.add(astro)
}

export { addAstro }

import { indexedDb } from 'services/indexedDb'
import { Astro } from 'types'

async function addAstro(astro: Astro) {
  const database = await indexedDb.getInstance()
  // await database.astros.add(astro)
}

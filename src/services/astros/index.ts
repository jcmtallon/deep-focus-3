import { indexedDb } from 'services/indexedDb'
import { Astro, ObtainedAstro } from 'types'

async function addAstro(astro: Astro): Promise<void> {
  const database = await indexedDb.getInstance()
  await database.astros.add(astro)
}

async function listObtainedAstros(): Promise<ObtainedAstro[]> {
  const database = await indexedDb.getInstance()
  const obtainedAstros = await database.astros.list()
  return obtainedAstros
}

export { addAstro, listObtainedAstros }

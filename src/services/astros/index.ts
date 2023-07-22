import { indexedDb } from 'services/indexedDb'
import { AstroName, Astro } from 'types'

async function addAstro(astro: AstroName): Promise<void> {
  const database = await indexedDb.getInstance()
  await database.astros.add(astro)
}

async function listObtainedAstros(): Promise<Astro[]> {
  const database = await indexedDb.getInstance()
  const obtainedAstros = await database.astros.list()
  return obtainedAstros
}

export { addAstro, listObtainedAstros }

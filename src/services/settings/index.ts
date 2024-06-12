import { LOCAL_STORAGE_KEY, readLocalStorage, setLocalStorage } from 'services/localStorage'
import { Settings } from 'types'

const DEFAULT_SETTINGS: Settings = {
  targetFocusDurationPerDay: { 0: 240, 1: 240, 2: 240, 3: 240, 4: 240, 5: 36, 6: 360 },
}

async function getSettings(): Promise<Settings> {
  const stringValue = await readLocalStorage(LOCAL_STORAGE_KEY.SETTINGS)
  return stringValue !== undefined ? JSON.parse(stringValue as string) : DEFAULT_SETTINGS
}

async function createSettings(settings: Settings): Promise<void> {
  await setLocalStorage({ [LOCAL_STORAGE_KEY.SETTINGS]: JSON.stringify(settings) })
}

async function editSettings(settings: Settings): Promise<void> {
  await setLocalStorage({ [LOCAL_STORAGE_KEY.SETTINGS]: JSON.stringify(settings) })
}

export { getSettings, createSettings, editSettings, DEFAULT_SETTINGS }

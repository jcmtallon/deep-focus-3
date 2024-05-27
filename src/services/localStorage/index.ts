// chrome.storage.local cannot be natively explored via chrome dev tools.
// Alternative (not tested): https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb

const LOCAL_STORAGE_KEY = {
  ACTIVE_FOCUS_SESSION: 'deepFocusChromeExtension_activeFocusSession',
  BACKGROUND_AUDIO_PLAYING: 'deepFocusChromeExtension_backgroundAudioPlaying',
  BACKGROUND_AUDIO_VOLUME: 'deepFocusChromeExtension_backgroundAudioVolume',
} as const

type LocalStorageKey = (typeof LOCAL_STORAGE_KEY)[keyof typeof LOCAL_STORAGE_KEY]

const readLocalStorage = async (key: LocalStorageKey) => {
  return new Promise(resolve => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        resolve(undefined)
      } else {
        resolve(result[key])
      }
    })
  })
}

const setLocalStorage = async (payload: Partial<Record<LocalStorageKey, any>>) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .set(payload)
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        // TODO: Catch reason
        reject()
      })
  })
}

const removeStorage = async (payload: LocalStorageKey[] | LocalStorageKey) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .remove(Array.isArray(payload) ? payload : [payload])
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject()
      })
  })
}

async function debugLocalStorage() {
  const response = await readLocalStorage(LOCAL_STORAGE_KEY.ACTIVE_FOCUS_SESSION)
  console.log('DEBUG: local storage', response !== undefined ? JSON.parse(response as string) : undefined)
}
export { readLocalStorage, setLocalStorage, removeStorage, LOCAL_STORAGE_KEY, debugLocalStorage }

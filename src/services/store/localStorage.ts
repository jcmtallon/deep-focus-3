// chrome.storage.local cannot be natively explored via chrome dev tools.
// Alternative (not tested): https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb
import { uniqueId } from 'lodash'

const readLocalStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject()
      } else {
        resolve(result[key])
      }
    })
  })
}

const setLocalStorage = async (payload: Record<string, any>) => {
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

const keys = {
  focusMode: 'deepFocusChromeExtension_focusMode',
}

// TODO: Abstract some sort of Task Factory
interface Task {
  id: string
  title: string
  status: 'PENDING' | 'COMPLETED'
}

interface SessionDetails {
  startTime: string
  tasks: Task[]
  stats: { impacts: number }
}

async function getFocusModeDetails() {
  try {
    const focusMode = await readLocalStorage(keys.focusMode)
    return focusMode !== undefined ? JSON.parse(focusMode as string) : undefined
  } catch (error) {
    return undefined
  }
}

async function initiateFocusMode(props: { taskTitle: string }) {
  const payload: SessionDetails = {
    startTime: new Date().toISOString(),
    tasks: [{ id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
    stats: { impacts: 0 },
  }

  await setLocalStorage({ [keys.focusMode]: JSON.stringify(payload) })
  return payload
}

async function abortFocusMode() {
  // TODO: Turn into promise-type function
  chrome.storage.local.remove([keys.focusMode])
  // const results = await setLocalStorage({ [keys.focusMode]: undefined })
  // return results
}
export { getFocusModeDetails, initiateFocusMode, abortFocusMode }

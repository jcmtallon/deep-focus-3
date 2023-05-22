// chrome.storage.local cannot be natively explored via chrome dev tools.
// Alternative (not tested): https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb
import { uniqueId } from 'lodash'
import { FocusSession, Task } from 'types'

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

// TODO: Separate localStorage and FocusSessionService

const KEY = {
  ACTIVE_FOCUS_SESSION: 'deepFocusChromeExtension_activeFocusSession',
}

async function getFocusModeDetails(): Promise<FocusSession | undefined> {
  try {
    const focusMode = await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)
    return focusMode !== undefined ? JSON.parse(focusMode as string) : undefined
  } catch (error) {
    return undefined
  }
}

async function initiateFocusMode(props: { taskTitle: string }) {
  const payload: FocusSession = {
    startDate: new Date().getTime(),
    tasks: [{ id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
    stats: { impacts: 0 },
  }

  await setLocalStorage({ [KEY.ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function addTask(props: { taskTitle: string }) {
  const response = await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)
  const existingSession = JSON.parse(response as string) as FocusSession
  const payload: FocusSession = {
    ...existingSession,
    tasks: [...existingSession.tasks, { id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
  }

  await setLocalStorage({ [KEY.ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function updateTasks(props: { tasks: Task[] }) {
  const response = await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)
  const existingSession = JSON.parse(response as string) as FocusSession
  const payload: FocusSession = {
    ...existingSession,
    tasks: props.tasks,
  }
  await setLocalStorage({ [KEY.ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function abortFocusMode() {
  // TODO: Turn into promise-type function
  chrome.storage.local.remove([KEY.ACTIVE_FOCUS_SESSION])
  // const results = await setLocalStorage({ [keys.focusMode]: undefined })
  // return results
}

async function debugLocalStorage() {
  const response = await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)
  console.log('DEBUG: local storage', response !== undefined ? JSON.parse(response as string) : undefined)
}
export { getFocusModeDetails, initiateFocusMode, abortFocusMode, addTask, updateTasks, debugLocalStorage }

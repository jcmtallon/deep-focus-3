// chrome.storage.local cannot be natively explored via chrome dev tools.
// Alternative (not tested): https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb
import { uniqueId } from 'lodash'
import { Session, Task } from 'types'

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

async function getFocusModeDetails(): Promise<Session | undefined> {
  try {
    const focusMode = await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)
    return focusMode !== undefined ? JSON.parse(focusMode as string) : undefined
  } catch (error) {
    return undefined
  }
}

async function initiateFocusMode(props: { taskTitle: string }) {
  const payload: Session = {
    startDateIso: new Date().toISOString(),
    tasks: [{ id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
    stats: { impacts: 0 },
  }

  await setLocalStorage({ [KEY.ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function addTask(props: { taskTitle: string }) {
  const response = (await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)) as string
  const existingSession = JSON.parse(response) as Session
  const payload: Session = {
    ...existingSession,
    tasks: [...existingSession.tasks, { id: uniqueId(), title: props.taskTitle, status: 'PENDING' }],
  }

  await setLocalStorage({ [KEY.ACTIVE_FOCUS_SESSION]: JSON.stringify(payload) })
  return payload
}

async function updateTasks(props: { tasks: Task[] }) {
  const response = (await readLocalStorage(KEY.ACTIVE_FOCUS_SESSION)) as string
  const existingSession = JSON.parse(response) as Session
  const payload: Session = {
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
export { getFocusModeDetails, initiateFocusMode, abortFocusMode, addTask, updateTasks }

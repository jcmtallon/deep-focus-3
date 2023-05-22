import { initBadge, showFocusModeBadge, showIdleModeBadge } from 'services/actionBadge'
import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules } from 'services/blockedSites'
import {
  abortFocusMode,
  initiateFocusMode,
  addTask,
  updateTasks as taskManagerUpdateTasks,
  indexedDb,
  debugLocalStorage,
} from 'services/store'
import { Task } from 'types'

// TODO: Setup Store better? Make agnostic

chrome.runtime.onInstalled.addListener(() => {
  initBadge()
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

async function addBlockedSite(props: { payload: any }) {
  const database = await indexedDb.getInstance()
  database.blockedSites.add(props.payload.urlFilter ?? 'bbc') // TODO: Temp implementation
}

// Gets active tab id
function getActiveTabId(): Promise<number | undefined> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      // TODO: Error handling
      if (tabs[0] && tabs[0].id) {
        resolve(tabs[0].id)
      } else {
        resolve(undefined)
      }
    })
  })
}

async function startFocusMode(props: { payload: { taskTitle: string }; sendResponse: (payload: any) => {} }) {
  const focusSession = await initiateFocusMode({ taskTitle: props.payload.taskTitle })
  enableRules()
  showFocusModeBadge()

  const tabId = await getActiveTabId()
  if (tabId) {
    chrome.tabs
      .sendMessage(tabId, { message: 'focusModeOn' })
      .then(() => {})
      .catch(() => {})
  }

  props.sendResponse(focusSession)
}

async function extendFocusSession(props: {
  payload: { taskTitle: string }
  sendResponse: (payload: any) => {}
}) {
  const session = await addTask({ taskTitle: props.payload.taskTitle })
  props.sendResponse(session)
}

async function updateTasks(props: { payload: { tasks: Task[] }; sendResponse: (payload: any) => {} }) {
  const session = await taskManagerUpdateTasks({ tasks: props.payload.tasks })
  props.sendResponse(session)
}

async function stopFocusMode(props: { sendResponse: (payload: any) => {} }) {
  disableRules()
  abortFocusMode()
  showIdleModeBadge()

  const tabId = await getActiveTabId()
  if (tabId) {
    chrome.tabs
      .sendMessage(tabId, { message: 'focusModeOff' })
      .then(() => {})
      .catch(() => {})
  }

  props.sendResponse(true)
}

async function debug() {
  debugRules()
  debugLocalStorage()
  // debugDatabase()
}

listenToMessages({
  addBlockedSite: payload => addBlockedSite(payload),
  debug: () => debug(),
  extendFocusSession: payload => extendFocusSession(payload),
  startFocusMode: payload => startFocusMode(payload),
  stopFocusMode: payload => stopFocusMode(payload),
  updateTasks: payload => updateTasks(payload),
})

export {}

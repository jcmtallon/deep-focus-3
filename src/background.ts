import { initBadge, showFocusModeBadge, showIdleModeBadge } from 'services/actionBadge'
import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules } from 'services/blockedSites'
import { debugLocalStorage } from 'services/localStorage'
import {
  addFocusSession,
  startActiveFocusSessions,
  addImpactToActiveFocusSessions,
  addTaskToActiveFocusSessions,
  finishActiveFocusSession,
  updateActiveFocusSessionTasks,
} from 'services/focusSessions'
import { indexedDb } from 'services/indexedDb'
import { FocusSession, Task } from 'types'

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

async function addImpact(props: { payload: { siteId: string }; sendResponse: (payload: any) => {} }) {
  await addImpactToActiveFocusSessions()
  props.sendResponse(true)
}

async function startFocusMode(props: { payload: { taskTitle: string }; sendResponse: (payload: any) => {} }) {
  const focusSession = await startActiveFocusSessions({ taskTitle: props.payload.taskTitle })
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
  const session = await addTaskToActiveFocusSessions({ taskTitle: props.payload.taskTitle })
  props.sendResponse(session)
}

async function updateTasks(props: { payload: { tasks: Task[] }; sendResponse: (payload: any) => {} }) {
  const session = await updateActiveFocusSessionTasks({ tasks: props.payload.tasks })
  props.sendResponse(session)
}

async function stopFocusMode(props: { sendResponse: (payload: any) => {} }) {
  disableRules()
  await finishActiveFocusSession()
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

async function finishFocusSession(props: {
  payload: { session: FocusSession }
  sendResponse: (payload: any) => {}
}) {
  disableRules()
  await addFocusSession(props.payload.session)
  await finishActiveFocusSession()
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
  addImpact: payload => addImpact(payload),
  debug: () => debug(),
  extendFocusSession: payload => extendFocusSession(payload),
  finishFocusSession: payload => finishFocusSession(payload),
  startFocusMode: payload => startFocusMode(payload),
  stopFocusMode: payload => stopFocusMode(payload),
  updateTasks: payload => updateTasks(payload),
})

export {}

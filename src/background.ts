import { initBadge, showFocusModeBadge, showIdleModeBadge } from 'services/actionBadge'
import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules } from 'services/siteBlocker'
import {
  createDatabase,
  addBlockedSite as addBlockedSiteToStore,
  abortFocusMode,
  initiateFocusMode,
  debugDatabase,
} from 'services/store'

// TODO: Setup Store better? Make agnostic
createDatabase()

chrome.runtime.onInstalled.addListener(() => {
  initBadge()
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

function addBlockedSite(props: { payload: any }) {
  addBlockedSiteToStore(props.payload.urlFilter ?? 'bbc') // TODO: Temp implementation
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
  const focusModeSessionDetails = await initiateFocusMode({ taskTitle: props.payload.taskTitle })
  enableRules()
  showFocusModeBadge()

  const tabId = await getActiveTabId()
  if (tabId) {
    chrome.tabs
      .sendMessage(tabId, { message: 'focusModeOn' })
      .then(() => {})
      .catch(() => {})
  }

  props.sendResponse(focusModeSessionDetails)
}

async function stopFocusMode() {
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
}

async function debug() {
  debugRules()
  debugDatabase()
}

listenToMessages({
  addBlockedSite: payload => addBlockedSite(payload),
  startFocusMode: payload => startFocusMode(payload),
  stopFocusMode: () => stopFocusMode(),
  debug: () => debug(),
})

export {}

import { initBadge, showFocusModeBadge, showIdleModeBadge } from 'services/actionBadge'
import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules } from 'services/siteBlocker'
import {
  createDatabase,
  addBlockedSite as addBlockedSiteToStore,
  setFocusModeDetails,
  debugDatabase,
} from 'services/store'

// TODO: Setup Store better? Make agnostic
createDatabase()

chrome.runtime.onInstalled.addListener(() => {
  initBadge()
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

function addBlockedSite(payload: any) {
  addBlockedSiteToStore(payload.urlFilter ?? 'bbc') // TODO: Temp implementation
}

// Gets active tab id
function getActiveTabId(): Promise<number> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      // TODO: Error handling
      if (tabs[0].id) resolve(tabs[0].id)
    })
  })
}

async function startFocusMode() {
  enableRules()
  setFocusModeDetails(true)
  showFocusModeBadge()

  const tabId = await getActiveTabId()
  chrome.tabs.sendMessage(tabId, { message: 'focusModeOn' })
}

async function stopFocusMode() {
  disableRules()
  setFocusModeDetails(false)
  showIdleModeBadge()

  const tabId = await getActiveTabId()
  chrome.tabs.sendMessage(tabId, { message: 'focusModeOff' })
}

async function debug() {
  debugRules()
  debugDatabase()
}

listenToMessages({
  addBlockedSite: payload => addBlockedSite(payload),
  startFocusMode: () => startFocusMode(),
  stopFocusMode: () => stopFocusMode(),
  debug: () => debug(),
})

export {}

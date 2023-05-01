import { initBadge, showFocusModeBadge, showIdleModeBadge } from 'services/actionBadge'
import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules } from 'services/siteBlocker'
import {
  createDatabase,
  addBlockedSite as addBlockedSiteToStore,
  setFocusModeDetails,
  debugDatabase,
} from 'services/store'

chrome.runtime.onInstalled.addListener(() => {
  createDatabase() // TODO: Setup Store better? Make agnostic
  initBadge()
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

function addBlockedSite(payload: any) {
  addBlockedSiteToStore(payload.urlFilter ?? 'bbc') // TODO: Temp implementation
}

function startFocusMode() {
  enableRules()
  setFocusModeDetails(true)
  showFocusModeBadge()
}

function stopFocusMode() {
  disableRules()
  setFocusModeDetails(false)
  showIdleModeBadge()
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

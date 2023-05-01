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
  chrome.action.setBadgeText({ text: 'OFF' })
  chrome.action.setBadgeBackgroundColor({ color: '#100229' })
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

function addBlockedSite(payload: any) {
  addBlockedSiteToStore(payload.urlFilter ?? 'bbc') // TODO: Temp implementation
}

function startFocusMode() {
  chrome.action.setBadgeText({ text: 'ON' })
  chrome.action.setBadgeBackgroundColor({ color: '#E5541E' })
  enableRules()
  setFocusModeDetails(true)
}

function stopFocusMode() {
  chrome.action.setBadgeText({ text: 'OFF' })
  chrome.action.setBadgeBackgroundColor({ color: '#100229' })
  disableRules()
  setFocusModeDetails(false)
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

import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules } from 'services/siteBlocker'
import { setFocusModeDetails } from 'services/store'

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'OFF' })
  chrome.action.setBadgeBackgroundColor({ color: '#100229' })
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

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

function debug() {
  debugRules()
}

listenToMessages({
  startFocusMode: () => startFocusMode(),
  stopFocusMode: () => stopFocusMode(),
  debug: () => debug(),
})

export {}

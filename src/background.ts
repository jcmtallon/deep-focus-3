import { listenToMessages } from 'services/ChromeMessages'
import { disableRules, enableRules, debugRules } from 'services/SiteBlocker'

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
}

function stopFocusMode() {
  chrome.action.setBadgeText({ text: 'OFF' })
  chrome.action.setBadgeBackgroundColor({ color: '#100229' })
  disableRules()
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

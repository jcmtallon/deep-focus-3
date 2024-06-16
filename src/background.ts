import { initBadge, showFocusModeBadge, showIdleModeBadge } from 'services/actionBadge'
import { listenToMessages } from 'services/actions'
import { disableRules, enableRules, debugRules, addImpactsToBlockedSites } from 'services/blockedSites'
import { debugLocalStorage } from 'services/localStorage'
import {
  addFocusSession,
  startActiveFocusSessions,
  addImpactToActiveFocusSessions,
  addTaskToActiveFocusSessions,
  finishActiveFocusSession,
  getFocusSessionsByDay,
  updateActiveFocusSessionTasks,
} from 'services/focusSessions'
import { DateTime } from 'luxon'
import { Category, FocusSession, Task } from 'types'
import { checkNewlyAchievedAstro, getFocusSessionsPointsBreakdown } from 'utils'
import { addAstro } from 'services/astros'

// TODO: Setup Store better? Make agnostic

chrome.runtime.onInstalled.addListener(() => {
  initBadge()
})

// TODO: Execute when uninstalled:
// https://stackoverflow.com/a/72958868

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
  await addImpactToActiveFocusSessions(props.payload.siteId)
  props.sendResponse(true)
}

async function startFocusMode(props: {
  payload: { category: Category | undefined }
  sendResponse: (payload: any) => {}
}) {
  const focusSession = await startActiveFocusSessions({ category: props.payload.category })
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
  await addImpactsToBlockedSites(props.payload.session.impacts)
  await finishActiveFocusSession()
  showIdleModeBadge()

  const completedSessions = await getFocusSessionsByDay(DateTime.now())
  const { total: totalPoints } = getFocusSessionsPointsBreakdown(completedSessions)
  const pointsPriorCurrentSession = totalPoints - (props.payload.session.points || 0)
  const astro = checkNewlyAchievedAstro(pointsPriorCurrentSession, totalPoints)
  if (astro) addAstro(astro)

  const tabId = await getActiveTabId()

  if (tabId) {
    chrome.tabs
      .sendMessage(tabId, { message: 'focusModeOff' })
      .then(() => {})
      .catch(() => {})
  }

  props.sendResponse({ astro })
}

async function debug() {
  debugRules()
  debugLocalStorage()
  // debugDatabase()
}

listenToMessages({
  addImpact: payload => addImpact(payload),
  debug: () => debug(),
  extendFocusSession: payload => extendFocusSession(payload),
  finishFocusSession: payload => finishFocusSession(payload),
  startFocusMode: payload => startFocusMode(payload),
  stopFocusMode: payload => stopFocusMode(payload),
  updateTasks: payload => updateTasks(payload),
})

export {}

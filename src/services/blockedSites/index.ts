// Reference: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-setExtensionActionOptions

import { indexedDb } from 'services/indexedDb'
import { BlockedSite } from 'types'

async function addBlockedSite(urlFilter: string): Promise<void> {
  const database = await indexedDb.getInstance()
  database.blockedSites.add(urlFilter)
}

async function listBlockedSites(): Promise<BlockedSite[]> {
  const database = await indexedDb.getInstance()
  const blockedSites = await database.blockedSites.list()
  return blockedSites
}

async function deleteBlockedSite(blockedSiteId: BlockedSite['id']) {
  const database = await indexedDb.getInstance()
  await database.blockedSites.delete(blockedSiteId)
}

async function addImpactToBlockedSite(blockedSiteId: BlockedSite['id']): Promise<void> {
  const database = await indexedDb.getInstance()
  await database.blockedSites.addImpact(blockedSiteId)
}

async function addImpactsToBlockedSites(impacts: Record<string, number> | undefined) {
  const database = await indexedDb.getInstance()
  if (!impacts) return
  await database.blockedSites.addImpactsInBulk(impacts)
}

function removeRule() {
  // WIP
}

function disableRules() {
  chrome.declarativeNetRequest.getDynamicRules(previousRules => {
    const previousRuleIds = previousRules.map(rule => rule.id)
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: previousRuleIds,
    })
  })
}

async function enableRules() {
  const database = await indexedDb.getInstance()
  const storedRules = await database.blockedSites.list()
  chrome.declarativeNetRequest.getDynamicRules(previousRules => {
    const previousRuleIds = previousRules.map(rule => rule.id)
    const newRules = storedRules.map((rule, indx) => {
      return {
        id: indx + 1,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: { extensionPath: `/src/apps/content/index.html?site=${rule.id}&blockType=site` },
        },
        condition: {
          urlFilter: rule.url,
          resourceTypes: ['main_frame'],
        },
      }
    }) as chrome.declarativeNetRequest.Rule[]

    chrome.declarativeNetRequest
      .updateDynamicRules({
        removeRuleIds: previousRuleIds,
        addRules: newRules,
      })
      .then(() => {
        console.log('Background rule manager: Rules updated successfully')
      })
  })
}

async function debugRules() {
  const count = await chrome.declarativeNetRequest.getAvailableStaticRuleCount()
  console.log('Debugger: GetAvailableStaticRuleCount: ', count)

  chrome.declarativeNetRequest.getMatchedRules({}, details => {
    console.log('Debugger: Matched Rules: ', details)
  })

  chrome.declarativeNetRequest.getDynamicRules(rules => console.log('Debugger: Dynamic Rules: ', rules))
}

export {
  addBlockedSite,
  addImpactsToBlockedSites,
  addImpactToBlockedSite,
  debugRules,
  deleteBlockedSite,
  disableRules,
  enableRules,
  listBlockedSites,
  removeRule,
}

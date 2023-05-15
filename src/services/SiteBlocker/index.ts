// Reference: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-setExtensionActionOptions

import { listBlockedSites } from 'services/store'

function addRule(urlFilter: string) {
  chrome.storage.local.get(['deepFocus_rules']).then(result => {
    const rules = result.deepFocus_rules ? JSON.parse(result.deepFocus_rules) : []
    rules.push(urlFilter)
    chrome.storage.local.set({ deepFocus_rules: JSON.stringify(rules) })
  })
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
  const storedRules = await listBlockedSites()
  chrome.declarativeNetRequest.getDynamicRules(previousRules => {
    const previousRuleIds = previousRules.map(rule => rule.id)
    const newRules: chrome.declarativeNetRequest.Rule[] = storedRules.map((rule, indx) => {
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
    })

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

export { addRule, removeRule, disableRules, enableRules, debugRules }

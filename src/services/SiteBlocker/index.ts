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
  console.log('disableRules')
  chrome.declarativeNetRequest.getDynamicRules(previousRules => {
    const previousRuleIds = previousRules.map(rule => rule.id)
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: previousRuleIds,
    })
  })
}

function enableRules() {
  chrome.declarativeNetRequest.getDynamicRules(previousRules => {
    const previousRuleIds = previousRules.map(rule => rule.id)
    const newRules: chrome.declarativeNetRequest.Rule[] = ['youtube', 'espinof', 'elpais'].map(
      (res, indx) => {
        return {
          id: indx + 1,
          priority: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: { extensionPath: `/src/apps/content/index.html?site=${res}&blockType=site` },
          },
          condition: {
            urlFilter: res,
            resourceTypes: ['main_frame'],
          },
        }
      },
    )

    chrome.declarativeNetRequest
      .updateDynamicRules({
        removeRuleIds: previousRuleIds,
        addRules: newRules,
      })
      .then(() => {
        console.log('Rules updated successfully')
      })
  })
}

async function debugRules() {
  const count = await chrome.declarativeNetRequest.getAvailableStaticRuleCount()
  console.log('getAvailableStaticRuleCount', count)

  chrome.declarativeNetRequest.getMatchedRules({}, details => {
    console.log(details)
  })

  chrome.declarativeNetRequest.getDynamicRules(rules => console.log(rules))
}

// TODO: Rename functions to be more descriptive

export { addRule, removeRule, disableRules, enableRules, debugRules }

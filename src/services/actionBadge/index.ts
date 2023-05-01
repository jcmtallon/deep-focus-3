function applyInitStyles() {
  chrome.action.setBadgeText({ text: 'OFF' })
  chrome.action.setBadgeBackgroundColor({ color: '#100229' })
}

function initBadge() {
  applyInitStyles()
}

function showFocusModeBadge() {
  chrome.action.setBadgeText({ text: 'ON' })
  chrome.action.setBadgeBackgroundColor({ color: '#E5541E' })
}

function showIdleModeBadge() {
  applyInitStyles()
}

export { initBadge, showFocusModeBadge, showIdleModeBadge }

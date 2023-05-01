// TODO: Consider a different naming. So popup is agnostic about chrome.runtime
// TODO: Abstract files

// TODO: Typesafe actions

// interface BlockedSite {
//   urlFilter: string
// }

// interface StartFocusModeAction {
//   actionName: 'startFocusMode'
//   payload: undefined
// }

// interface DebugAction {
//   actionName: 'debug'
//   payload: undefined
// }

// interface StopFocusModeAction {
//   actionName: 'stopFocusMode'
//   payload: undefined
// }

// interface AddBlockedSiteAction {
//   actionName: 'addBlockedSite'
//   payload: BlockedSite
// }

type Action = 'startFocusMode' | 'stopFocusMode' | 'debug' | 'addBlockedSite'

function sendMessage(action: Action, payload?: unknown) {
  chrome.runtime.sendMessage({ action, payload })
}

type MessageCallbacks = Record<Partial<Action>, (payload?: any) => void>

function listenToMessages(callbacks: MessageCallbacks) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'addBlockedSite':
        callbacks.addBlockedSite(request.payload)
        break

      case 'startFocusMode':
        callbacks.startFocusMode()
        break

      case 'stopFocusMode':
        callbacks.stopFocusMode()
        break

      case 'debug':
        callbacks.debug()
        break

      default:
        break
    }
  })
}

export { sendMessage, listenToMessages }

// Sample of sender object:
// {
//     "id": "pclepcaikjabjaiaabbnnnibacmgbbfm",
//     "url": "chrome-extension://pclepcaikjabjaiaabbnnnibacmgbbfm/src/apps/popup/index.html",
//     "origin": "chrome-extension://pclepcaikjabjaiaabbnnnibacmgbbfm"
// }

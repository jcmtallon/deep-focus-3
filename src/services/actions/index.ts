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

async function sendMessagePromise(action: Action, payload?: unknown) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ action, payload }, response => {
      resolve(response)
      // reject(response.error)
    })
  })
}

type Action = 'startFocusMode' | 'stopFocusMode' | 'debug' | 'addBlockedSite'

async function sendMessage(action: Action, payload?: unknown) {
  const response = await sendMessagePromise(action, payload)
  return response
}

type MessageCallbacks = Record<Partial<Action>, (payload?: any) => void>

function listenToMessages(callbacks: MessageCallbacks) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'addBlockedSite':
        callbacks.addBlockedSite({ payload: request.payload, sender, sendResponse })
        break

      case 'startFocusMode':
        callbacks.startFocusMode({ payload: request.payload, sender, sendResponse })
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

    // See https://stackoverflow.com/a/56483156
    return true
  })
}

export { sendMessage, listenToMessages }

// Sample of sender object:
// {
//     "id": "pclepcaikjabjaiaabbnnnibacmgbbfm",
//     "url": "chrome-extension://pclepcaikjabjaiaabbnnnibacmgbbfm/src/apps/popup/index.html",
//     "origin": "chrome-extension://pclepcaikjabjaiaabbnnnibacmgbbfm"
// }

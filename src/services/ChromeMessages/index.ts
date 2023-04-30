// TODO: Consider a different naming. So popup is agnostic about chrome.runtime
// TODO: Abstract files

type Action = 'startFocusMode' | 'stopFocusMode' | 'debug'

function sendMessage(action: Action) {
  chrome.runtime.sendMessage({ action })
}

type MessageCallbacks = Record<Partial<Action>, () => void>

function listenToMessages(callbacks: MessageCallbacks) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
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

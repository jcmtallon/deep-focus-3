const readLocalStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject()
      } else {
        resolve(result[key])
      }
    })
  })
}

const setLocalStorage = async (payload: Record<string, string>) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .set(payload)
      .then(() => {
        // TODO: Research about resolve param
        resolve({})
      })
      .catch(() => {
        // TODO: Catch reason
        reject()
      })
  })
}

const keys = {
  focusMode: 'deepFocusChromeExtension_focusMode',
}

async function getFocusModeDetails() {
  try {
    const focusMode = await readLocalStorage(keys.focusMode)
    return focusMode === 'true'
  } catch (error) {
    return false
  }
}

// TODO: Consider passing more information like start time, etc.
async function setFocusModeDetails(on: boolean) {
  const results = await setLocalStorage({ [keys.focusMode]: on ? 'true' : 'false' })
  return results
}

export { getFocusModeDetails, setFocusModeDetails }

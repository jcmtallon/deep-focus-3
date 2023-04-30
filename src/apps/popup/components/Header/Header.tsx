import React from 'react'
import { sendMessage } from 'services/ChromeMessages'

function Header() {
  const handleDebugClick = () => {
    sendMessage('debug')
  }

  return (
    <div>
      <button type="button" onClick={handleDebugClick}>
        Debug
      </button>
    </div>
  )
}

export { Header }

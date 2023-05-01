import { FooterNav, PageLayout } from 'apps/popup/components'
import React, { useState } from 'react'
import { sendMessage } from 'services/actions'

function BlockedSites() {
  const [inputValue, setInputValue] = useState('')

  const handleAddClick = () => {
    sendMessage('addBlockedSite', { urlFilter: inputValue })
  }

  return (
    <PageLayout footer={<FooterNav activeElement="asteroids" />} header={<></>}>
      <>
        <span>Asteroids!</span>
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="button" onClick={handleAddClick}>
          Add asteroid
        </button>
        Some form
      </>
    </PageLayout>
  )
}

export { BlockedSites }

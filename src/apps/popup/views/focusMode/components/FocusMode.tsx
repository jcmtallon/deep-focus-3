import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { getFocusModeDetails } from 'services/store'
import { FocusModeLayout } from './FocusModeLayout'
import { FocusModesStats } from './FocusModeStats/FocusModeStats'
import { FocusModeActions } from './FocusModeActions/FocusModeActions'

function FocusMode() {
  const [isFocusModeOn, setIsFocusModeOn] = useState<boolean | null>(null)

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const status = await getFocusModeDetails()
      setIsFocusModeOn(status)
    }

    getFocusModeStatus()
  }, [])

  const handleStartFocusClick = () => {
    sendMessage('startFocusMode')
    setIsFocusModeOn(true)
  }

  const handleEndFocusClick = () => {
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
  }

  return (
    <PageLayout
      header={<Header />}
      footer={
        <FooterNav activeElement="focusMode" asteroidButtonProps={{ disabled: isFocusModeOn === true }} />
      }>
      {isFocusModeOn !== null && (
        <FocusModeLayout
          topSlot={<FocusModesStats focusModeActive={isFocusModeOn} />}
          centerSlot={<></>}
          bottomSlot={
            <FocusModeActions
              focusModeActive={isFocusModeOn}
              onAbortFocusMode={handleEndFocusClick}
              onFocusModeStart={handleStartFocusClick}
            />
          }
        />
      )}
    </PageLayout>
  )
}

export { FocusMode }

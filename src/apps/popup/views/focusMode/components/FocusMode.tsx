import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { getFocusModeDetails } from 'services/store'
import * as S from './FocusMode.styles'

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
    window.close()
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
        <S.Wrapper>
          <S.Timer>15:00</S.Timer>
          {!isFocusModeOn && <S.Button onClick={handleStartFocusClick}>Start Focus Session</S.Button>}
          {isFocusModeOn && <S.Button onClick={handleEndFocusClick}>All work done</S.Button>}
        </S.Wrapper>
      )}
    </PageLayout>
  )
}

export { FocusMode }

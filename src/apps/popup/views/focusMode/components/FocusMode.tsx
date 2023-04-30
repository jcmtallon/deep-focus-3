import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useState } from 'react'
import { sendMessage } from 'services/ChromeMessages'
import * as S from './FocusMode.styles'

function FocusMode() {
  const [isFocusModeOn, setIsFocusModeOn] = useState(false)

  const handleStartFocusClick = () => {
    sendMessage('startFocusMode')
    setIsFocusModeOn(true)

    // IF goes ok
    // window.close()
  }

  const handleEndFocusClick = () => {
    sendMessage('stopFocusMode')
    setIsFocusModeOn(false)
  }

  return (
    <PageLayout footer={<FooterNav activeElement="focusMode" />} header={<Header />}>
      <S.Wrapper>
        <S.Timer>15:00</S.Timer>
        {!isFocusModeOn && <S.Button onClick={handleStartFocusClick}>Start Focus Session</S.Button>}
        {isFocusModeOn && <S.Button onClick={handleEndFocusClick}>All work done</S.Button>}
      </S.Wrapper>
    </PageLayout>
  )
}

export { FocusMode }

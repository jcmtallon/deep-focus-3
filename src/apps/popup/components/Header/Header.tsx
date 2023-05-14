import React from 'react'
import { sendMessage } from 'services/actions'
import * as S from './Header.styles'

function Header() {
  const handleDebugClick = () => {
    sendMessage('debug')
  }

  return (
    <S.Wrapper>
      <S.Question />
      <S.Gear onClick={handleDebugClick} role="button" aria-label="options" />
    </S.Wrapper>
  )
}

export { Header }

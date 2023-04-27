import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './FooterNav.styles'

interface FooterNavProps {
  activeElement?: 'asteroids' | 'focusMode' | 'dashboard'
}

function FooterNav(props: FooterNavProps) {
  const { activeElement } = props
  const navigate = useNavigate()

  return (
    <S.Nav>
      <S.Button active={activeElement === 'asteroids'} type="button" onClick={() => navigate('/asteroids')}>
        Asteroids
      </S.Button>
      <S.Button active={activeElement === 'focusMode'} onClick={() => navigate('/')} type="button">
        Focus Mode
      </S.Button>
      <S.Button active={activeElement === 'dashboard'} type="button">
        Dashboard
      </S.Button>
    </S.Nav>
  )
}

export { FooterNav }

import React, { HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './FooterNav.styles'

interface FooterNavProps {
  activeElement?: 'asteroids' | 'focusMode' | 'dashboard'

  asteroidButtonProps?: HTMLAttributes<HTMLButtonElement> & { disabled: boolean }
}

function FooterNav(props: FooterNavProps) {
  const { activeElement, asteroidButtonProps } = props
  const navigate = useNavigate()

  return (
    <S.Nav>
      <S.Button
        active={activeElement === 'asteroids'}
        type="button"
        onClick={() => navigate('/asteroids')}
        {...asteroidButtonProps}>
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

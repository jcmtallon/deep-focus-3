import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './SideNav.styles'

interface SideNavProps {
  activeElement?: 'missionControl' | 'stats' | 'astros'
}

function SideNav(props: SideNavProps) {
  const { activeElement } = props
  const navigate = useNavigate()

  return (
    <S.Nav>
      <S.Button active={activeElement === 'missionControl'} type="button" onClick={() => navigate('/')}>
        Control
      </S.Button>
      <S.Button active={activeElement === 'stats'} onClick={() => navigate('/stats')} type="button">
        Stats
      </S.Button>
      <S.Button active={activeElement === 'astros'} onClick={() => navigate('/astros')} type="button">
        Astros
      </S.Button>
    </S.Nav>
  )
}

export { SideNav }

import { IconPlay, IconGroup, NavButton, IconImpact, IconSliders, IconDashboard } from 'components'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`

function PopupNavFooter() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleGoToBridgeClick = () => {
    const url = `chrome-extension://${chrome.runtime.id}/src/apps/content/index.html?`
    window.open(url, '_blank')
  }

  return (
    <Wrapper>
      <NavButton active={pathname === '/'} onClick={() => navigate('/')}>
        <IconPlay />
      </NavButton>
      <NavButton active={pathname === '/clusters'} onClick={() => navigate('/clusters')}>
        <IconGroup />
      </NavButton>
      <NavButton active={pathname === '/asteroids'} onClick={() => navigate('/asteroids')}>
        <IconImpact />
      </NavButton>
      <NavButton active={pathname === '/controlDeck'} onClick={() => navigate('/controlDeck')}>
        <IconSliders />
      </NavButton>
      {/* Bridge is not a route in the popup app, but a route from the content app. */}
      <NavButton onClick={handleGoToBridgeClick}>
        <IconDashboard />
      </NavButton>
    </Wrapper>
  )
}

export { PopupNavFooter }

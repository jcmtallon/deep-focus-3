import React, { ReactNode } from 'react'
import styled from 'styled-components'
import background from './popup_page_background.jpg'

const Background = styled.div`
  // Same as popup html element's width and height.
  width: 286px;
  height: 554px;
  background: ${() => `url(${background}) no-repeat center center fixed`};
  color: white;
  display: flex;
  flex-direction: column;
`

interface PopupPageBackgroundProps {
  children: ReactNode
}

function PopupPageBackground(props: PopupPageBackgroundProps) {
  return <Background>{props.children}</Background>
}

export { PopupPageBackground }

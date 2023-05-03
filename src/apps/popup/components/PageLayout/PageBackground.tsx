import React, { ReactNode } from 'react'
import styled from 'styled-components'
import background from './popup_background.jpg'

const Background = styled.div`
  width: 350px;
  height: 550px;
  background: ${() => `url(${background}) no-repeat center center fixed`};
  color: white;

  display: flex;
  flex-direction: column;
`

interface PageBackgroundProps {
  children: ReactNode
}

function PageBackground(props: PageBackgroundProps) {
  return <Background>{props.children}</Background>
}

export { PageBackground }

import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 0%;

  padding-top: 16px;
  padding-bottom: 16px;
`

const Top = styled.div``

const Center = styled.div``

const Bottom = styled.div``

interface FocusModeLayoutProps {
  topSlot: ReactNode
  centerSlot: ReactNode
  bottomSlot: ReactNode
}

function FocusModeLayout(props: FocusModeLayoutProps) {
  const { topSlot, centerSlot, bottomSlot } = props

  return (
    <Wrapper>
      <Top>{topSlot}</Top>
      <Center>{centerSlot}</Center>
      <Bottom>{bottomSlot}</Bottom>
    </Wrapper>
  )
}

export { FocusModeLayout }

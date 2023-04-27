import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #15043b;
  color: white;

  display: flex;
  flex-direction: column;
`

function MissionControl() {
  return <Wrapper>Mission Control</Wrapper>
}

export { MissionControl }

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  height: 100%;
  background-color: #15043b;
  color: white;
`

function FocusMode() {
  const navigate = useNavigate()

  return (
    <Root>
      <span>Focus Mode!</span>
      <button type="button" onClick={() => navigate('/asteroids')}>
        Asteroids!
      </button>
    </Root>
  )
}

export { FocusMode }

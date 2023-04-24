/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React from 'react'
import styled from 'styled-components'
import { Logo } from '../../components'
import './App.css'

const Title = styled.h1`
  color: blue;
`

function App() {
  return (
    <div className="App">
      <Title>Deep Focus</Title>
      <Logo />
      <input type="text" placeholder="site" />
      <button type="button">Add URL</button>
      <button type="button">Reset list</button>
      <ul />
    </div>
  )
}

export default App

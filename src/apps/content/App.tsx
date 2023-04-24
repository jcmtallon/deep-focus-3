/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React from 'react'
import { Logo } from 'components'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>Mission Control Dashboard 2</p>
      </header>
    </div>
  )
}

export default App

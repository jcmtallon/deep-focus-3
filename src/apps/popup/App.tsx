/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React from 'react'
import { ErrorBoundary } from '../../components'
// import './App.css'
import { Routes } from './Routes'

function App() {
  return (
    <ErrorBoundary error={<div>ERROR!</div>}>
      <Routes />
    </ErrorBoundary>
  )
}

export default App

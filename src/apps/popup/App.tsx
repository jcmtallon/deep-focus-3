/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React from 'react'
import { GlobalStyles, ThemeProvider } from 'theme'
import { ErrorBoundary } from '../../components'
import { Routes } from './Routes'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <ErrorBoundary error={<div>ERROR!</div>}>
        <Routes />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

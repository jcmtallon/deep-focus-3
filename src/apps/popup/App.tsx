/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React, { useEffect } from 'react'
import { GlobalStyles, ThemeProvider } from 'theme'
import { createDatabase } from 'services/store'
import { ErrorBoundary } from '../../components'
import { Routes } from './Routes'

function App() {
  useEffect(() => {
    createDatabase()
  }, [])

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

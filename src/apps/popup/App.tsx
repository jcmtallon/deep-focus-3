/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React from 'react'
import { GlobalStyles, ThemeProvider } from 'theme'
import { ErrorBoundary } from '../../components'
import { Routes } from './Routes'
import { PageLayout } from './components'
// import './App.css'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <ErrorBoundary error={<div>ERROR!</div>}>
        <PageLayout>
          <Routes />
        </PageLayout>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React, { useMemo } from 'react'
import { GlobalStyles, ThemeProvider } from 'theme'
import { ErrorBoundary } from '../../components'
import { Routes } from './Routes'
import { PopupPageLayoutPropsProvider, PopupNavFooter } from './components'

function App() {
  const pageLayoutProps = useMemo(() => ({ footer: <PopupNavFooter /> }), [])

  return (
    <ThemeProvider>
      <GlobalStyles />
      {/* TODO: Add proper ErrorBoundary */}
      <ErrorBoundary error={<div>ERROR!</div>}>
        <PopupPageLayoutPropsProvider value={pageLayoutProps}>
          <Routes />
        </PopupPageLayoutPropsProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

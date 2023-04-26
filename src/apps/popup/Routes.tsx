import React from 'react'
import { MemoryRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { FocusMode } from './views/focusMode'
import { BlockedSites } from './views/blockedSites'

function Routes() {
  return (
    <MemoryRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<FocusMode />} />
        <Route path="asteroids" element={<BlockedSites />} />
      </ReactRouterRoutes>
    </MemoryRouter>
  )
}

export { Routes }

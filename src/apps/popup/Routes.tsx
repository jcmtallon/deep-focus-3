import React from 'react'
import { MemoryRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { FocusMode } from './views/focusMode'
import { BlockedSites } from './views/blockedSites'
import { FocusControls } from './views/focusControls'
import { Categories } from './views/categories'
import { Settings } from './views/settings'

function Routes() {
  return (
    <MemoryRouter>
      <ReactRouterRoutes>
        {/* <Route path="/" element={<FocusMode />} /> */}
        <Route path="/" element={<FocusControls />} />
        <Route path="asteroids" element={<BlockedSites />} />
        <Route path="clusters" element={<Categories />} />
        <Route path="controlDeck" element={<Settings />} />
      </ReactRouterRoutes>
    </MemoryRouter>
  )
}

export { Routes }

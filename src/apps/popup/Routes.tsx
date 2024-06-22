import React from 'react'
import { MemoryRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { FocusMode } from './views/focusMode'
import { BlockedSites } from './views/blockedSites'
import { Categories } from './views/categories'
import { Settings } from './views/settings'

function Routes() {
  // TODO: Fetch necessary resources here.
  // TODO: Show animation while loading the resources.
  // TODO: Pass down resources via a context provider.

  return (
    <MemoryRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<FocusMode />} />
        <Route path="asteroids" element={<BlockedSites />} />
        <Route path="clusters" element={<Categories />} />
        <Route path="controlDeck" element={<Settings />} />
      </ReactRouterRoutes>
    </MemoryRouter>
  )
}

export { Routes }

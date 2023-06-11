import React from 'react'
import { MemoryRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { MissionControl } from './views/missionControl'
import { Stats } from './views/stats'
import { Quotes } from './views/quotes'

function Routes() {
  return (
    <MemoryRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<MissionControl />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/quotes" element={<Quotes />} />
      </ReactRouterRoutes>
    </MemoryRouter>
  )
}

export { Routes }

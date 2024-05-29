import React from 'react'
import { MemoryRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { MissionControl } from './views/missionControl'
import { Stats } from './views/stats'
import { Astros } from './views/astros'

function Routes() {
  return (
    <MemoryRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<MissionControl />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/astros" element={<Astros />} />
      </ReactRouterRoutes>
    </MemoryRouter>
  )
}

export { Routes }

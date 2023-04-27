import React from 'react'
import { MemoryRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { MissionControl } from './views/missionControl'

function Routes() {
  return (
    <MemoryRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<MissionControl />} />
      </ReactRouterRoutes>
    </MemoryRouter>
  )
}

export { Routes }

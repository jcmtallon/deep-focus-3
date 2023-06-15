import { PageLayout, SideNav, Card as BaseCard } from 'apps/content/components'
import { listBlockedSites } from 'services/store'
import React, { useEffect, useState } from 'react'
import { BlockedSite } from 'types'
import styled from 'styled-components'
import { MissionControlBlockedSites } from './MissionControlBlockedSites/MissionControlBlockedSites'

const Card = styled(BaseCard)`
  width: 100%;
`

function Stats() {
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])

  const getBlockedSites = async () => {
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }

  useEffect(() => {
    getBlockedSites()
  }, [])

  return (
    <PageLayout sideNav={<SideNav activeElement="stats" />}>
      <Card title="Blocked Sites">
        <MissionControlBlockedSites blockedSites={blockedSites} />
      </Card>
    </PageLayout>
  )
}

export { Stats }

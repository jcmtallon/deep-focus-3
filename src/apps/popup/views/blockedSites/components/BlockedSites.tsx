import { PopupPageLayout, PopupPageBodyLayout } from 'apps/popup/components'
import { listBlockedSites, deleteBlockedSite, addBlockedSite } from 'services/blockedSites'
import { Button, Chip, IconImpact, Input } from 'components'
import React, { KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BlockedSite } from 'types'

const ImpactNameInput: typeof Input = styled(Input)`
  width: 180px;
`

const ChipsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`

function BlockedSites() {
  const [blockedSiteName, setBlockedSiteName] = useState<string>('')
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])

  const fetchBlockedSiteData = useCallback(async () => {
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }, [])

  const handleDeleteBlockedSiteClick = async (id: number) => {
    await deleteBlockedSite(id)
    fetchBlockedSiteData()
  }

  const handleAddBlockedSiteClick = async () => {
    const urlFilter = blockedSiteName.trim()
    if (!urlFilter) {
      // eslint-disable-next-line no-alert -- TODO: Replace with toast or dialog.
      alert('Asteroid name missing')
      return
    }
    await addBlockedSite(blockedSiteName)
    setBlockedSiteName('')
    fetchBlockedSiteData()
  }

  const handleNameInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') handleAddBlockedSiteClick()
  }

  // Initial data fetch on load.
  useEffect(() => {
    fetchBlockedSiteData()
  }, [fetchBlockedSiteData])

  return (
    <PopupPageLayout hideHeader>
      <PopupPageBodyLayout
        title="Asteroids"
        subtitle="Those sites that could impact your focus"
        secondaryAction={
          <ImpactNameInput
            value={blockedSiteName}
            onKeyDown={handleNameInputKeyDown}
            onChange={e => setBlockedSiteName(e.target.value)}
            placeholder="Write a site name"
          />
        }
        primaryAction={
          <Button onClick={handleAddBlockedSiteClick} startIcon={<IconImpact />}>
            Add asteroid
          </Button>
        }>
        <ChipsWrapper>
          {blockedSites.map(({ url, id }) => (
            <Chip key={id} onDelete={() => handleDeleteBlockedSiteClick(id)}>
              {url}
            </Chip>
          ))}
        </ChipsWrapper>
      </PopupPageBodyLayout>
    </PopupPageLayout>
  )
}

export { BlockedSites }

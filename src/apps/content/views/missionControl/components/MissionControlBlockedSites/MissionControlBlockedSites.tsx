import React from 'react'
import { BlockedSite } from 'types'
import * as S from './MissionControlBlockedSites.styles'

interface MissionControlBlockedSitesProps {
  blockedSites: BlockedSite[]
}

function MissionControlBlockedSites(props: MissionControlBlockedSitesProps) {
  const { blockedSites } = props

  const largestCount = Math.max.apply(
    0,
    blockedSites.map(site => site.impactCount ?? 0),
  )

  return (
    <S.List>
      {blockedSites.map(blockedSite => (
        <S.ListItem>
          <S.Site>{blockedSite.url}</S.Site>
          <S.Bar>
            <S.BarFill style={{ width: `${((blockedSite.impactCount ?? 0) * 100) / largestCount}%` }} />
          </S.Bar>
          <S.Impacts>{blockedSite.impactCount ?? 0}</S.Impacts>
        </S.ListItem>
      ))}
    </S.List>
  )
}

export { MissionControlBlockedSites }

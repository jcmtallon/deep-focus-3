import React from 'react'
import { BlockedSite, FocusSession } from 'types'
import * as S from './MissionControlBlockedSites.styles'

interface MissionControlBlockedSitesProps {
  blockedSites: BlockedSite[]
  focusSessions: FocusSession[]
}

function MissionControlBlockedSites(props: MissionControlBlockedSitesProps) {
  const { blockedSites, focusSessions } = props

  const largestCount = 10

  const impactRecord = {} as Record<string, number>

  focusSessions.forEach(focusSession => {
    if (!focusSession.impacts) return

    Object.keys(focusSession.impacts).forEach(key => {
      if (impactRecord[key]) {
        impactRecord[key] += focusSession.impacts?.[key] ?? 0
      } else {
        impactRecord[key] = focusSession.impacts?.[key] ?? 0
      }
    })
  })

  return (
    <S.List>
      {blockedSites.map(blockedSite => (
        <S.ListItem>
          <S.Site>{blockedSite.url}</S.Site>
          <S.Bar>
            <S.BarFill style={{ width: `${((impactRecord[blockedSite.id] ?? 0) * 100) / largestCount}%` }} />
          </S.Bar>
          <S.Impacts>{impactRecord[blockedSite.id] ?? 0}</S.Impacts>
        </S.ListItem>
      ))}
    </S.List>
  )
}

export { MissionControlBlockedSites }

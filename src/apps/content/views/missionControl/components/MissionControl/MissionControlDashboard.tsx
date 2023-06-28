import React, { useCallback, useEffect, useState } from 'react'
import { PageLayout, SideNav } from 'apps/content/components'
import { getFocusSessionsByDay, listBlockedSites } from 'services/store'
import { BlockedSite, FocusSession } from 'types'
import { DateTime } from 'luxon'
import { MissionControlSessions } from '../MissionControlSessions'
import { MissionControlBlockedSites } from '../MissionControlBlockedSites'
import { MissionControlTasks } from '../MissionControlTasks'
import { MissionControlStats } from '../MissionControlStats'
import { MissionControlHeader } from '../MissionControlHeader'
import * as S from './MissionControlDashboard.styles'

interface MissionControlDashboardProps {}

function MissionControlDashboard(props: MissionControlDashboardProps) {
  const { ...otherProps } = props

  const [focusSessions, setFocusSession] = useState<FocusSession[]>([])
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now())
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])

  const getFocusSessions = useCallback(async () => {
    const focusSessions = await getFocusSessionsByDay(selectedDate)
    setFocusSession(focusSessions)
  }, [selectedDate])

  const getBlockedSites = async () => {
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }

  useEffect(() => {
    getFocusSessions()
  }, [getFocusSessions])

  useEffect(() => {
    getBlockedSites()
  }, [])

  return (
    <PageLayout sideNav={<SideNav activeElement="missionControl" />}>
      <S.Wrapper>
        <MissionControlHeader
          selectedDate={selectedDate}
          setSelectedDate={newDate => setSelectedDate(newDate)}
        />
        <S.Body>
          <S.Column>
            <S.Card title="Quote">Some quote here</S.Card>

            <S.Card>
              <MissionControlStats focusSessions={focusSessions} />
            </S.Card>

            <S.Card title="Sessions">
              <MissionControlSessions focusSessions={focusSessions} />
            </S.Card>
          </S.Column>
          <S.Column>
            <S.Card title="Blocked Sites">
              <MissionControlBlockedSites blockedSites={blockedSites} focusSessions={focusSessions} />
            </S.Card>
            <S.Card title="Quests">
              <MissionControlTasks focusSessions={focusSessions} />
            </S.Card>
          </S.Column>
          <S.Column>
            <S.Card title="Trip Journal">Under construction</S.Card>
          </S.Column>
        </S.Body>
      </S.Wrapper>
    </PageLayout>
  )
}
export { MissionControlDashboard }
export type { MissionControlDashboardProps }

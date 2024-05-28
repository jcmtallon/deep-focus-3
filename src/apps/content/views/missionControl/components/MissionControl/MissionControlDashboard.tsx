import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PageLayout, SideNav } from 'apps/content/components'
import { getFocusSessionsByDay } from 'services/store'
import { FocusSession } from 'types'
import { DateTime } from 'luxon'
import { getFocusSessionsTotalTime } from 'utils'
import { MissionControlHeader } from '../MissionControlHeader'
import * as S from './MissionControlDashboard.styles'
import { MissionControlDayProgress } from '../MissionControlDayProgress'
import { MissionControlSessions } from '../MissionControlSessions'
import { MissionControlDayTimeline } from './MissionControlDayTimeline'

interface MissionControlDashboardProps {}

function MissionControlDashboard(props: MissionControlDashboardProps) {
  const { ...otherProps } = props

  const [focusSessions, setFocusSession] = useState<FocusSession[]>([])
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now())
  // const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])

  const getFocusSessions = useCallback(async () => {
    const focusSessions = await getFocusSessionsByDay(selectedDate)
    setFocusSession(focusSessions)
  }, [selectedDate])

  // const getBlockedSites = async () => {
  //   const blockedSites = await listBlockedSites()
  //   setBlockedSites(blockedSites)
  // }

  useEffect(() => {
    getFocusSessions()
  }, [getFocusSessions])

  // useEffect(() => {
  //   getBlockedSites()
  // }, [])

  const totalTime = useMemo(() => getFocusSessionsTotalTime(focusSessions), [focusSessions])

  return (
    <PageLayout sideNav={<SideNav activeElement="missionControl" />}>
      <S.Wrapper>
        <MissionControlHeader
          selectedDate={selectedDate}
          setSelectedDate={newDate => setSelectedDate(newDate)}
        />
        <MissionControlDayProgress focusSessions={focusSessions} />

        <S.Body>
          <S.Column>
            <S.TimeDetailsContainer>
              <S.Date>{selectedDate.toFormat('LLLL dd')}</S.Date>
              <S.TimeDisplay formattedTime={totalTime.toFormat('hh:mm:ss')} />
            </S.TimeDetailsContainer>
            <MissionControlSessions focusSessions={focusSessions} />
          </S.Column>
          <S.Column>
            <S.Quote>&ldquo;Focus on just one thing at a time&ldquo;</S.Quote>
            <MissionControlDayTimeline focusSessions={focusSessions} />
          </S.Column>
          {/* <S.Column>
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
          </S.Column> */}
        </S.Body>
      </S.Wrapper>
    </PageLayout>
  )
}
export { MissionControlDashboard }
export type { MissionControlDashboardProps }

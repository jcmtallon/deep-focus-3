import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PageLayout, SideNav } from 'apps/content/components'
import { getFocusSessionsByDay } from 'services/store'
import { Category, FocusSession } from 'types'
import { DateTime } from 'luxon'
import { getFocusSessionsTotalTime } from 'utils'
import { MissionControlHeader } from '../MissionControlHeader'
import * as S from './MissionControlDashboard.styles'
import { MissionControlDayProgress } from '../MissionControlDayProgress'
import { MissionControlSessions } from '../MissionControlSessions'
import { MissionControlDayTimeline } from './MissionControlDayTimeline'
import { MissionControlCategoryDetails } from './MissionControlCategoryDetails'
import { MissionControlProductivityAnalysis } from './MissionControlProductivityAnalysis'

interface MissionControlDashboardProps {
  categories: Category[]
}

function MissionControlDashboard(props: MissionControlDashboardProps) {
  const { categories } = props

  const [focusSessions, setFocusSession] = useState<FocusSession[]>([])
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now())

  const getFocusSessions = useCallback(async () => {
    const focusSessions = await getFocusSessionsByDay(selectedDate)
    setFocusSession(focusSessions)
  }, [selectedDate])

  useEffect(() => {
    getFocusSessions()
  }, [getFocusSessions])

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
              <MissionControlProductivityAnalysis totalTime={totalTime} focusSessions={focusSessions} />
            </S.TimeDetailsContainer>
            <MissionControlCategoryDetails categories={categories} focusSessions={focusSessions} />
            <MissionControlSessions categories={categories} focusSessions={focusSessions} />
          </S.Column>
          <S.Column>
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

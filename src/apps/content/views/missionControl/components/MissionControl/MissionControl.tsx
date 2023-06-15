import { PageLayout, SideNav } from 'apps/content/components'
import React, { useCallback, useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { listBlockedSites, getFocusSessionsByDay, getActiveFocusSession } from 'services/store'
import { BlockedSite, FocusSession } from 'types'
import { DateTime } from 'luxon'
import * as S from './MissionControl.styles'
import { MissionControlSessions } from '../MissionControlSessions'
import { MissionControlBlockedSites } from '../MissionControlBlockedSites'
import { MissionControlTasks } from '../MissionControlTasks'
import { MissionControlStats } from '../MissionControlStats'
import { MissionControlHeader } from '../MissionControlHeader'

function MissionControl() {
  const [type, setType] = useState<string | null>()
  const [isFocusModeOn, setIsFocusModeOn] = useState<boolean | null>(null)
  const [focusSessions, setFocusSession] = useState<FocusSession[]>([])
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now())

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const blockType = queryParams.get('blockType')
    const siteId = queryParams.get('site')?.toString()

    if (blockType === 'site' && siteId) {
      const addImpact = async () => {
        await sendMessage('addImpact', { siteId })
      }

      addImpact()
    }

    if (blockType) setType(blockType)
  }, [])

  const getFocusModeStatus = useCallback(async () => {
    const session = await getActiveFocusSession()
    const focusSessions = await getFocusSessionsByDay(selectedDate)
    const focusModeOn = session !== undefined
    setIsFocusModeOn(focusModeOn)
    setFocusSession(focusSessions)
  }, [selectedDate])

  const getBlockedSites = async () => {
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }

  useEffect(() => {
    getFocusModeStatus()
    getBlockedSites()
  }, [getFocusModeStatus])

  useEffect(() => {
    // TODO: Listen to messages from background so it can respond
    // to popup actions.
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.message === 'focusModeOn') {
        setIsFocusModeOn(true)
      }

      if (request.message === 'focusModeOff') {
        setIsFocusModeOn(false)
      }
    })
  }, [setIsFocusModeOn])

  return (
    <PageLayout sideNav={<SideNav activeElement="missionControl" />}>
      <S.Wrapper>
        <MissionControlHeader
          selectedDate={selectedDate}
          setSelectedDate={newDate => setSelectedDate(newDate)}
        />
        <S.Body>
          <S.Column>
            <S.Card title="Quote">
              <h2>{type === 'site' ? 'Blocked' : 'Mission Control'}</h2>
              <span>{isFocusModeOn === true ? 'Focus Mode: ON' : 'Focus Mode: OFF'}</span>
            </S.Card>

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

export { MissionControl }

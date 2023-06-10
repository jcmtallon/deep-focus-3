import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { listBlockedSites, getFocusSessionsByDay, getActiveFocusSession } from 'services/store'
import styled from 'styled-components'
import { BlockedSite, FocusSession } from 'types'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #15043b;
  color: white;

  display: flex;
  flex-direction: column;
`

function MissionControl() {
  const [type, setType] = useState<string | null>()
  const [isFocusModeOn, setIsFocusModeOn] = useState<boolean | null>(null)
  const [focusSessions, setFocusSession] = useState<FocusSession[]>([])
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])

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

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const session = await getActiveFocusSession()
      const focusSessions = await getFocusSessionsByDay(new Date())
      const focusModeOn = session !== undefined
      setIsFocusModeOn(focusModeOn)
      setFocusSession(focusSessions)
    }

    const getBlockedSites = async () => {
      const blockedSites = await listBlockedSites()
      setBlockedSites(blockedSites)
    }

    getFocusModeStatus()
    getBlockedSites()
  }, [])

  const getDuration = (startDate: number | undefined, endDate: number | undefined): string | number => {
    // Temp implementation
    if (!startDate || !endDate) return 0
    const start = DateTime.fromMillis(startDate)
    const end = DateTime.fromMillis(endDate!) // TODO: Dangerous
    const diff = end.diff(start)
    return diff.toFormat('hh:mm:ss')
  }

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
    <Wrapper>
      <h1>{type === 'site' ? 'Blocked' : 'Mission Control'}</h1>
      <span>{isFocusModeOn === true ? 'Focus Mode: ON' : 'Focus Mode: OFF'}</span>
      <h2>Sessions</h2>
      <div>
        {focusSessions.map(focusSession => (
          <div key={focusSession.sessionId}>{`${getDuration(
            focusSession.startDate,
            focusSession.endDate,
          )} Impacts: ${focusSession.stats.impacts}`}</div>
        ))}
      </div>
      <h2>Tasks</h2>
      <div>
        {focusSessions.flatMap(focusSession =>
          focusSession.tasks.map(task => <div key={task.id}>{task.title}</div>),
        )}
      </div>
      <h2>Blocked Sites</h2>
      <div>
        {blockedSites.map(blockedSite => (
          <div>{`${blockedSite.url}: ${blockedSite.impactCount ?? 0} impacts`}</div>
        ))}
      </div>
    </Wrapper>
  )
}

export { MissionControl }

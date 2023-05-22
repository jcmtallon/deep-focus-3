import React, { useEffect, useState } from 'react'
import { getFocusSessionsByDay } from 'services/focusSessions'
import { getFocusModeDetails } from 'services/store'
import styled from 'styled-components'
import { FocusSession } from 'types'

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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const blockType = queryParams.get('blockType')
    if (blockType) setType(blockType)
  }, [])

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const session = await getFocusModeDetails()
      const focusSessions = await getFocusSessionsByDay(new Date())
      const focusModeOn = session !== undefined
      setIsFocusModeOn(focusModeOn)
      setFocusSession(focusSessions)
    }

    getFocusModeStatus()
  }, [])

  const getDuration = (startDate: number | undefined, endDate: number | undefined): number => {
    // Temp implementation
    if (!startDate || !endDate) return 0
    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    const diffTime = Math.abs(date2.valueOf() - date1.valueOf())

    console.log(diffTime)
    const diffDays = Math.ceil(diffTime / 1000)
    return diffDays
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
    </Wrapper>
  )
}

export { MissionControl }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "showFocusDialog") {
//     chrome.storage.local.get(["deepFocus_focusModeOn"]).then((result) => {
//       const isFocusOn = result["deepFocus_focusModeOn"];
//       if (isFocusOn){
//         showEndFocusModeDialog();
//       }else{
//         showStartFocusModeDialog();
//       }
//       sendResponse({ message: "success" });
//     }).catch(err => {});
//   }
// });

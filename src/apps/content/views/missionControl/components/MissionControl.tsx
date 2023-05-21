import React, { useEffect, useState } from 'react'
import { ListSessions } from 'services/sessions'
import { getFocusModeDetails } from 'services/store'
import styled from 'styled-components'
import { Session } from 'types'

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
  const [focusSessions, setFocusSession] = useState<Session[]>([])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const blockType = queryParams.get('blockType')
    if (blockType) setType(blockType)
  }, [])

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const session = await getFocusModeDetails()
      const focusSessions = await ListSessions()
      const focusModeOn = session !== undefined
      setIsFocusModeOn(focusModeOn)
      setFocusSession(focusSessions)
    }

    getFocusModeStatus()
  }, [])

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
      <span>{type === 'site' ? 'Blocked' : 'Mission Control'}</span>
      <span>{isFocusModeOn === true ? 'Focus Mode ON' : 'Focus Mode OFF'}</span>
      <div>
        {focusSessions.map((focusSession, index) => (
          <div key={focusSession.sessionId}>{`${index}-Task Count:${focusSession.tasks.length}`}</div>
        ))}
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

import React, { useEffect, useState } from 'react'
import { FocusSession } from 'types'
import styled from 'styled-components'
import { countFocusSessionImpacts } from 'utils'
import { DateTime } from 'luxon'

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;

  z-index: 100; // TODO: Think a proper z-index scale
  background-color: #15043b;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Timer = styled.div`
  color: white;
  font-size: 60px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  margin-bottom: 60px;
`

const Quests = styled.div`
  color: #2dbe90;
  white-space: nowrap;
  font-size: 30px;
  font-weight: 700;
`

const Impacts = styled.div`
  color: #e05022;
  white-space: nowrap;
  font-size: 30px;
  font-weight: 700;
`

interface FocusModeFinishedSessionBackdropProps {
  focusSession: FocusSession | null
  open: boolean
  setOpen: (open: boolean) => void
}

// TODO: Same logic as in MissionControlBlockedSiteBackdrop.tsx
// Consider abstracting a common hook.
function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isMounted && !shouldRender) {
      setShouldRender(true)
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])

  return shouldRender
}

function FocusModeFinishedSessionBackdrop(props: FocusModeFinishedSessionBackdropProps) {
  const { focusSession, open, setOpen } = props
  const shouldRenderChild = useDelayUnmount(open, 300)
  const mountedStyle = { animation: 'slideInAnimation 500ms cubic-bezier(0.33, 1, 0.68, 1)' }
  const unmountedStyle = { animation: 'slideOutAnimation 520ms cubic-bezier(0.32, 0, 0.67, 0)' }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (open) timeoutId = setTimeout(() => setOpen(false), 2000)
    return () => clearTimeout(timeoutId)
  }, [open, setOpen])

  const getSessionTime = (focusSession: FocusSession) => {
    const start = DateTime.fromMillis(focusSession.startDate)
    const end = DateTime.fromMillis(focusSession.endDate!) // TODO: Dangerous
    const diff = end.diff(start)
    return diff.toFormat('hh:mm:ss')
  }

  return (
    <>
      {shouldRenderChild && focusSession && (
        <Backdrop style={open ? mountedStyle : unmountedStyle}>
          <Container>
            <Timer>{getSessionTime(focusSession)}</Timer>
            <Quests>{`${
              focusSession.tasks.filter(t => t.status === 'COMPLETED').length ?? 0
            } quests`}</Quests>
            <Impacts>{`${countFocusSessionImpacts(focusSession.impacts)} impacts`}</Impacts>
          </Container>
        </Backdrop>
      )}
    </>
  )
}

export { FocusModeFinishedSessionBackdrop }

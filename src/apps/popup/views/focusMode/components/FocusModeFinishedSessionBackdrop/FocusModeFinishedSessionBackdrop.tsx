import React, { useEffect, useState } from 'react'
import { FocusSession } from 'types'
import styled from 'styled-components'
import {
  calculateFocusSessionPoints,
  countFocusSessionImpacts,
  getFocusSessionTime,
  getStarCountByFocusSessionTotalPoints,
} from 'utils'
import { IconStar } from 'components'

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

const TimePoints = styled.div`
  color: white;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Quests = styled.div`
  color: #2dbe90;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Impacts = styled.div`
  color: #e05022;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Star = styled(IconStar)`
  fill: #2d1b6c;
  position: absolute;
  width: 80px;
  height: 80px;
`

const IconWrapper = styled.div`
  position: relative;
  width: 240px;
  height: 40px;
`

const TotalPoints = styled.div`
  color: white;
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 30px;
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
    if (open) timeoutId = setTimeout(() => setOpen(false), 4000)
    return () => clearTimeout(timeoutId)
  }, [open, setOpen])

  if (!shouldRenderChild || !focusSession) return <></>

  const sessionTime = getFocusSessionTime(focusSession)
  const points = calculateFocusSessionPoints(focusSession)
  const starCount = getStarCountByFocusSessionTotalPoints(points.totalPoints)

  return (
    <Backdrop style={open ? mountedStyle : unmountedStyle}>
      <Container>
        <Timer>{sessionTime.toFormat('hh:mm:ss')}</Timer>
        <TimePoints>
          <span>Time</span>
          <span>{`${points.pointsByTime}pts`}</span>
        </TimePoints>
        <Quests>
          <span>{`${focusSession.tasks.filter(t => t.status === 'COMPLETED').length ?? 0} quests`}</span>
          <span>{`${points.pointsByTasks}pts`}</span>
        </Quests>
        <Impacts>
          <span>{`${countFocusSessionImpacts(focusSession.impacts)} impacts`}</span>
          <span>{`-${points.pointsByImpacts}pts`}</span>
        </Impacts>
        <TotalPoints>{`${points.totalPoints}pts`}</TotalPoints>
        <IconWrapper>
          <Star style={{ top: '26px', left: '0px', fill: starCount > 0 ? '#E8BB3F' : '#2d1b6c' }} />
          <Star style={{ top: '0px', left: '80px', fill: starCount > 1 ? '#E8BB3F' : '#2d1b6c' }} />
          <Star style={{ top: '26px', right: '0px', fill: starCount > 2 ? '#E8BB3F' : '#2d1b6c' }} />
        </IconWrapper>
      </Container>
    </Backdrop>
  )
}

export { FocusModeFinishedSessionBackdrop }

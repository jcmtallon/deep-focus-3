import React from 'react'
import styled from 'styled-components'

interface FocusModeStatsProps {
  focusModeActive?: boolean
}

const Wrapper = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-items: center;
`

const Date = styled.div`
  font-size: 14px;
`

const Timer = styled.div`
  font-size: 60px;
  font-weight: 700;
  line-height: 1;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`
const StatsWrapper = styled.div<{ endAlign: boolean }>`
  display: flex;
  justify-content: ${props => (props.endAlign ? 'end' : 'space-between')};
  flex: 1;
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  column-gap: 12px;
`

const Sessions = styled.div`
  color: #e8bb3f;
  white-space: nowrap;
`

const Quests = styled.div`
  color: #2dbe90;
  white-space: nowrap;
`

const Impacts = styled.div`
  color: #e05022;
  white-space: nowrap;
`

function FocusModesStats(props: FocusModeStatsProps) {
  const { focusModeActive = false } = props

  return (
    <Wrapper>
      {/* TODO: Calculate session number */}
      <Date>{focusModeActive ? 'Session 1' : '02/05/2023'}</Date>
      <Timer>00:00:00</Timer>
      <StatsWrapper endAlign={focusModeActive}>
        {!focusModeActive && <Sessions>0 sessions</Sessions>}
        <Quests>0 quests</Quests>
        <Impacts>0 impacts</Impacts>
      </StatsWrapper>
    </Wrapper>
  )
}

export { FocusModesStats }
export type { FocusModeStatsProps }

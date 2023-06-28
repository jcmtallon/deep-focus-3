import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-items: center;
`

const Date = styled.div`
  font-size: 14px;
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

const BarWrapper = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`

const BarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10px;
  background-color: transparent;
`

const Bar = styled.div`
  height: 10px;
  border-radius: 10px;
`

const TimeBar = styled(Bar)`
  background-color: white;
`

const SessionsBar = styled(Bar)`
  background-color: #e8bb3f;
`

const TasksBar = styled(Bar)`
  background-color: #2dbe90;
`

const ImpactsBar = styled(Bar)`
  background-color: #e05022;
`

const PointBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #180850;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
`

const PointBarFill = styled.div`
  height: 10px;
  background-color: #fff9b0;
  border-radius: 8px;
  position: relative;
`

const AwardLabel = styled.div`
  position: absolute;
  font-size: 10px;
  text-align: center;
  color: white;
  white-space: nowrap;
`

export {
  AwardLabel,
  BarContainer,
  BarWrapper,
  Date,
  Impacts,
  ImpactsBar,
  Quests,
  Sessions,
  SessionsBar,
  StatsWrapper,
  TasksBar,
  TimeBar,
  Wrapper,
  PointBar,
  PointBarFill,
}

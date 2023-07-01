import styled from 'styled-components'
import { IconChecked, IconStar } from 'components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  min-height: 100px;
  position: relative;
`

const TimeColumn = styled.div`
  height: 100%;
  width: 48px;
  display: flex;
  flex-direction: column;
`

const Time = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`

const TimeSeparator = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  flex: 1;
  margin-left: 50%;
  border-left: 1px solid white;
`

const PerformanceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 2px;
`

const Star = styled(IconStar)`
  fill: #2d1b6c;
  width: 21px;
  height: 21px;
`

const TasksWrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  display: flex;
  flex-direction: column;
  align-items: end;
`

const TaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`

const TaskLabel = styled.div``

const Checked = styled(IconChecked)`
  fill: #2dbe90;
  width: 18px;
  height: 18px;
`

const Duration = styled.div`
  position: absolute;
  left: 36px;
  font-size: 10px;
  font-weight: 700;
`

const ImpactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 3px;
  row-gap: 3px;
`

const Impact = styled.div`
  background: #c92626;
  border-radius: 50%;
  width: 8px;
  height: 8px;
`

export {
  Checked,
  Duration,
  ImpactContainer,
  Impact,
  PerformanceColumn,
  Star,
  StarContainer,
  TaskContainer,
  TaskLabel,
  TasksWrapper,
  Time,
  TimeColumn,
  TimeSeparator,
  Wrapper,
}

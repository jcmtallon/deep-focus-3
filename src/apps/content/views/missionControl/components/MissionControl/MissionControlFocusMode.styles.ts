import styled from 'styled-components'
import { StopwatchTimer, FocusSessionProgressBar } from 'components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  row-gap: 200px;
  flex-direction: column;
`

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Quote = styled.div`
  color: #b8afcc;
  font-size: 30px;
  font-style: italic;
`

const ProgressBar = styled(FocusSessionProgressBar)``

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FocusTaskSubtitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #6046cd;
`

const Task = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #e4e4f8;
`

const TimeDisplay = styled(StopwatchTimer)`
  font-size: 120px;
`

export { ProgressBar, Wrapper, TimeDisplay, TopContainer, BottomContainer, Quote, FocusTaskSubtitle, Task }

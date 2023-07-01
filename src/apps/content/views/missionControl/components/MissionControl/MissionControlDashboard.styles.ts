import styled from 'styled-components'
import { TimerDisplay } from 'components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px;
  padding: 32px;
  width: 100%;
  height: 100%;
`

const Body = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 32px;
  width: 100%;
  height: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

const TimeDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-bottom: 40px;
`

const Date = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 6px;
`

const TimeDisplay = styled(TimerDisplay)`
  font-size: 100px;
`

const Quote = styled.div`
  font-size: 38px;
  font-style: italic;
  color: #b8afcc;
`

export { Wrapper, Body, Column, Date, TimeDisplay, TimeDetailsContainer, Quote }

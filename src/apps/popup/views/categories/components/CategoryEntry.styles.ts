import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  column-gap: 8px;
  padding-left: 2px;
`

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
`

const ColorBubble = styled.div`
  border-radius: 100%;
  border: 1px solid #1f2e70;
  width: 14px;
  height: 14px;
`

const IconXWrapper = styled.div`
  font-size: 10px;
  width: fit-content;
  height: fit-content;
`

export { Row, LabelWrapper, Label, ColorBubble, IconXWrapper }

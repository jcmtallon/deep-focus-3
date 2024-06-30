import styled from 'styled-components'

const Chip = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  column-gap: 6px;
  padding: 4px 16px;
  border-radius: 25px;

  font-size: 14px;
  font-weight: bold;
  color: #1e2b64;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ColorBubble = styled.div`
  border-radius: 100%;
  border: 1px solid #1f2e70;
  width: 20px;
  height: 20px;
`

export { Chip, Wrapper, ColorBubble }

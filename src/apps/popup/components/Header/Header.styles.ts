import styled from 'styled-components'
import { IconGear, IconQuestion } from 'components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 4px;
`

const Gear = styled(IconGear)`
  color: #e8bb3f;
`

const Question = styled(IconQuestion)`
  color: #e8bb3f;
`

export { Wrapper, Gear, Question }

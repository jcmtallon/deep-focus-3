import styled from 'styled-components'
import { IconStar } from 'components'

const List = styled.ul`
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  font-weight: 700;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`

const Duration = styled.div`
  flex-grow: 1;
  font-variant-numeric: tabular-nums;
`
const Awards = styled.div`
  flex-grow: 1;
  text-align: right;
  column-gap: 2px;
`
const Quests = styled.div`
  flex-grow: 1;
  text-align: right;
  color: #2dbe90;
`
const Impacts = styled.div`
  flex-grow: 1;
  text-align: right;
  color: #e05022;
`

const Counter = styled.div`
  margin-top: 10px;
  color: #a78ce1;
`

const Star = styled(IconStar)`
  fill: #2d1b6c;
  width: 20px;
  height: 20px;
`

export { List, ListItem, Duration, Awards, Quests, Impacts, Counter, Star }

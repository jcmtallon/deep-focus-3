import styled from 'styled-components'
import { IconStar } from 'components'

const List = styled.ul`
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  font-weight: 700;
  width: 100%;
`

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`

const Duration = styled.div`
  width: 33%;
  text-align: right;
  flex-grow: 1;
  font-variant-numeric: tabular-nums;
`
const Awards = styled.div`
  width: 33%;
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
  width: 33%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 3px;
  row-gap: 3px;
  justify-content: flex-end;
`

const Impact = styled.div`
  background: #c92626;
  border-radius: 50%;
  width: 8px;
  height: 8px;
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

export { List, Impact, ListItem, Duration, Awards, Quests, Impacts, Counter, Star }

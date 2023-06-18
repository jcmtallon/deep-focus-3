import styled from 'styled-components'

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

const Site = styled.div`
  flex-grow: 1;
`

const Bar = styled.div`
  display: flex;
  justify-content: end;
  width: 200px;
  height: 10px;
  background-color: transparent;
`

const BarFill = styled.div`
  height: 10px;
  background-color: #e05022;
  border-radius: 10px;
`

const Impacts = styled.div`
  width: 50px;
  text-align: right;
  color: #e05022;
`

const Counter = styled.div`
  margin-top: 10px;
  color: #a78ce1;
`

export { List, ListItem, Bar, Site, BarFill, Impacts, Counter }

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

const Counter = styled.div`
  margin-top: 10px;
  color: #a78ce1;
`

export { List, ListItem, Counter }

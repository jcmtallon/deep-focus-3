import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  height: 40px;
  align-items: center;
`

const Button = styled.button`
  height: 32px;
  padding: 4px 16px;
  border-radius: 4px;
  font-weight: 700;
  color: white;
  background-color: #15043b;
  border: 1px solid #15043b;

  :hover {
    background-color: #211450;
  }
`

const DateDisplay = styled.div`
  color: white;
  padding: 4px 8px;
`

export { Wrapper, Button, DateDisplay }

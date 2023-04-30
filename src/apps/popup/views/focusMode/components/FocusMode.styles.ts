import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  justify-content: space-between;
  padding: 34px;
  align-items: center;
`

const Timer = styled.div`
  font-size: 70px;
  font-weight: bold;
`

const Button = styled.button`
  background-color: #27b2f7;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border-radius: 6px;
  padding: 7px 28px;
  width: fit-content;
`

export { Button, Wrapper, Timer }

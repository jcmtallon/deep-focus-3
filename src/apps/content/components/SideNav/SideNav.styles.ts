import styled, { css } from 'styled-components'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
`

const Button = styled.button<{ active?: boolean }>`
  width: 80px;
  height: 80px;
  padding: 8px 8px;
  border-radius: 4px;
  font-weight: 700;
  color: white;
  background-color: #15043b;

  :hover {
    background-color: #211450;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #211450;
    `}
`

export { Nav, Button }

import styled, { css } from 'styled-components'

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 6px;
  border-top: 1px solid #27b2f7;
`

const Button = styled.button<{ active?: boolean }>`
  padding: 12px 18px;
  border-radius: 4px;
  background-color: #15043b;
  color: white;

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

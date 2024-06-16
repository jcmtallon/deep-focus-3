import React, { ButtonHTMLAttributes, DetailedHTMLProps, Ref, forwardRef } from 'react'
import styled from 'styled-components'

const Button = styled.button<{ active: boolean }>`
  color: #9294b4;
  background-color: transparent;

  height: 50px;
  width: 50px;
  font-size: 16px;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ active }) =>
    active &&
    `
    color: white;
  `}
`

interface NavButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  /**
   * Use it to indicate that the user is currently visiting
   * the page that this button represents.
   */
  active?: boolean
}

function NavButton(props: NavButtonProps, ref: Ref<HTMLButtonElement>) {
  const { active = false, ...rest } = props
  return <Button active={active} type="button" {...rest} ref={ref} />
}

const forwardRefNavButton = forwardRef(NavButton)

export { forwardRefNavButton as NavButton }
export type { NavButtonProps }

import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, Ref, forwardRef } from 'react'
import styled from 'styled-components'

const BaseButton = styled.button<{ size: 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #2669a9;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;

  height: 40px;

  &:hover {
    background-color: #2364a1;
  }

  &:active {
    background-color: #296dad;
  }
`

const StartIconWrapper = styled.span<{ iconOnly: boolean }>`
  display: flex;
  padding-right: ${props => (props.iconOnly ? '0px' : '8px')};
`

const Label = styled.span`
  display: flex;
`

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  /**
   * The size of the button.
   */
  size?: 'large'

  /**
   * The icon to display before the label.
   */
  startIcon?: ReactNode
}

function Button(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
  const { size = 'large', children, startIcon: propsStartIcon, ...rest } = props

  const startIcon = propsStartIcon && (
    <StartIconWrapper iconOnly={!children}>{propsStartIcon}</StartIconWrapper>
  )

  const label = <Label>{children}</Label>

  return (
    <BaseButton size={size} type="button" {...rest} ref={ref}>
      {startIcon}
      {label}
    </BaseButton>
  )
}

const forwardRefButton = forwardRef(Button)

export { forwardRefButton as Button }
export type { ButtonProps }

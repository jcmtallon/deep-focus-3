import React, { HTMLAttributes, ReactNode } from 'react'
import * as S from './FocusControlsLayout.styles'

interface FocusControlsLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Heading at the top of the layout.
   */
  heading?: ReactNode

  /**
   * Body of the layout.
   */
  body?: ReactNode

  /**
   * Main action at the bottom of the layout.
   */
  mainAction?: ReactNode

  /**
   * Secondary action at the bottom of the layout.
   */
  secondaryAction?: ReactNode

  /**
   * Footer of the layout.
   */
  footer?: ReactNode
}

function FocusControlsLayout(props: FocusControlsLayoutProps) {
  const { heading, mainAction, secondaryAction, body, footer, ...otherProps } = props

  return (
    <S.Wrapper {...otherProps}>
      <S.Heading>{heading}</S.Heading>
      <S.Body>{body}</S.Body>
      <S.ActionsSection>
        {secondaryAction}
        {mainAction}
      </S.ActionsSection>
      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Wrapper>
  )
}

export { FocusControlsLayout }

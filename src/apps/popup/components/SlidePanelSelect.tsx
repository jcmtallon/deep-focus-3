import React, { HTMLAttributes } from 'react'
import { SlidePanel, SlidePanelProps } from './SlidePanel'
import * as S from './SlidePanelSelect.styles'

interface SlidePanelSelectProps extends SlidePanelProps {}

function SlidePanelSelect(props: SlidePanelSelectProps) {
  const { children, ...otherProps } = props

  return (
    <SlidePanel {...otherProps}>
      <S.Wrapper>
        <S.OptionsContainer>{children}</S.OptionsContainer>
      </S.Wrapper>
    </SlidePanel>
  )
}

interface SlidePanelSelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  selected: boolean
}

function SlidePanelSelectOption(props: SlidePanelSelectOptionProps) {
  const { children, ...otherProps } = props

  return <S.Option {...otherProps}>{children}</S.Option>
}

export { SlidePanelSelect }
export { SlidePanelSelectOption }

export type { SlidePanelSelectProps }
export type { SlidePanelSelectOptionProps }

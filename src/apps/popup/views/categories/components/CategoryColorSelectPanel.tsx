import { SlidePanel, SlidePanelProps } from 'components'
import React from 'react'
import { CategoryColor, getCategoryColorName } from 'utils'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 0px 20px;
  overflow: hidden;
`

const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0px 16px;
`

const Option = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 4px;
  border-bottom: 1px solid #9596b6;
  color: #9596b6;

  &:hover {
    background-color: #ffffff10;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: white;
      font-weight: bold;
    `}
`

const Label = styled.div`
  font-size: 14px;
`

const ColorBubble = styled.div`
  border-radius: 100%;
  border: 1px solid #1f2e70;
  width: 20px;
  height: 20px;
`

interface CategoryColorSelectPanelProps extends Omit<SlidePanelProps, 'children'> {
  selectedValue: string | undefined
  onColorSelect?: (color: string) => void
}

function CategoryColorSelectPanel(props: CategoryColorSelectPanelProps) {
  const { selectedValue, onColorSelect, ...rest } = props

  return (
    <SlidePanel {...rest}>
      <Wrapper>
        <OptionsContainer>
          {Object.keys(CategoryColor).map(colorValue => (
            <Option
              selected={selectedValue === colorValue}
              key={colorValue}
              onClick={() => onColorSelect?.(colorValue)}>
              <Label>{getCategoryColorName(colorValue)}</Label>
              <ColorBubble style={{ backgroundColor: colorValue }} />
            </Option>
          ))}
        </OptionsContainer>
      </Wrapper>
    </SlidePanel>
  )
}

export { CategoryColorSelectPanel }
export type { CategoryColorSelectPanelProps }

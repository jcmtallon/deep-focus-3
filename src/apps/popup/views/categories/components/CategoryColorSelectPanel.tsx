import React from 'react'
import { CategoryColor, getCategoryColorName } from 'utils'
import styled from 'styled-components'
import { SlidePanelSelect, SlidePanelSelectProps, SlidePanelSelectOption } from 'apps/popup/components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ColorBubble = styled.div`
  border-radius: 100%;
  border: 1px solid #1f2e70;
  width: 20px;
  height: 20px;
`

interface CategoryColorSelectPanelProps extends Omit<SlidePanelSelectProps, 'children'> {
  selectedValue: string | undefined
  onColorSelect?: (color: string) => void
}

function CategoryColorSelectPanel(props: CategoryColorSelectPanelProps) {
  const { selectedValue, onColorSelect, ...rest } = props

  return (
    <SlidePanelSelect {...rest}>
      {Object.keys(CategoryColor).map(colorValue => (
        <SlidePanelSelectOption
          selected={selectedValue === colorValue}
          key={colorValue}
          onClick={() => onColorSelect?.(colorValue)}>
          <Wrapper>
            <span>{getCategoryColorName(colorValue)}</span>
            <ColorBubble style={{ backgroundColor: colorValue }} />
          </Wrapper>
        </SlidePanelSelectOption>
      ))}
    </SlidePanelSelect>
  )
}

export { CategoryColorSelectPanel }
export type { CategoryColorSelectPanelProps }

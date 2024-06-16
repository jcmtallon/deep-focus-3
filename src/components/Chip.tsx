import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { IconX } from './icons'

const Wrapper = styled.div`
  color: white;
  background-color: #255192;
  font-size: 14px;
  font-weight: normal;

  border-radius: 25px;
  padding: 2px 10px;
  width: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  column-gap: 6px;
`
const IconWrapper = styled.div`
  font-size: 10px;
  width: fit-content;
  height: fit-content;
`

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete?: () => void
}

function Chip(props: ChipProps) {
  const { children, onDelete, ...rest } = props

  const handleOnDelete: React.MouseEventHandler<HTMLDivElement> | undefined = e => {
    e.stopPropagation()
    onDelete?.()
  }

  return (
    <Wrapper {...rest}>
      <span>{children}</span>
      {onDelete && (
        <IconWrapper tabIndex={0} role="button" onClick={handleOnDelete}>
          <IconX />
        </IconWrapper>
      )}
    </Wrapper>
  )
}

export { Chip }
export type { ChipProps }

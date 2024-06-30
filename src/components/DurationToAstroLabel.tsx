import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { getAstroLabel, getNextAchievableAstroName, remainingDurationToAstro } from 'utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  font-size: 14px;
  color: #9596b6;
  white-space: nowrap;
  flex-wrap: nowrap;
  user-select: none;
`

const AstroLabel = styled.div`
  color: #a09780;
`

interface DurationToAstroLabelProps extends HTMLAttributes<HTMLDivElement> {
  totalSeconds: number
}

function DurationToAstroLabel(props: DurationToAstroLabelProps) {
  const { totalSeconds, ...otherProps } = props

  const nextAstroName = getNextAchievableAstroName(totalSeconds)
  const durationToNextAstro = nextAstroName ? remainingDurationToAstro(totalSeconds, nextAstroName) : null

  if (nextAstroName && durationToNextAstro) {
    return (
      <Wrapper {...otherProps}>
        <div>{`${durationToNextAstro.toFormat("h'h' m'm'")} to`}</div>
        <AstroLabel>{getAstroLabel(nextAstroName)}</AstroLabel>
      </Wrapper>
    )
  }

  return <></>
}

export { DurationToAstroLabel }
export type { DurationToAstroLabelProps }

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FocusSession } from 'types'
import {
  calculateDayProgress,
  calculateAstroRightPosition,
  calculateAchievedAstro,
  getFocusSessionsPointsBreakdown,
} from 'utils'
import { IconStar } from 'components'

const ProgressBar = styled.div`
  width: 100%;
  min-height: 10px;
  background-color: #180850;
  border-radius: 50px;
  margin-top: 10px;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #fff9b0;
  border-radius: 50px;
  position: absolute;
`

const Points = styled.div`
  position: absolute;
  font-size: 14px;
  font-style: italic;
  color: #e4e4f8;
`

const Astro = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`

const Star = styled(IconStar)`
  fill: #2d1b6c;
`

const AstroLabel = styled.div`
  color: #e4e4f8;
  font-style: italic;
  font-size: 14px;
`

interface MissionControlDayProgressProps extends HTMLAttributes<HTMLDivElement> {
  focusSessions: FocusSession[]
}

function MissionControlDayProgress(props: MissionControlDayProgressProps) {
  const { focusSessions = [], ...otherProps } = props
  const [, setWindowWidth] = useState(0)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Forces a re-render when the window is resized
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
  })

  const progressBarWidth = ref.current?.offsetWidth ?? 0
  const progressBarHeight = ref.current?.offsetHeight ?? 0

  const whiteDwarfSize = 20
  const redGiantSize = whiteDwarfSize * 1.15
  const superNovaSize = whiteDwarfSize * 1.3
  const neutronStarSize = whiteDwarfSize * 1.45
  const blackHoleSize = whiteDwarfSize * 1.6

  const pointsInfo = getFocusSessionsPointsBreakdown(focusSessions)

  const progress = calculateDayProgress(pointsInfo.total)
  const progressWithoutPenalty = calculateDayProgress(pointsInfo.gained)

  const astroPosition = calculateAstroRightPosition(progressBarWidth)
  const achievedAstro = calculateAchievedAstro(pointsInfo.total)
  const topOffset = progressBarHeight * 1.75

  return (
    <ProgressBar ref={ref} {...otherProps}>
      <ProgressBarFill style={{ width: `${progressWithoutPenalty}%`, backgroundColor: 'red' }} />
      <ProgressBarFill style={{ width: `${progress}%` }} />
      <Astro
        style={{
          right: astroPosition.WHITE_DWARF,
          top: topOffset,
        }}>
        <AstroLabel>white dwarf</AstroLabel>
        <Star
          style={{
            width: whiteDwarfSize,
            height: whiteDwarfSize,
            fill: achievedAstro.WHITE_DWARF ? '#E8BB3F' : undefined,
          }}
        />
      </Astro>
      <Astro style={{ right: astroPosition.RED_GIANT, top: topOffset }}>
        <AstroLabel>Red giant</AstroLabel>
        <Star
          style={{
            width: redGiantSize,
            height: redGiantSize,
            fill: achievedAstro.RED_GIANT ? '#E8BB3F' : undefined,
          }}
        />
      </Astro>
      <Astro style={{ right: astroPosition.SUPER_NOVA, top: topOffset }}>
        <AstroLabel>Super nova</AstroLabel>
        <Star
          style={{
            width: superNovaSize,
            height: superNovaSize,
            fill: achievedAstro.SUPER_NOVA ? '#E8BB3F' : undefined,
          }}
        />
      </Astro>
      <Astro style={{ right: astroPosition.NEUTRON_STAR, top: topOffset }}>
        <AstroLabel>Neutron star</AstroLabel>
        <Star
          style={{
            width: neutronStarSize,
            height: neutronStarSize,
            fill: achievedAstro.NEUTRON_STAR ? '#E8BB3F' : undefined,
          }}
        />
      </Astro>
      <Astro style={{ right: astroPosition.BLACK_HOLE, top: topOffset }}>
        <AstroLabel>Black hole</AstroLabel>
        <Star
          style={{
            width: blackHoleSize,
            height: blackHoleSize,
            fill: achievedAstro.BLACK_HOLE ? '#E8BB3F' : undefined,
          }}
        />
      </Astro>
      <Points style={{ top: topOffset }}>{pointsInfo.total} pts</Points>
    </ProgressBar>
  )
}

export { MissionControlDayProgress }
export type { MissionControlDayProgressProps }

import { PopupPageLayout } from 'apps/popup/components'
import React, { useMemo } from 'react'
import { Button, CircularProgress, DurationToAstroLabel, IconPlay, TimerDisplay } from 'components'
import { FocusSession } from 'types'
import styled from 'styled-components'
import { getFocusSessionsTotalTime } from 'utils'
import { FocusControlsLayout } from './FocusControlsLayout'
import { FocusControlsCategorySelect } from './FocusControlsCategorySelect'

const StartButton = styled(Button)`
  width: 100%;
`

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface FocusControlsIdleProps {
  categoryId?: number | undefined
  focusSessions: FocusSession[]

  onStartSessionClick?: () => void
  onCategoryIdChange?: (categoryId: number | undefined) => void
}

function FocusControlsIdle(props: FocusControlsIdleProps) {
  const { categoryId, focusSessions, onStartSessionClick, onCategoryIdChange } = props

  // TODO: Pass category to onStartSessionClick

  const totalDuration = useMemo(() => getFocusSessionsTotalTime(focusSessions), [focusSessions])

  return (
    <PopupPageLayout hideHeader>
      <FocusControlsLayout
        heading="Ready to focus?"
        body={
          <CircularProgress>
            <TimerContainer>
              <TimerDisplay time={totalDuration} />
              <DurationToAstroLabel totalSeconds={totalDuration.shiftTo('seconds').seconds} />
            </TimerContainer>
          </CircularProgress>
        }
        secondaryAction={
          // TODO: add option for deselecting
          <FocusControlsCategorySelect categoryId={categoryId} onCategoryIdChange={onCategoryIdChange} />
        }
        mainAction={
          <StartButton onClick={() => onStartSessionClick?.()} startIcon={<IconPlay />}>
            {`Start Session ${focusSessions.length + 1}`}
          </StartButton>
        }
      />
    </PopupPageLayout>
  )
}

export { FocusControlsIdle }

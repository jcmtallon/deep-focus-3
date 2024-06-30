import { PopupPageLayout } from 'apps/popup/components'
import React from 'react'
import { ActiveFocusSession, FocusSession } from 'types'
import { ActiveFocusSessionProgressStats, Button, IconCheckCircle } from 'components'
import styled from 'styled-components'
import { FocusControlsLayout } from './FocusControlsLayout'
import { FocusControlsCategorySelect } from './FocusControlsCategorySelect'

const FinishButton = styled(Button)`
  width: 100%;
`

interface FocusControlsActiveSessionProps {
  activeFocusSession: ActiveFocusSession
  focusSessions: FocusSession[]
  categoryId?: number | undefined

  onCategoryIdChange?: (categoryId: number | undefined) => void
  onFinishSessionClick?: (session: ActiveFocusSession) => void
}

function FocusControlsActiveSession(props: FocusControlsActiveSessionProps) {
  const { onFinishSessionClick, categoryId, onCategoryIdChange, activeFocusSession, focusSessions } = props

  return (
    <PopupPageLayout hideFooter>
      <FocusControlsLayout
        heading={<></>}
        body={
          <ActiveFocusSessionProgressStats
            activeFocusSession={activeFocusSession}
            focusSessions={focusSessions}
          />
        }
        secondaryAction={
          <FocusControlsCategorySelect categoryId={categoryId} onCategoryIdChange={onCategoryIdChange} />
        }
        mainAction={
          <FinishButton
            startIcon={<IconCheckCircle />}
            onClick={() => onFinishSessionClick?.(activeFocusSession)}>
            {`Finish session ${focusSessions.length + 1}`}
          </FinishButton>
        }
      />
    </PopupPageLayout>
  )
}

export { FocusControlsActiveSession }

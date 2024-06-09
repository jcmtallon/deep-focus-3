import React, { useEffect, useState } from 'react'
import { PageLayout } from 'apps/content/components'
import { FocusSession } from 'types'
import { sendMessage } from 'services/actions'
import { countFocusSessionImpacts } from 'utils'
import { getActiveFocusSession as storeGetActiveFocusSession } from 'services/store'
import { MissionControlBlockedSiteBackdrop } from '../MissionControlBlockedSiteBackdrop'
import * as S from './MissionControlFocusMode.styles'

interface MissionControlFocusModeProps {
  activeFocusSession: FocusSession
}

function MissionControlFocusMode(props: MissionControlFocusModeProps) {
  const { activeFocusSession } = props

  const [focusSession, setFocusSession] = useState<FocusSession>(activeFocusSession)

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false)

  useEffect(() => {
    const getActiveFocusSession = async () => {
      const session = await storeGetActiveFocusSession()
      if (session) setFocusSession(session)
    }

    const queryParams = new URLSearchParams(window.location.search)
    const blockType = queryParams.get('blockType')
    const siteId = queryParams.get('site')?.toString()

    if (blockType === 'site' && siteId) {
      const addImpact = async () => {
        await sendMessage('addImpact', { siteId })
      }
      addImpact()
      setOpenBackdrop(true)

      setTimeout(() => {
        // FIXME: Instead of using a timeout, we should bring the latest focusSession value from a callback.
        getActiveFocusSession()
      }, 200)
    }
  }, [])

  // const currentTaskTitle = focusSession.tasks[focusSession.tasks.length - 1].title
  const impactCount = countFocusSessionImpacts(focusSession.impacts)

  return (
    <PageLayout sideNav={<></>}>
      <S.Wrapper>
        <S.TopContainer>
          <S.TimeDisplay startTimestamp={focusSession.startDate} />
          <S.ProgressBar
            focusSession={focusSession}
            startDate={focusSession.startDate}
            width={540}
            height={14}
            impactCount={impactCount}
          />
        </S.TopContainer>
        <S.BottomContainer>
          <S.FocusTaskSubtitle>your current task</S.FocusTaskSubtitle>
          <S.Task>Show category here</S.Task>
        </S.BottomContainer>
        <></>
      </S.Wrapper>
      <MissionControlBlockedSiteBackdrop open={openBackdrop} setIsOpen={setOpenBackdrop} />
    </PageLayout>
  )
}

export { MissionControlFocusMode }
export type { MissionControlFocusModeProps }

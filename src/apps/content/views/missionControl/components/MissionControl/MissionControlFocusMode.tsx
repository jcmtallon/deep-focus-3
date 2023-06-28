import React, { useEffect, useState } from 'react'
import { PageLayout } from 'apps/content/components'
import { FocusSession } from 'types'
import { sendMessage } from 'services/actions'
import { countFocusSessionImpacts } from 'utils'
import { MissionControlBlockedSiteBackdrop } from '../MissionControlBlockedSiteBackdrop'
import * as S from './MissionControlFocusMode.styles'

interface MissionControlFocusModeProps {
  focusSession: FocusSession
}

function MissionControlFocusMode(props: MissionControlFocusModeProps) {
  const { focusSession } = props

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const blockType = queryParams.get('blockType')
    const siteId = queryParams.get('site')?.toString()

    if (blockType === 'site' && siteId) {
      const addImpact = async () => {
        await sendMessage('addImpact', { siteId })
      }
      addImpact()
      setOpenBackdrop(true)
    }
  }, [])

  const currentTaskTitle = focusSession.tasks[focusSession.tasks.length - 1].title
  const impactCount = countFocusSessionImpacts(focusSession.impacts)

  return (
    <PageLayout sideNav={<></>}>
      <S.Wrapper>
        <S.TopContainer>
          <S.Quote>&ldquo;Focus on one thing at a time&ldquo;</S.Quote>
          <S.TimeDisplay startTimestamp={focusSession.startDate} />
          <S.ProgressBar
            startDate={focusSession.startDate}
            width={540}
            height={14}
            impactCount={impactCount}
          />
        </S.TopContainer>
        <S.BottomContainer>
          <S.FocusTaskSubtitle>your current task</S.FocusTaskSubtitle>
          <S.Task>{currentTaskTitle}</S.Task>
        </S.BottomContainer>
        <></>
      </S.Wrapper>
      <MissionControlBlockedSiteBackdrop open={openBackdrop} setIsOpen={setOpenBackdrop} />
    </PageLayout>
  )
}

export { MissionControlFocusMode }
export type { MissionControlFocusModeProps }

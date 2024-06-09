import { DateTime, Duration } from 'luxon'
import React, { useMemo } from 'react'
import { FocusSession } from 'types'
import { countFocusSessionImpacts, getFocusSessionsPenaltyTime } from 'utils'

interface MissionControlProductivityAnalysisProps {
  focusSessions: FocusSession[]
  totalTime: Duration
}

function MissionControlProductivityAnalysis(props: MissionControlProductivityAnalysisProps) {
  const { focusSessions, totalTime } = props

  const efficiency = useMemo(() => {
    if (focusSessions.length < 1) return ''

    const firstSessionStarDate = focusSessions[0].startDate
    const lastSessionEndDate = focusSessions[focusSessions.length - 1].endDate

    // FIXME: Considering narrowing down the endTime type so it is never nullable by this point.
    if (!lastSessionEndDate) {
      return ''
    }

    const durationBetweenFirstAndLastSession = DateTime.fromMillis(lastSessionEndDate)
      .diff(DateTime.fromMillis(firstSessionStarDate))
      .toMillis()

    const totalPenaltyDuration = focusSessions.reduce((acc: Duration, focusSession: FocusSession) => {
      const penaltyDuration = Duration.fromObject({
        seconds: getFocusSessionsPenaltyTime(countFocusSessionImpacts(focusSession.impacts)),
      })
      return acc.plus(penaltyDuration)
    }, Duration.fromObject({ seconds: 0 }))

    const productiveTime = totalTime.minus(totalPenaltyDuration)
    const productiveTimesInMillis = productiveTime.toMillis()
    const sanitizedProductiveTime = productiveTimesInMillis < 0 ? 0 : productiveTimesInMillis

    const efficiency = Math.floor((sanitizedProductiveTime * 100) / durationBetweenFirstAndLastSession)

    return `Penalty: ${totalPenaltyDuration.toFormat('m')} mins __  Effectivity: ${efficiency}%`
  }, [focusSessions, totalTime])

  return <>{efficiency}</>
}

export { MissionControlProductivityAnalysis }

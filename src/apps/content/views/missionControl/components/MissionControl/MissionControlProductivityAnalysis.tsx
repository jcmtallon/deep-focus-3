import { DateTime, Duration } from 'luxon'
import React, { useEffect, useMemo, useState } from 'react'
import { DEFAULT_SETTINGS, getSettings } from 'services/settings'
import { FocusSession, Settings } from 'types'
import { countFocusSessionImpacts, getFocusSessionsPenaltyTime } from 'utils'

interface MissionControlProductivityAnalysisProps {
  selectedDate: DateTime
  focusSessions: FocusSession[]
  totalTime: Duration
}

function MissionControlProductivityAnalysis(props: MissionControlProductivityAnalysisProps) {
  const { focusSessions, totalTime, selectedDate } = props

  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const fetchSettings = async () => {
      const set = await getSettings()
      setSettings(set)
    }

    fetchSettings()
  }, [])

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

    const { weekday } = selectedDate
    const targetFocus =
      weekday - 1 in settings.targetFocusDurationPerDay
        ? settings.targetFocusDurationPerDay[weekday - 1]
        : 300

    const targetFocusInMillis = targetFocus * 60 * 1000
    const progress = Math.floor((sanitizedProductiveTime * 100) / targetFocusInMillis)

    return `Progress: ${progress}% Penalty: ${totalPenaltyDuration.toFormat(
      'm',
    )} mins __  Effectivity: ${efficiency}%`
  }, [focusSessions, totalTime, selectedDate, settings.targetFocusDurationPerDay])

  return <>{efficiency}</>
}

export { MissionControlProductivityAnalysis }

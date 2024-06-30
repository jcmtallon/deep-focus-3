import React, { useState, HTMLAttributes, useEffect, useMemo } from 'react'
import {
  getFocusSessionPointsBreakdown,
  getFocusSessionProgress,
  getFocusSessionProgressWithPenalty,
  calculateStarLeftPosition,
  getStarCountByFocusSessionTotalPoints,
  durationToStar,
  countFocusSessionImpacts,
  getFocusSessionsPenaltyTime,
  getFocusSessionsTotalTime,
  remainingDurationToAstro,
} from 'utils'
import { FocusSession } from 'types'
import { Duration } from 'luxon'
import * as S from './FocusSessionProgressBar.styles'

interface FocusSessionProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  startDate: number
  width?: number
  height?: number
  impactCount?: number
  focusSession: FocusSession
  completedSessions?: FocusSession[]
}

function FocusSessionProgressBar(props: FocusSessionProgressBarProps) {
  const {
    width = 260,
    height = 10,
    impactCount,
    focusSession, // FIXME: focusSession and startDate overlap. Remove one
    completedSessions = [],
    ...otherProps
  } = props

  const [barProgress, setBarProgress] = useState({ withPenalty: 0, withoutPenalty: 0 })
  const [totalPoints, setTotalPoints] = useState(0)
  const [timeToStar, setTimeToStar] = useState<string>('')
  const [timeToAstro, setTimeToAstro] = useState<string>('')

  const completedSessionsTotalDuration = useMemo(
    () => getFocusSessionsTotalTime(completedSessions),
    [completedSessions],
  )

  useEffect(() => {
    const updateBar = () => {
      const { gained, penalty, total } = getFocusSessionPointsBreakdown(focusSession)
      const progress = getFocusSessionProgress(gained)
      const progressWithPenalty = getFocusSessionProgressWithPenalty(gained, penalty)
      setBarProgress({ withPenalty: progressWithPenalty, withoutPenalty: progress })
      setTotalPoints(total)

      const elapsedDuration = Duration.fromMillis(
        new Date().getTime() - new Date(focusSession.startDate).getTime(),
      )

      const penaltyDuration = Duration.fromObject({
        seconds: getFocusSessionsPenaltyTime(countFocusSessionImpacts(focusSession.impacts)),
      })

      const currentSessionDuration = elapsedDuration.minus(penaltyDuration)
      const dayTotalProgressDuration = currentSessionDuration
        .plus(completedSessionsTotalDuration)
        .shiftTo('seconds').seconds

      // Remaining minutes to achieve next star
      const durationToStarOne = durationToStar(currentSessionDuration, '1')
      const durationToStarTwo = durationToStar(currentSessionDuration, '2')
      const durationToStarThree = durationToStar(currentSessionDuration, '3')

      const durationToWhiteDwarf = remainingDurationToAstro(dayTotalProgressDuration, 'WHITE_DWARF')
      const durationToRedGiant = remainingDurationToAstro(dayTotalProgressDuration, 'RED_GIANT')
      const durationToSuperNova = remainingDurationToAstro(dayTotalProgressDuration, 'SUPER_NOVA')
      const durationToNeutronStar = remainingDurationToAstro(dayTotalProgressDuration, 'NEUTRON_STAR')
      const durationToBlackHole = remainingDurationToAstro(dayTotalProgressDuration, 'BLACK_HOLE')

      setTimeToStar(
        `${durationToStarOne.toFormat('m')} min, ${durationToStarTwo.toFormat(
          'm',
        )} min,  ${durationToStarThree.toFormat('m')} min`,
      )

      setTimeToAstro(
        `${durationToWhiteDwarf.toFormat('h:m')}m, ${durationToRedGiant.toFormat(
          'h:m',
        )}m, ${durationToSuperNova.toFormat('h:m')}m, ${durationToNeutronStar.toFormat(
          'h:m',
        )}m, ${durationToBlackHole.toFormat('h:m')}m`,
      )
    }

    // So the bar is painted right away when the component is mounted.
    updateBar()
    const interval = setInterval(() => updateBar(), 1000)

    return () => clearInterval(interval)
  }, [focusSession, completedSessionsTotalDuration])

  const starCount = getStarCountByFocusSessionTotalPoints(totalPoints)
  const left = calculateStarLeftPosition(width)
  const startOffset = height * 1.5
  const impactArray = Array.from(Array(impactCount).keys())

  return (
    <>
      <span>{timeToStar}</span>
      <span>{timeToAstro}</span>
      <S.ProgressBar style={{ height }} {...otherProps}>
        <S.ProgressBarFill
          style={{ backgroundColor: 'red', width: `${barProgress.withoutPenalty}%`, height }}
        />
        <S.ProgressBarFill style={{ width: `${barProgress.withPenalty}%`, height }} />
        <S.ImpactContainer
          style={{
            top: startOffset,
            maxWidth: `${left[1] / 2}px`,
            columnGap: height / 3,
            rowGap: height / 3,
          }}>
          {impactArray.map(_ => (
            <S.Impact style={{ width: height * 0.5, height: height * 0.5 }} />
          ))}
        </S.ImpactContainer>
        <S.Star
          style={{
            left: left[1] - height * 2,
            top: startOffset,
            width: height * 2,
            height: height * 2,
            fill: starCount > 0 ? '#E8BB3F' : '#2d1b6c',
          }}
        />
        <S.ThresholdBar style={{ left: left[1], top: startOffset }} />
        <S.Star
          style={{
            left: left[2] - height * 2.5,
            top: startOffset,
            width: height * 2.5,
            height: height * 2.5,
            fill: starCount > 1 ? '#E8BB3F' : '#2d1b6c',
          }}
        />
        <S.ThresholdBar style={{ left: left[2], top: startOffset }} />
        <S.Star
          style={{
            left: left[3] - height * 3,
            top: startOffset,
            width: height * 3,
            height: height * 3,
            fill: starCount > 2 ? '#E8BB3F' : '#2d1b6c',
          }}
        />
        <S.ThresholdBar style={{ left: left[3], top: startOffset }} />
      </S.ProgressBar>
    </>
  )
}

export { FocusSessionProgressBar }
export type { FocusSessionProgressBarProps }

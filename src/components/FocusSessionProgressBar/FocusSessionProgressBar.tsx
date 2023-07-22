import React, { useState, HTMLAttributes, useEffect } from 'react'
import {
  getFocusSessionPointsBreakdown,
  getFocusSessionProgress,
  getFocusSessionProgressWithPenalty,
  calculateStarLeftPosition,
  getStarCountByFocusSessionTotalPoints,
} from 'utils'
import { FocusSession } from 'types'
import * as S from './FocusSessionProgressBar.styles'

interface FocusSessionProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  startDate: number
  width?: number
  height?: number
  impactCount?: number
  focusSession: FocusSession
}

function FocusSessionProgressBar(props: FocusSessionProgressBarProps) {
  const { startDate, width = 260, height = 10, impactCount, focusSession, ...otherProps } = props

  const [barProgress, setBarProgress] = useState({ withPenalty: 0, withoutPenalty: 0 })
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const updateBar = () => {
      const { gained, penalty, total } = getFocusSessionPointsBreakdown(focusSession)
      const progress = getFocusSessionProgress(gained)
      const progressWithPenalty = getFocusSessionProgressWithPenalty(gained, penalty)
      setBarProgress({ withPenalty: progressWithPenalty, withoutPenalty: progress })
      setTotalPoints(total)
    }

    // So the bar is painted right away when the component is mounted.
    updateBar()
    const interval = setInterval(() => updateBar(), 1000)

    return () => clearInterval(interval)
  }, [startDate, focusSession])

  const starCount = getStarCountByFocusSessionTotalPoints(totalPoints)
  const left = calculateStarLeftPosition(width)
  const startOffset = height * 1.5
  const impactArray = Array.from(Array(impactCount).keys())

  return (
    <>
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

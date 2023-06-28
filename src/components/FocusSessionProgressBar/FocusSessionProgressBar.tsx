import React, { useState, HTMLAttributes, useEffect } from 'react'
import {
  calculateFocusSessionProgress,
  calculateStarLeftPosition,
  getStarCountByFocusSessionProgress,
} from 'utils'
import * as S from './FocusSessionProgressBar.styles'

interface FocusSessionProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  startDate: number
  width?: number
  height?: number
  impactCount?: number
}

function FocusSessionProgressBar(props: FocusSessionProgressBarProps) {
  const { startDate, width = 260, height = 10, impactCount, ...otherProps } = props

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // So the bar is painted right away when the component is mounted.
    setProgress(calculateFocusSessionProgress(startDate))
    const interval = setInterval(() => {
      setProgress(calculateFocusSessionProgress(startDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  const starCount = getStarCountByFocusSessionProgress(progress)
  const left = calculateStarLeftPosition(width)
  const startOffset = height * 1.5
  const impactArray = Array.from(Array(impactCount).keys()).filter(f => f !== 0)

  return (
    <>
      <S.ProgressBar {...otherProps}>
        <S.ProgressBarFill style={{ width: `${progress}%`, height }}>
          <S.Star
            style={{
              left: left[1] - height * 2,
              top: startOffset,
              width: height * 2,
              height: height * 2,
              fill: starCount > 0 ? '#E8BB3F' : '#2d1b6c',
            }}
          />
          <S.Star
            style={{
              left: left[2] - height * 2.5,
              top: startOffset,
              width: height * 2.5,
              height: height * 2.5,
              fill: starCount > 1 ? '#E8BB3F' : '#2d1b6c',
            }}
          />
          <S.Star
            style={{
              left: left[3] - height * 3,
              top: startOffset,
              width: height * 3,
              height: height * 3,
              fill: starCount > 2 ? '#E8BB3F' : '#2d1b6c',
            }}
          />
        </S.ProgressBarFill>
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
      </S.ProgressBar>
    </>
  )
}

export { FocusSessionProgressBar }
export type { FocusSessionProgressBarProps }

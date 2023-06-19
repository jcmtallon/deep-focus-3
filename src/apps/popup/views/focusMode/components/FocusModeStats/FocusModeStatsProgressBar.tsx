import { IconStar } from 'components'
import { DateTime } from 'luxon'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  calculateFocusSessionProgress,
  calculateStarLeftPosition,
  getStarCountByFocusSessionProgress,
} from 'utils'

interface FocusModeStatsProgressBarProps {
  startDate: number
}

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 10px;
  background-color: #180850;
  border-radius: 8px;
  margin-top: 10px;
`

const ProgressBar = styled.div`
  height: 10px;
  background-color: #fff9b0;
  border-radius: 8px;
  position: relative;
`

const Star = styled(IconStar)`
  fill: #2d1b6c;
  position: absolute;
  width: 23px;
  height: 23px;
`

function FocusModeStatsProgressBar(props: FocusModeStatsProgressBarProps) {
  const { startDate } = props

  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    // So the bar is painted right away when the component is mounted.
    setProgress(calculateFocusSessionProgress(startDate))
    const interval = setInterval(() => {
      setProgress(calculateFocusSessionProgress(startDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  const starCount = getStarCountByFocusSessionProgress(progress)
  const left = calculateStarLeftPosition(260, 13)

  return (
    <ProgressBarBackground>
      <ProgressBar style={{ width: `${progress}%` }}>
        <Star style={{ left: left[1], top: '-6px', fill: starCount > 0 ? '#E8BB3F' : '#2d1b6c' }} />
        <Star style={{ left: left[2], top: '-6px', fill: starCount > 1 ? '#E8BB3F' : '#2d1b6c' }} />
        <Star style={{ left: left[3], top: '-6px', fill: starCount > 2 ? '#E8BB3F' : '#2d1b6c' }} />
      </ProgressBar>
    </ProgressBarBackground>
  )
}

export { FocusModeStatsProgressBar }
export type { FocusModeStatsProgressBarProps }

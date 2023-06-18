import { IconStar } from 'components'
import { DateTime } from 'luxon'
import React, { useEffect } from 'react'
import styled from 'styled-components'

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

// Two hours
const TOTAL = 72000

function calculateProgress(startDate: number) {
  const now = DateTime.now()
  const start = DateTime.fromMillis(startDate)
  const diff = now.diff(start)
  return Math.min(diff.toMillis() / TOTAL, 100)
}

function FocusModeStatsProgressBar(props: FocusModeStatsProgressBarProps) {
  const { startDate } = props

  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    // So the bar is painted right away when the component is mounted.
    setProgress(calculateProgress(startDate))

    const interval = setInterval(() => {
      setProgress(calculateProgress(startDate))
    }, 6000)

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <ProgressBarBackground>
      <ProgressBar style={{ width: `${progress}%` }}>
        <Star style={{ left: '52px', top: '-6px', fill: progress > 1800 ? '#E8BB3F' : '#2d1b6c' }} />
        <Star style={{ left: '150px', top: '-6px', fill: progress > 3600 ? '#E8BB3F' : '#2d1b6c' }} />
        <Star style={{ left: '247px', top: '-6px', fill: progress > 7199 ? '#E8BB3F' : '#2d1b6c' }} />
      </ProgressBar>
    </ProgressBarBackground>
  )
}

export { FocusModeStatsProgressBar }
export type { FocusModeStatsProgressBarProps }

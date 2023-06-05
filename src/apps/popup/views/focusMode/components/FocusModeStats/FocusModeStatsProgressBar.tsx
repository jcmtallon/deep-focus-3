import { DateTime } from 'luxon'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface FocusModeStatsProgressBarProps {
  startDate: number
}

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 8px;
  background-color: transparent;
`

const ProgressBar = styled.div`
  height: 8px;
  background-color: #fff9b0;
  border-radius: 6px;
`

// TODO: Revisit this amount and the calculation of the progress
// TODO: Abstract reference value
const total = 60_00

function FocusModeStatsProgressBar(props: FocusModeStatsProgressBarProps) {
  const { startDate } = props

  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now()
      const start = DateTime.fromMillis(startDate)
      const diff = now.diff(start)
      setProgress(Math.min(diff.toMillis() / total, 100))
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <ProgressBarBackground>
      <ProgressBar style={{ width: `${progress}%` }} />
    </ProgressBarBackground>
  )
}

export { FocusModeStatsProgressBar }
export type { FocusModeStatsProgressBarProps }

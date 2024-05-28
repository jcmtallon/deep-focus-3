import React, { useMemo } from 'react'
import { FocusSession } from 'types'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import styled from 'styled-components'
import { forEach } from 'lodash'
import { DateTime } from 'luxon'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const labels = [
  '0am',
  '1am',
  '2am',
  '3am',
  '4am',
  '5am',
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '0am',
]

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
`

interface MissionControlDayTimelineProps {
  focusSessions: FocusSession[]
}

function MissionControlDayTimeline(props: MissionControlDayTimelineProps) {
  const { focusSessions = [] } = props

  const dataSet = useMemo(() => {
    const timeSlotRecord: Record<number, { minutes: number }> = Object.fromEntries(
      hours.map(hour => [hour, { minutes: 0 }]),
    )

    forEach(focusSessions, focusSession => {
      if (!focusSession.startDate || !focusSession.endDate) return

      const startDateTime = DateTime.fromMillis(focusSession.startDate)
      const startTimeSlot = startDateTime.get('hour')
      const startMinute = startDateTime.get('minute')

      const start = DateTime.fromMillis(focusSession.startDate)
      const end = DateTime.fromMillis(focusSession.endDate)
      const durationInMinutes = Math.floor(end.diff(start).shiftTo('minutes').minutes)

      let remainingMinutes = durationInMinutes
      let segments = 1

      while (remainingMinutes > 0) {
        const minutesInSlot = segments === 1 ? 60 - startMinute : 60
        if (minutesInSlot <= remainingMinutes) {
          timeSlotRecord[startTimeSlot + segments].minutes += minutesInSlot
          remainingMinutes -= minutesInSlot
          segments++
        } else {
          timeSlotRecord[startTimeSlot + segments].minutes += remainingMinutes
          remainingMinutes = 0
        }
      }
    })
    return timeSlotRecord
  }, [focusSessions])

  const data = useMemo(() => {
    return Object.keys(dataSet).map(key => dataSet[parseInt(key, 10)].minutes)
  }, [dataSet])

  return (
    <Wrapper>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Your day' },
          },
          scales: { y: { min: 0, max: 60 } },
        }}
        data={{
          labels,
          datasets: [
            {
              fill: true,
              label: 'Time',
              data,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }}
      />
    </Wrapper>
  )
}

export { MissionControlDayTimeline }
